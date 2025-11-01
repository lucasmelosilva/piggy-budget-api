import { IsEmail, IsString } from 'class-validator';

export class FindUserByEmailDTO {
  @IsEmail()
  email: string;
}

export class FindUserByUsernameDTO {
  @IsString()
  username: string;
}
