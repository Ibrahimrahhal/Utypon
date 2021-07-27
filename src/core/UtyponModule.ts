import Console from '../util/Console';
import {Service, Inject, Container} from 'typedi';

abstract class UtyponModule {
    abstract _command: string;
    abstract _desc: string;
    public _subModules:UtyponModule[];

    @Inject()
    protected console: Console;

    abstract run(options: { [key: string]: any }): Promise<void>

    async beforeRun(options: { [key: string]: any }): Promise<void> {
      this.console.clear();
      this.console.print('\n\n');
      await this.console.welcome();
      this.console.print('\n\n');
    }

    async afterRun() {
      this.console.detach();
    }

    registerSubModules(subModules: UtyponModule[]) {
      this._subModules = subModules;
    }

    get command(): string {
      return this._command;
    }

    get desc(): string {
      return this._command;
    }

    get subModules(): UtyponModule[] {
      return this._subModules;
    }
}

export default UtyponModule;

export class UtyponFactory {
  static create(moduleClass): UtyponModule {
    Service()(moduleClass);
    return Container.get(moduleClass) as UtyponModule;
  }
}
