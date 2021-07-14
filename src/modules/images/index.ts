import UtyponModule from '../../core/UtyponModule';
import Optimize from './optimize';

class Image extends UtyponModule {
  _command = 'image';
  _desc = `Images Related Commands Namespace`
  run() {}
}

const image = new Image();
image.registerSubModules([Optimize]);

export default image;
