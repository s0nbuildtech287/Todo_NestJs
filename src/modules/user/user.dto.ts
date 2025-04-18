import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tên phải là kí tự' })
  @IsNotEmpty()
  @Length(3, 50, { message: 'Tên phải từ 3 đến 50 kí tự' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  role: string;
  @IsBoolean()
  isActive?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  role?: string;

  @IsBoolean()
  isActive?: boolean;

  updatedAt?: Date;
}
