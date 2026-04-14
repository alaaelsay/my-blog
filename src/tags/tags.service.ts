import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    async getTags(){
        return ['ai', 'javascript', 'nest js']
    }
}
