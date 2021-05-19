import Modules from "../modules";
import * as yargs from "yargs";
import { Argv } from "yargs";

export default class Utypon {

    private static instance: Utypon;

    private constructor() { }

    static getInstance(): Utypon {
        if(!Utypon.instance)
            Utypon.instance = new Utypon();
        return Utypon.instance;
    }

    prepareModules(yargs: Argv<{}>, modules :any): { [x: string]: unknown; _: (string | number)[]; $0: string; } {
        let argv = yargs.usage('usage: $0 <command>');
        modules.forEach((module) => {
            argv = argv.command(module.command, 'create a new [project|module]', module.subModules ? (yargs) => this.prepareModules(yargs, module.subModules): module.handler)
        });
        return argv.help('help')
        .wrap(null)
        .argv;
    } 

    run(): void { 
        this.prepareModules(yargs, Modules);
    }

}