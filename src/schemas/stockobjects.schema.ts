import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockobjectDocument = Stockobject & Document;

@Schema()
export class Stockobject {
    @Prop()
    nameObject: string;

    @Prop()
    quantity: number;
}

export const StockobjectSchema = SchemaFactory.createForClass(Stockobject);