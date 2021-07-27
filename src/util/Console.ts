import {Service} from 'typedi';
import * as readline from 'readline';

const term = require( 'terminal-kit' ).terminal;
const figlet = require('figlet');

@Service()
class Console {
  public question(question: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(question, function(answer) {
        resolve(answer);
        rl.close();
      });
    });
  }

  public async loading(message: string) {
    const spinner = await term.spinner( 'dotSpinner' );
    term( message );
    return spinner;
  }

  public detach() {
    /* sometimes terminal-kit doesn't close the console stream and that couses the console to stuck so we need to close it explicitly */
    term.processExit();
  }

  public async welcome(): Promise<void> {
    return new Promise((resolve, reject) => {
      figlet.text('Utypon', {
        font: 'Big Money-ne',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      }, (err, data) => {
        if (!err) {
          this.print(`${data}\n\n\n`, ['green']);
        }
        resolve();
      });
    });
  }

  public clear():void {
    console.clear();
  }

  print(message: string, properties: string[] = []): void {
    let termObject = term;
    properties.forEach((prop) => termObject = term[prop]);
    termObject(message);
  }
}

export default Console;
