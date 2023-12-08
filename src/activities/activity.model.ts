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

  @Field()
  @Prop({ default: false })
  isPublic: boolean;

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => Number)
  @Prop({ default: 0 })
  shareCount: number;

  @Field(() => [String]) // Field for storing image URLs
  @Prop({ type: [String], default: [], required: false })
  imgUrls: string[];

  @Field(() => [String]) // Field for storing file URLs
  @Prop({ type: [String], default: [], required: false })
  files: string[];
}

export type ActivityDocument = Activity & Document;

export const ActivitySchema = SchemaFactory.createForClass(Activity);
