import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRespository: Repository<Lesson>,
    ) { }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRespository.find();
    }

    async getLessonById(id: string): Promise<Lesson> {
        return this.lessonRespository.findOne({
            where: {
                id: id
            }
        });
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput;
        const lesson = this.lessonRespository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
        });

        return this.lessonRespository.save(lesson);
    }
}
