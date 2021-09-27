import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateStockobjectDto } from './create-stockobject.dto';

export class UpdateStockobjectDto extends PartialType(CreateStockobjectDto) {
    @IsString()
    @MaxLength(30)
    readonly nameObject: string;

    @IsNumber()
    readonly quantity: string;
}
