import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MaxLength(30)
    readonly name: string;

    @IsNumber()
    readonly price: string;

    @IsArray()
    readonly ingredients: [string, number];
}
