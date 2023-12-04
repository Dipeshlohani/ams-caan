// shared-link.resolver.ts
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SharedLink } from './shared.model';
import { SharedLinkService } from './shared.service';

@Resolver(() => SharedLink)
export class SharedLinkResolver {
  constructor(private readonly sharedLinkService: SharedLinkService) {}

  @Mutation(() => SharedLink)
  async incrementShareCount(@Args('linkId') linkId: string): Promise<SharedLink> {
    return this.sharedLinkService.incrementShareCount(linkId);
  }
}
