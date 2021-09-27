import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
    @IsString()
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @MaxLength(5)
    readonly measurement: string;

    @IsNumber()
    readonly price: number;
}
