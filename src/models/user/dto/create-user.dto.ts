import { IsHash, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string;
    readonly password: string;

    @IsNotEmpty()
    readonly quantity: string;
 
}