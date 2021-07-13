const scssfmt = require('scssfmt');

export default class SassUtil {
  public static convertObjectToSassMap(obj: any) {
    const mapContent = Object.entries(obj).reduce((prev, [key, value]) => {
      const objAsMap = `'${key}': ${(typeof value === typeof {}) ? SassUtil.convertObjectToSassMap(value) : value}`;
      return prev.concat([objAsMap]);
    }, []);
    return `(\n\t${mapContent.join(',\n\t')}\n)`;
  }

  public static format(sass: string) {
    return scssfmt(sass);
  }
}
