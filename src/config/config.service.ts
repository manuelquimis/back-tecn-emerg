import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFile = __dirname + '/../../.env';
      const existEnv = fs.existsSync(envFile);

      if (!existEnv) {
        console.log('.env no existe');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFile));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
