
import {Service} from 'typedi';
import sync from './sync';
import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';

@Service()
class Figma extends UtyponModule {
  _command = 'figma';
  _desc = `SG - Figma Integration Commands Namespace`
  run() {}
}

const figma = UtyponFactory.create<Figma>(Figma);
figma.registerSubModules([sync]);

export default figma;
