import * as fs from 'fs';
import * as path from 'path';
import {Service} from 'typedi';

@Service()
class FileSystem {
  public get workingDirectory() {
    return process.cwd();
  }

  public readFileSync(path: string): string {
    return fs.readFileSync(path, 'utf8');
  }

  public resolveRelativeToWorkingDirectory(relativePath: string): string {
    return path.resolve(this.workingDirectory, relativePath);
  }

  public writeFileSync(path: string, content: string): void {
    fs.writeFileSync(path, content);
  }

  public fileExist(path: string): boolean {
    return fs.existsSync(path);
  }
}

export default FileSystem;
