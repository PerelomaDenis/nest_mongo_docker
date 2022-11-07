import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({ example: 'xxx@mail.ru', description: 'Email' })
  @Prop({ isRequired: true})
  email: string

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @Prop({ isRequired: true})
  password: string

  @ApiProperty({ example: 'qwerty123', description: 'Аватарка' })
  @Prop()
  avatar: string
}

export const UserSchema = SchemaFactory.createForClass(User)
