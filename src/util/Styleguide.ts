import FileSystem from './FileSystem';
import {Service} from 'typedi';

@Service()
export default class StyleguideUtil {
  constructor(private fs: FileSystem) { }

  getProjectPackageJson() {
    const packageJson = this.fs.readFileSync(this.fs.resolveRelativeToWorkingDirectory('package.json'));
    return JSON.parse(packageJson);
  }

  get workingLevel(): 'core' | 'theme' | 'product' {
    const name = this.getProjectPackageJson().name;
    if (name.includes('core')) {
      return 'core';
    }
    if (name.includes('theme')) {
      return 'theme';
    }
    return 'product';
  }
}
