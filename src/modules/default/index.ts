import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
class Default extends UtyponModule {
  _command = '$0';
  _desc = ``
  async run() {
    this.console.print(`Welcome to Utypon CLI - Atypon's UI Team Internal CLI :)`);
  }
}

export default UtyponFactory.create(Default);
