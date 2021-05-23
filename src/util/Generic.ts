import { exec, spawn } from "child_process";
import * as readline from "readline";
const term = require( 'terminal-kit' ).terminal;
const figlet = require('figlet');

export default class GenericUtil {
    public static withOutLogging(callback: Function) {
        const log = global.console.log;
        global.console.log = () => 0;
        callback();
        global.console.log = log;
    }

    public static executeCommand(command:string, attach:boolean = false): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    if(attach) {
                        console.error(error.message)
                    }
                    reject(error.message)
                    return;
                }
                if(attach) {
                    console.log(stderr);
                    console.log(stdout);
                }
                resolve(stdout);
            });
        })
    }

    public static executeAndAttachCommand(command: string) {
        var child = spawn(command)
        child.stdout.on('data', function (buffer) { 
            console.log(buffer.toString()) 
        });
        child.stderr.on("data", function (buffer) { 
            console.log(buffer.toString()) 
        });
    }

    public static askQuestion(question: string): Promise<string> {
       return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question, function(answer) {
            resolve(answer);
            rl.close();
        });
       })
    }

    public static async showLoading(message: string) {
        var spinner = await term.spinner( 'dotSpinner' ) ;
        term( message ) ;
        return spinner;
    }

    public static terminate() {
        term.processExit();
    }

    public static async showWelcomeMessage(): Promise<void>{
        return new Promise((resolve, reject) => {
            figlet.text('Utypon', {
                font: 'Big Money-ne',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true
            }, function(err, data) {
                if(!err) {
                    term.green(`${data}\n\n\n`);
                }
                resolve();
            })
        })
    }
}