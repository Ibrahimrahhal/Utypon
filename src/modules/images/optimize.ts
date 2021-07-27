import * as imagemin from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import * as imageminRecompress from 'imagemin-jpeg-recompress';
import imageminPngquant from 'imagemin-pngquant';
import {Service, Inject} from 'typedi';

import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
import FileSystem from '../../util/FileSystem';

@Service()
class Optimize extends UtyponModule {
  _command = 'optimize';
  _desc = `Optimize Product Images (uses product/image directory)`;
  private imagesPathIn = 'images/**/*.{jpg,JPG,jpeg,JPEG,png}';
  private imagesPathOut = 'images/';
  @Inject()
  protected fileSystem: FileSystem;
  async run() {
    const spinner = await this.genericUtils.showLoading(' Optimizing Images');
    await this.optimizeImages(this.imagesPathIn, this.imagesPathOut);
    spinner.destroy();
    console.log('Images Optimized!');
    this.genericUtils.terminate();
  }

  optimizeImages(pathIn, pathOut): Promise<void> {
    const fullPathIn = this.fileSystem.resolveRelativeToWorkingDirectory(pathIn);
    const fullPathOut = this.fileSystem.resolveRelativeToWorkingDirectory(pathOut);
    const compress = imagemin([fullPathIn], {
      destination: fullPathOut,
      plugins: [
        imageminJpegtran(),
        imageminRecompress(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });
    return compress;
  }
}

export default UtyponFactory.create<Optimize>(Optimize);
