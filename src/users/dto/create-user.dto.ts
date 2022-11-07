import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email'})
  readonly email: string

  @ApiProperty()
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'не меньше 4 и не больше 16' })
  readonly password: string
}
