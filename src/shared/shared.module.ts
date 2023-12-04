// shared.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedLink, SharedLinkSchema } from './shared.model';
import { SharedLinkResolver } from './sharedresolver';
import { SharedLinkService } from './shared.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SharedLink.name, schema: SharedLinkSchema }])],
  providers: [SharedLinkResolver, SharedLinkService],
  exports: [SharedLinkService],
})
export class SharedModule {}
