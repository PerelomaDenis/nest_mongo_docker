import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private filesService: FilesService
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async create(userDto: CreateUserDto, image?: any): Promise<User> {
    console.log(2313);
    const filename = await this.filesService.createFile(image)
    const newUser = new this.userModel({ ...userDto, avatar: filename })
    return newUser.save()
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    return user
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }
}
