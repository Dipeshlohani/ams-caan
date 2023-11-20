import { Injectable } from '@nestjs/common'
import { Common } from './common.model';
@Injectable()
export class CommonService<T extends Common> {
  private readonly commonItems: T[] = [];

  // Implement methods for CRUD operations on commonItems
}