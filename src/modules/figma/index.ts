
import sync from './sync';
import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';

class Figma extends UtyponModule {
  _command = 'figma';
  _desc = `SG - Figma Integration Commands Namespace`
  async run() {}
}

const figma = UtyponFactory.create(Figma);
figma.registerSubModules([sync]);

export default figma;
