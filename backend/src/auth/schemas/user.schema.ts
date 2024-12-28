import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { hashPasswordMiddleware } from '../middlewares/hash-password.middleware';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', hashPasswordMiddleware);
