import { exec, spawn } from "child_process";
import * as readline from "readline";


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
}