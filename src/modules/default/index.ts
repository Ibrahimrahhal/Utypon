import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
class Default extends UtyponModule {
  _command = '$0';
  _desc = ``
  run() {
    console.log(`Welcome to Utypon CLI - Atypon's UI Team Internal CLI :)`);
  }
}

export default UtyponFactory.create<Default>(Default);
