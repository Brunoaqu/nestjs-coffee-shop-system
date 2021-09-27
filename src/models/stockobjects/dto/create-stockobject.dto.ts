import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStockobjectDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly nameObject: string;

    @IsNumber()
    @IsNotEmpty()
    readonly quantity: string;
}
