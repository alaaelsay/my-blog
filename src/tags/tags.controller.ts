import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getTags(){
    const allTags=await this.tagsService.getAll()
    const tag:string[]=allTags.map(tag=> tag.name)
    return {tag}
  }
}
