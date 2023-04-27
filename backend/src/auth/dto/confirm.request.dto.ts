import { IsString, MinLength, MaxLength } from "class-validator";

export class ConfirmRequestDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(6)
    confirmationCode: string
}