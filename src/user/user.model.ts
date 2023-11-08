import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Activity } from '../activities/activity.model'; // Import the Activity type if needed

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  designation: string;

  @Field(() => [Activity])
  @Prop({ type: [String], default: [] })
  activities: Activity[];

  // Define other relations like comments and reactions if needed

  // ... other fields and methods
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
