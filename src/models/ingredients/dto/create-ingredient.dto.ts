import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateIngredientDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(5)
    @IsNotEmpty()
    readonly measurement: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
}
