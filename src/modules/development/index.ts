import UtyponModule, {UtyponFactory} from '../../core/UtyponModule';
import FileSystem from '../../util/FileSystem';
import {Service, Inject} from 'typedi';

@Service()
class Development extends UtyponModule {
    _command = 'dev';
    _desc = `Run Atypon Product Bundler In Development Mode`
    designTokensFile: string = 'figma-tokens.json';

    @Inject()
    protected fileSystem: FileSystem;

    async run(options: { [key: string]: any; }) {
      const configFile = this.fileSystem.resolveRelativeToWorkingDirectory('./figma-config.json');
      if (this.fileSystem.fileExist(configFile)) {
        const spinner = await this.genericUtils.showLoading(' fetching design tokens');
        const config = JSON.parse(this.fileSystem.readFileSync(configFile)).designTokens.config;
        await this.linkFile(config['figma-link']);
        await this.syncDesignTokens();
        spinner.destroy();
      }
      if (await this.checkDesignTokenChange()) {
        const continueToDev = (await this.genericUtils.askQuestion('Looks Like A Change Has been Occurred On The Design Token, Do Wish To Continue(Y/N)?')) === 'Y';
        if (!continueToDev) {
          this.discardDesignTokenUpdate();
        }
      }
      this.genericUtils.terminate();
      // this.startBundler();
    }

    async linkFile(file) {
      await this.genericUtils.executeCommand(`protypon figma:link ${file}`);
    }

    async syncDesignTokens() {
      await this.genericUtils.executeCommand(`protypon figma:sync`);
    }

    async checkDesignTokenChange(): Promise<boolean> {
      const repoStatus = await this.genericUtils.executeCommand(`git status`);
      return repoStatus.includes(this.designTokensFile);
    }

    async discardDesignTokenUpdate() {
      await this.genericUtils.executeCommand(`git checkout -- ${this.designTokensFile}`);
    }

    async startBundler() {
      await this.genericUtils.executeCommand(`webpack --mode development`);
    }
}

export default UtyponFactory.create<Development>(Development);
