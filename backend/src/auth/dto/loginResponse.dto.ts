import { IsString, MinLength, IsInt } from "class-validator";
import { UserDto } from "./user.dto";

export class LoginResponseDto {

    user: UserDto;

    @IsInt()
    balance: number;

    @IsString()
    @MinLength(2)
    accessToken: string;

    @IsString()
    @MinLength(2)
    refreshToken: string;
}