import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
import Optimize from './optimize';

class Image extends UtyponModule {
  _command = 'image';
  _desc = `Images Related Commands Namespace`
  run() {}
}

const image = UtyponFactory.create<Image>(Image);
image.registerSubModules([Optimize]);

export default image;
