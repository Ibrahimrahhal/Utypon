import * as imagemin from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import * as imageminRecompress from 'imagemin-jpeg-recompress';
import imageminPngquant from 'imagemin-pngquant';
import UtyponModule from '../../core/UtyponModule';
import FileSystem from '../../util/FileSystem';
import GenericUtil from '../../util/Generic';

class Optimize extends UtyponModule {
  _command = 'optimize';
  _desc = `Optimize Product Images (uses product/image directory)`;
  private imagesPathIn = 'images/**/*.{jpg,JPG,jpeg,JPEG,png}';
  private imagesPathOut = 'images/';

  async run() {
    const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images'); const spinner = await GenericUtil.showLoading(' Optimizing Images');
    await this.optimizeImages(this.imagesPathIn, this.imagesPathOut);
    spinner.destroy();
    console.log('Images Optimized!');
    GenericUtil.terminate();
  }

  optimizeImages(pathIn, pathOut): Promise<void> {
    const fullPathIn = FileSystem.resolveRelativeToWorkingDirectory(pathIn);
    const fullPathOut = FileSystem.resolveRelativeToWorkingDirectory(pathOut);
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

export default new Optimize();
