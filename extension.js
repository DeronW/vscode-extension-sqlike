// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ab" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("fsl.format", function () {
    if (!vscode.window.activeTextEditor) {
      return; // no editor
    }
    let { document } = vscode.window.activeTextEditor;

    let text = document.getText();

    console.log(text);

    text.replaceAll(/(ACTION) SET/, ";\n    ACTION\n");
    text.replaceAll(/;(SET @)\w+/, ";\n    SET @");
    text.replaceAll(";APPEND INFO", ";\n\nAPPEND INFO");
    text.replaceAll(";CREATE TABLE", ";\n\n\nCREATE TABLE");
    text.replaceAll(";ENTRYPOINT TABLE", ";\n\n\nENTRYPOINT TABLE");

    vscode.window.showInformationMessage(text);
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
