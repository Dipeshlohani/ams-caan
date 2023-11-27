// shared-link.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SharedLinkService } from './shared.service'
import { SharedLink } from './shared.model';

@Resolver(() => SharedLink)
export class SharedLinkResolver {
  constructor(private readonly sharedLinkService: SharedLinkService) {}

  @Mutation(() => SharedLink)
  async generateShareableLink(
    @Args('activityId', { type: () => String }) activityId: string,
  ): Promise<SharedLink> {
    return this.sharedLinkService.generateShareableLink(activityId);
  }
}
