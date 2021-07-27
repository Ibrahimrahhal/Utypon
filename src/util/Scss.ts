const scssfmt = require('scssfmt');
import {Service} from 'typedi';

@Service()
class ScssUtils {
  convertObjectToSassMap(obj: any) {
    const mapContent = Object.entries(obj).reduce((prev, [key, value]) => {
      const objAsMap = `'${key}': ${(typeof value === typeof {}) ? this.convertObjectToSassMap(value) : value}`;
      return prev.concat([objAsMap]);
    }, []);
    return `(\n\t${mapContent.join(',\n\t')}\n)`;
  }

  format(sass: string) {
    return scssfmt(sass);
  }
}
export default ScssUtils;
