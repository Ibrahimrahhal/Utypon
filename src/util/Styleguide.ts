import FileSystem from './FileSystem';
import {Service, Inject} from 'typedi';

@Service()
export default class StyleguideUtil {
  @Inject()
  private fileSystem: FileSystem;

  getProjectPackageJson() {
    const packageJson = this.fileSystem.readFileSync(this.fileSystem.resolveRelativeToWorkingDirectory('package.json'));
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
