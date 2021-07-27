import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';

class FigmaSync extends UtyponModule {
  _command = 'sync';
  _desc = `Sync Figma Design Tokens From Protypon`;
  async run() {
    this.console.print('This module is deprecated');
  }
}

export default UtyponFactory.create(FigmaSync);
