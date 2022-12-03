import { Document, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { v4 as uuid } from "uuid";
import * as gravatar from "gravatar";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private users: Model<Document<UserEntity>>,
  ) {}

  async findUserById(id: string): Promise<UserEntity | null | undefined> {
    return await this.users.findById(id).lean();
  }

  async findUserByEmail(email: string): Promise<UserEntity | null | undefined> {
    return await this.users.findOne({ email }).lean();
  }

  async findUserByToken(verificationToken: string): Promise<UserEntity | null | undefined> {
    return await this.users.findOneAndUpdate(
      { verificationToken },
      { verificationToken: null, verify: true },
    ).lean();
  }

  async signup(createUserDto: CreateUserDto): Promise<Document<UserEntity, any, any>> {
    if(await this.findUserByEmail(createUserDto.email)){
      new ConflictException();
    }
    const verificationToken = uuid();
    const avatarURL = gravatar.url(createUserDto.email, { s: "250" }).replace("//", "");
    const user = await this.users.create({
      ...createUserDto,
      verificationToken,
      avatarURL,
    });
    return user;
  }

  async update({ _id }: UserEntity, body: any): Promise<UserEntity | null | undefined> {
    return await this.users
      .findByIdAndUpdate(_id, body, {
        new: true,
        runValidators: true,
      })
      .lean();
  }
}
