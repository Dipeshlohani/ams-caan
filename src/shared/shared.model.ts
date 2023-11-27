// shared-link.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class SharedLink {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  activityId: string;

  @Field()
  @Prop({ required: true })
  shareableLink: string;

  // Add other properties as needed
}

export type SharedLinkDocument = SharedLink & Document;
export const SharedLinkSchema = SchemaFactory.createForClass(SharedLink);
