import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => ID)
  @Prop({ required: true })
  userId: string;

  @Field(() => ID)
  @Prop({ required: true })
  activityId: string;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
