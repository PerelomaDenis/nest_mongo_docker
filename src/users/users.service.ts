import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto)
    return newUser.save()
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    // const user = await this.userModel.findOne({ where: { email }, include: { all: true } })
    return user
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }
}
