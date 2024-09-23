import dotenv from "dotenv"
import readline from "readline"
import { logger } from "./logger.js"
import { listVoices, textToSpeech } from "./tts.js"

// Load environment variables
dotenv.config()

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to handle user input
function handleUserInput() {
  rl.question("Enter command: ", async (input) => {
    const args = input.split(" ")
    const command = args[0]

    if (command === "help") {
      showHelp()
    } else if (command === "list") {
      const listLang = args[1] // Capture the argument that should be the language
      await listVoices(listLang || undefined)
    } else if (command === "synthesize") {
      const inputFilePath = args[1]
      const languageCode = args[2] 
      const voiceName = args[3]
      const audioEncoding = args[4] || "MP3" // Default audio encoding

      if (!inputFilePath) {
        logger.error("Please provide an input file path for synthesis.")
      } else if (!languageCode) {
        logger.error("Please provide a language code. Use BCP-47 language codes only")
      } else if (!voiceName) {
        logger.error("Please provide a voice name. Use list to obtain all available voices. Use list follow by BCP-47 language code to get only a specific language list")
      } else {
        await textToSpeech(inputFilePath, languageCode, voiceName, audioEncoding)
      }
    } else if (command === "cls" || command === "clear") {
      logger.clear() // Clear the console
    } else {
      logger.error('Invalid command. Use "list" to list voices or "synthesize" to convert text to speech. Use "help" for more information.')
    }

    handleUserInput() // Wait for the next user input
  })
}

// Show help function
function showHelp() {
  console.log(`
Usage: [command] [inputFilePath] [voiceName] [audioEncoding]

Commands:
  list <LanguageCode>      List available voices from the Google Cloud Text-to-Speech API.
  synthesize <inputFilePath> <LanguageCode> <voiceName> <audioEncoding>
  cls                      Clear the console.

Description for list:

The 'list" command obtain a list from Google Servers of all available voices in all or certain language.

  Parameters for 'list':
    <LanguageCode>      Use a BCP-47 language code to find available voices (If not specified all Voices for all languages would be listed).  

Description for synthesize:
  The 'synthesize' command converts text from a specified input text file to speech and saves the output as an audio file.
  
  Parameters for 'synthesize':
    <LanguageCode>      BCP-47 language code e.g., 'en-US', 'es-US' (required).
    <inputFilePath>     Path to the input text file (required).
    <voiceName>         Name of the voice to use e.g., 'en-US-Wavenet-J' (required).
    <audioEncoding>     Audio encoding format, e.g., 'MP3', 'OGG_OPUS', or 'LINEAR16'. Default is 'MP3'.

Examples:
  synthesize path/to/your/input.txt en-US en-US-Wavenet-J MP3
  list es-US
  cls
`)
}

// Start the application
logger.info("Welcome to the Text-to-Speech CLI! Type 'help' for a list of commands.")
handleUserInput()
