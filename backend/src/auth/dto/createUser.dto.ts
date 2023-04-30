import { IsString, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsNumber()
    balance: number;

    @IsString()
    email: string;
}