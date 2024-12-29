import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 30,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
