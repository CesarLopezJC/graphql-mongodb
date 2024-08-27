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

    getLessonById(id: string): Promise<Lesson> {
        return this.lessonRespository.findOne({
            where: {
                id: id
            }
        });
    }

    createLesson(name, startDate, endDate): Promise<Lesson> {
        const lesson = this.lessonRespository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
        });

        return this.lessonRespository.save(lesson);
    }
}
