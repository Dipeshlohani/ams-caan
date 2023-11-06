import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CommentInput {
  @Field(() => ID)
  commenterId: string;

  @Field()
  text: string;
}
