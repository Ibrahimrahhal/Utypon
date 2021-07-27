import Generic from '../util/Generic';
import {Service, Inject, Container} from 'typedi';

abstract class UtyponModule {
    abstract _command: string;
    abstract _desc: string;
    public _subModules:UtyponModule[];

    @Inject()
    protected genericUtils: Generic;

    abstract run(options: { [key: string]: any }): void

    async beforeRun(options: { [key: string]: any }): Promise<void> {
      console.clear();
      console.log('\n\n'); // @todo:- handle formating in a better way
      await this.genericUtils.showWelcomeMessage();
      console.log('\n\n');
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
