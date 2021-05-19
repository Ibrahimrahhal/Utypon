import UtyponModule from "../../core/UtyponModule";
import FileSystem from "../../util/FileSystem";
import GenericUtil from "../../util/Generic";

class Development extends UtyponModule {
    designTokensFile: string = "figma-tokens.json";


    async run(options: { [key: string]: any; }) {
        const configFile = FileSystem.resolveRelativeToWorkingDirectory("./figma-config.json");
        if(FileSystem.fileExist(configFile)) {
            const config = JSON.parse(FileSystem.readFileSync(configFile)).designTokens.config;
            await this.linkFile(config['figma-link']);
            await this.syncDesignTokens();
        }
        if(await this.checkDesignTokenChange()) {
            const continueToDev = (await GenericUtil.askQuestion("Looks Like A Change Has been Occurred On The Design Token, Do Wish To Continue(Y/N)?")) === 'Y';
            if(!continueToDev) {
                this.discardDesignTokenUpdate();
            }
        }
        // this.startBundler();

    }

    async linkFile(file) {
        await GenericUtil.executeCommand(`protypon figma:link ${file}`);
    }

    async syncDesignTokens() {
        await GenericUtil.executeCommand(`protypon figma:sync`);
    }

    async checkDesignTokenChange(): Promise<boolean> {
        let repoStatus = await GenericUtil.executeCommand(`git status`);
        return repoStatus.includes(this.designTokensFile);
    }

    async discardDesignTokenUpdate() {
        await GenericUtil.executeCommand(`git checkout -- ${this.designTokensFile}`);
    }
    
    async startBundler() {
        await GenericUtil.executeCommand(`webpack --mode development`);
    }

}

export default (new Development()).asModule("dev", []);