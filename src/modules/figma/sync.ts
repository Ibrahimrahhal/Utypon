import UtyponModule from '../../core/UtyponModule';
class FigmaSync extends UtyponModule {
  _command = 'sync';
  _desc = `Sync Figma Design Tokens From Protypon`;
  run() {
    console.log('This module is deprecated');
  }
}

export default (new FigmaSync());
