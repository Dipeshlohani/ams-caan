// shared-link.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedLink, SharedLinkDocument } from './shared.model';

@Injectable()
export class SharedLinkService {
  constructor(
    @InjectModel(SharedLink.name) private sharedLinkModel: Model<SharedLinkDocument>,
  ) {}

  async generateShareableLink(activityId: string): Promise<SharedLink> {
    const shareableLink = `https://yourdomain.com/activity/${6}`;
    const createdLink = new this.sharedLinkModel({ activityId, shareableLink });
    return createdLink.save();
  }

  // Other methods related to SharedLink...
}
