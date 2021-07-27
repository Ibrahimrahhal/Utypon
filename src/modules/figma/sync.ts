import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
import {Service} from 'typedi';

@Service()
class FigmaSync extends UtyponModule {
  _command = 'sync';
  _desc = `Sync Figma Design Tokens From Protypon`;
  run() {
    console.log('This module is deprecated');
  }
}

export default UtyponFactory.create<FigmaSync>(FigmaSync);
