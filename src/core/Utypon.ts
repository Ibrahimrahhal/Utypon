import 'reflect-metadata';
import * as yargs from 'yargs';
import {Argv} from 'yargs';
import UtyponModule from './UtyponModule';
import Modules from '../modules';

type commandHandler = (argv: Argv) => (Promise<void> | Argv['argv']);
export default class Utypon {
    private static _instance: Utypon;

    private constructor() { }

    static get instance(): Utypon {
      if (!Utypon._instance) {
        Utypon._instance = new Utypon();
      }
      return Utypon._instance;
    }

    prepareModules(yargs: Argv<{}>, modules: UtyponModule[]): Argv['argv'] {
      let argv = yargs.usage('usage: $0 <command>');
      modules.forEach((module) => {
        argv = argv.command(
            module.command,
            module.desc,
            this.buildModuleHandler(module),
        );
      });
      return argv.help('help')
          .wrap(null)
          .argv;
    }

    run(): void {
      this.prepareModules(yargs, Modules);
    }


    buildModuleHandler(module: UtyponModule): commandHandler {
      if (module.subModules) {
        return (yargs) => this.prepareModules(yargs, module.subModules);
      }

      return async ({argv}) => {
        await module.beforeRun(argv);
        await module.run(argv);
        await module.afterRun();
      };
    }
}
