import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRespository: Repository<Lesson>,
    ) { }

    createLesson(name, startDate, endDate) {
        const lesson = this.lessonRespository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
        });

        return this.lessonRespository.save(lesson);
    }
}
