import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema }
    ]),
  ],
  providers: [CommentsResolver, CommentService],
  exports: [CommentService],
})
export class CommentsModule { }
