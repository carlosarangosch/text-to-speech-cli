import chalk from "chalk"
import ora from "ora" // Importar ora para el spinner

// Custom logger for enhanced console messages
export const logger = {
  info: (message: string) => console.log(chalk.blue(`ℹ️ ${message}`)),
  success: (message: string) => console.log(chalk.green(`✅ ${message}`)),
  error: (message: string) => console.log(chalk.red(`❌ ${message}`)),
  separator: () => console.log(chalk.gray("-".repeat(40))),
  clear: () => {
    console.clear()
    console.log(chalk.blue("Console cleared. You can enter a new command:"))
  },
  spinner: (text: string) => ora(chalk.blue(text)), // Spinner definition
};

