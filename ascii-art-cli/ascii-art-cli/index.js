#!/usr/bin/env node

import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";
import imageToAscii from "image-to-ascii";
import fs from "fs";

console.clear();

console.log(chalk.cyanBright(figlet.textSync("ASCII CLI", { horizontalLayout: "full" })));

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What do you want to convert?",
      choices: ["Text to ASCII", "Image to ASCII", "Exit"]
    }
  ]);

  if (choice === "Text to ASCII") {
    const { text } = await inquirer.prompt([
      { type: "input", name: "text", message: "Enter your text:" }
    ]);
    const ascii = figlet.textSync(text, { font: "Standard" });
    console.log(chalk.green(ascii));
    fs.writeFileSync("output.txt", ascii);
    console.log(chalk.yellow("Saved to output.txt"));
    await mainMenu();

  } else if (choice === "Image to ASCII") {
    const { path } = await inquirer.prompt([
      { type: "input", name: "path", message: "Enter image path (jpg/png):" }
    ]);

    imageToAscii(path, { colored: true, size: { height: "40%" } }, (err, converted) => {
      if (err) return console.error(chalk.red("Error: "), err);
      console.log(converted);
      fs.writeFileSync("output.txt", converted);
      console.log(chalk.yellow("Saved to output.txt"));
      mainMenu();
    });

  } else {
    console.log(chalk.blue("Goodbye!"));
    process.exit();
  }
};

mainMenu();
