import dotenv from "dotenv"
import { TextToSpeechClient, protos } from "@google-cloud/text-to-speech"
import { promises as fs } from "fs"
import path from "path"
import { logger } from "./logger.js"
import { mapEnum } from "./utils.js"

dotenv.config()

const client = new TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

export async function textToSpeech(inputFilePath: string, languageCode:string, voiceName: string, audioEncoding: string) {
  const spinner = logger.spinner("Synthesizing speech...").start()

  try {
    const text = await fs.readFile(inputFilePath, "utf8")

    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        name: voiceName,
      },
      audioConfig: { audioEncoding: mapEnum(audioEncoding, protos.google.cloud.texttospeech.v1.AudioEncoding) },
    }

    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      throw new Error("No audio content returned from the API.")
    }

    const inputFileName = path.basename(inputFilePath, ".txt")
    const outputFilePath = `./generated/${inputFileName}_output.mp3`

    await fs.writeFile(outputFilePath, response.audioContent)
    logger.success(`Audio content written to file: ${outputFilePath}`)
    spinner.succeed("Speech synthesized successfully!")
  } catch (error) {
    spinner.fail("Failed to synthesize speech")
    logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function listVoices(languageCode?: string) {
  const spinner = logger.spinner("Listing available voices...").start()

  try {
    const request = languageCode
      ? {
          languageCode: languageCode,
        }
      : {}
    const [result] = await client.listVoices(request)
    const voices = result.voices
    logger.info("Listing available voices:\\n")

    if (voices) {
      voices.forEach((voice) => {
        console.log(`Name: ${voice.name}`)
        console.log(`  SSML Voice Gender: ${voice.ssmlGender}`)
        console.log("  Supported languages:")

        if (voice.languageCodes && Array.isArray(voice.languageCodes)) {
          voice.languageCodes.forEach((languageCode) => {
            console.log(`    ${languageCode}`)
          })
        } else {
          console.log("    No supported languages available.")
        }
        logger.separator()
      })
    }
    spinner.succeed("Voices listed successfully!")
  } catch (error) {
    spinner.fail("Failed to list voices")
    logger.error(`Error listing voices: ${error instanceof Error ? error.message : String(error)}`)
  }
}
