import {exec, spawn} from 'child_process';
import {Service, Inject} from 'typedi';
import * as Http from 'http';
import FileSystem from './FileSystem';

@Service()
class GenericUtil {
  @Inject()
  private fileSystem: FileSystem;

  public executeCommand(command:string, attach:boolean = false): Promise<string> {
    if (!attach) {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            if (attach) {
              console.error(error.message);
            }
            reject(error.message);
            return;
          }
          if (attach) {
            console.log(stderr);
            console.log(stdout);
          }
          resolve(stdout);
        });
      });
    } else {
      spawn(command);
      return Promise.resolve('');
    }
  }


  async downloadFile(name: string, path: string, url: string): Promise<void> {
    const file = this.fileSystem.createWriteStream(name, path);
    await new Promise<void>((resolve, reject) => {
      Http.get(url, function(response) {
        response.pipe(file);
        response.on('end', () => {
          resolve();
        });
      });
    });
  }
}


export default GenericUtil;
