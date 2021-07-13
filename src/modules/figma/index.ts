import sync from './sync';
import UtyponModule from '../../core/UtyponModule';

class Figma extends UtyponModule {
  _command = 'figma';
  _desc = `SG - Figma Integration Commands Namespace`
  run() {}
}

const figma = new Figma();
figma.registerSubModules([sync]);

export default figma;
