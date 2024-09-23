# Text-to-Speech-CLI for Google Text-to-Speech

## Introduction

This project leverages Google Cloud's Text-to-Speech API to convert text input from a file into audio output. By utilizing advanced machine learning models, it can produce highly natural-sounding speech in multiple voices and languages. This tool is suitable for applications such as virtual assistants, audiobooks, and any project requiring text-to-speech conversion.

## Features

- **Multiple Voice Options**: Choose from a variety of voice types, including Standard, Neural, Polyglot, News, and Studio voices. Check voice differences below.
- **Support for Multiple Languages**: The system can read text in various languages, making it versatile for international applications. Please check [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) to find your desired language code.
- **Command-line Interface**: Interact through a simple command-line interface to synthesize voices or list available voices.
- **Configurability**: Easily change voice settings and audio formats through command arguments.

## Setup

To use this project, you need to add your Google Cloud credentials (.json file generated through the Google Cloud console) to the following file:

```bash
./credentials/google-cloud-credentials.json
```

The name of the file should be `google-cloud-credentials.json`. If you don't know how to obtain and set up Google Cloud to use Text-to-Speech, please refer to the section below on how to set up a project in Google Cloud for text-to-speech and how to get the credentials.

## Setting Up Google Cloud Text-to-Speech

Follow these simple steps to create a Google Cloud project and obtain your credentials (.json file) to use with this application:

1. **Create a Google Cloud Account**:
   - Visit Google Cloud and sign in with your Google account. If you don’t have one, create an account.

2. **Create a New Project**:
   - In the Google Cloud Console, click on the project dropdown at the top of the page and select “New Project”.
   - Enter a name for your project and click “Create”.

3. **Enable the Text-to-Speech API**:
   - In the navigation menu, go to APIs & Services > Library.
   - Search for “Text-to-Speech API” and click on it.
   - Click the “Enable” button to enable the API for your project.

4. **Create Service Account Credentials**:
   - In the navigation menu, go to APIs & Services > Credentials.
   - Click on “Create credentials” and choose “Service account”.
   - Fill in the service account details, such as the name and description, and click “Create”.
   - In the next step, you can grant roles; you can skip this step and click “Continue”.
   - Finally, click “Done”.

5. **Generate the Private Key**:
   - Find your newly created service account in the list, click on it, and go to the Keys tab.
   - Click “Add Key” and select “JSON”. This will download a .json file containing your credentials.

6. **Store the JSON File**:
   - Rename the downloaded JSON file to `google-cloud-credentials.json` and place it in the `./credentials/` folder of your project.

7. **Verify Your Setup**:
   - Ensure that the path to your credentials file matches the setup mentioned in the "Setup" section.

Now you're all set to use the Text-to-Speech functionality in your application! If you encounter any issues, consult the Google Cloud documentation for further assistance.

## Usage

To run the application, ensure you have Node.js installed and set up. You can utilize the project to synthesize speech from text files or list available voices.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/text-to-speech.git
   ```

2. Navigate to the project directory:
   ```bash
   cd text-to-speech
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Commands

You can use the following commands to interact with the application:

- **List Available Voices**:
  ```bash
  list
  ```

- **List Available Voices for a Particular Language**:
  ```bash
  list es-US
  ```

- **Synthesize Text from a File**:
  ```bash
  synthesize path/to/your/input.txt en-US en-US-Wavenet-J MP3
  ```

- **Show Help**:
  ```bash
  help
  ```

## Voice Categories

Google Cloud Text-to-Speech offers different categories of voices, each with distinct features, purposes, and audio quality. Here’s a brief overview:

1. **Standard Voices**
   - **Description**: Traditional voices trained using older speech synthesis techniques.
   - **Quality**: Generally provide acceptable audio quality but lack the naturalness of newer voice models.
   - **Use**: Suitable for applications that do not require particularly natural-sounding audio.

2. **Neural Voices**
   - **Description**: These voices utilize deep learning models for audio generation.
   - **Quality**: Deliver much more natural and expressive audio compared to standard voices.
   - **Use**: Ideal for applications aimed at providing a more engaging user experience.

3. **Polyglot Voices**
   - **Description**: Designed to support multiple languages and dialects.
   - **Quality**: The quality can be similar to standard voices.
   - **Use**: Useful in applications requiring multilingual communication.

4. **News Voices**
   - **Description**: Specifically designed for news reading.
   - **Quality**: Provide a serious tone and appropriate pacing to convey information clearly.
   - **Use**: Excellent for news applications and informational podcasts.

5. **Studio Voices**
   - **Description**: High-performance voices designed for professional audio production applications.
   - **Quality**: Provide very natural and professional sound.
   - **Use**: Ideal for video productions, commercials, and multimedia content where audio quality is paramount.

### Summary of Comparisons

| Voice Type   | Quality      | Common Use Cases                                           |
| ------------ | ------------ | ---------------------------------------------------------- |
| **Standard** | Satisfactory | Basic reading or voice applications.                       |
| **Neural**   | High         | Virtual assistants, audiobooks, interactive applications.  |
| **Polyglot** | Variable     | Communication in multiple languages.                       |
| **News**     | Clear        | News reading, informative podcasts.                        |
| **Studio**   | Professional | Multimedia productions, commercials, high-quality content. |

## Conclusion

The choice between different voice categories will depend on your specific needs regarding audio quality, content type, and context. Neural voices are recommended for most modern applications requiring natural and pleasant sound. This application provides an easy-to-use interface for converting text to speech, allowing for greater accessibility and usability in various projects.

For further details on features and capabilities, refer to the project documentation and examples.