import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Activity {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: false })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field(() => ID)
  @Prop({ required: true })
  userId: string;

  @Field(() => [ID])
  @Prop({ type: [String], default: [] })
  comments: string[];

  @Field(() => [ID])
  @Prop({ type: [String], default: [] })
  reactions: string[];

  @Field()
  @Prop()
  shareableLink: string;
  
  @Field(() => Date) // Include createdAt field in GraphQL type
  @Prop({ default: Date.now })
  createdAt: Date;

}

export type ActivityDocument = Activity & Document;

export const ActivitySchema = SchemaFactory.createForClass(Activity);
