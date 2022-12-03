import {
  Injectable,
  PipeTransform,
  Logger,
  Scope,
  Inject,
} from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "fs";
import { userConstants } from "src/users/constants";
import { unlink } from "fs/promises";
import { REQUEST } from "@nestjs/core";
import { join } from "path";
const fsPromises = fs.promises;

@Injectable({ scope: Scope.REQUEST })
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  constructor(@Inject(REQUEST) protected readonly request: any) {}
  createDir = async (dir: string) =>
    fsPromises.access(dir, fs.constants.F_OK).catch(async () => {
      fs.mkdir(dir, { recursive: true }, function (err) {
        if (err) {
          const logger = new Logger();
          logger.error(err);
        }
      });
    });

  async transform(image: Express.Multer.File): Promise<any> {
    const { email } = this.request.user;
    const filename = email + userConstants.avatarExtension;
    const dir = join(process.cwd(), userConstants.avatarPath);
    await this.createDir(dir);
    await sharp(image.path)
      .resize(250)
      .webp({ effort: 3 })
      .toFile(join(dir, filename));
    unlink(image.path);
    const { protocol, headers } = this.request;
    const avatarURL = protocol + "://" + headers.host + userConstants.avatarPath + "/" + filename;
    return avatarURL;
  }
}
