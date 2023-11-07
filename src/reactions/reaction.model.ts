import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  WOW = 'WOW',
  ANGRY = 'ANGRY',
}

@Schema()
@ObjectType()
export class Reaction {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ required: true })
  userId: string;

  @Field(() => ID)
  @Prop({ required: true })
  activityId: string;

  @Field()
  @Prop({ required: true, enum: ReactionType })
  type: ReactionType;
}

export type ReactionDocument = Reaction & Document;

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
