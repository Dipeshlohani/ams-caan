import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@InputType('ActivityType')
export class Activity {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Comment]) // Add a field for comments
  comments: Comment[];

  @Field(() => [String])
  likes: string[];

  @Field()
  shares: number;

  @Field()
  shareableLink: string;
}
export type ActivityDocument = Activity & Document;

export const ActivitySchema = SchemaFactory.createForClass(Activity);

@ObjectType()
@InputType('CommentType')
export class Comment {
  @Field(() => ID)
  commenterId: string;

  @Field()
  text: string;
}
