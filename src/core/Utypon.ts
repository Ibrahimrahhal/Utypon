import Modules from '../modules';
import * as yargs from 'yargs';
import {Argv} from 'yargs';
import UtyponModule from './UtyponModule';

type commandHandler = (argv: Argv) => (Promise<void> | Argv['argv']);
export default class Utypon {
    private static instance: Utypon;

    private constructor() { }

    static getInstance(): Utypon {
      if (!Utypon.instance) {
        Utypon.instance = new Utypon();
      }
      return Utypon.instance;
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
        module.run(argv);
      };
    }
}
