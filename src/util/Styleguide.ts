import FileSystem from "./FileSystem";

export default class StyleguideUtil {

    private static getProjectPackageJson() {
        const packageJson = FileSystem.readFileSync(FileSystem.resolveRelativeToWorkingDirectory('package.json'));
        return JSON.parse(packageJson);
    }

    public static get workingLevel(): 'core' | 'theme' | 'product' {
        const name = this.getProjectPackageJson().name;
        if(name.includes('core'))
            return 'core';
        if(name.includes('theme'))
            return 'theme';
        return 'product';
    }

}