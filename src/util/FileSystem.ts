import * as fs from 'fs';
import * as path from 'path';

export default class FileSystem {

    public static get workingDirectory() {
        return process.cwd();
    }

    public static readFileSync(path: string): string {
        return fs.readFileSync(path, 'utf8');
    }

    public static resolveRelativeToWorkingDirectory(relativePath: string): string {
        return path.resolve(this.workingDirectory, relativePath);
    }
    
    public static writeFileSync(path: string, content: string): void {
        fs.writeFileSync(path, content);
    }

    public static fileExist(path: string): boolean {
        return fs.existsSync(path);
    }
}