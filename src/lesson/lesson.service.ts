import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from 'src/student/student.service';
// import { Student } from 'src/student/student.entity';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRespository: Repository<Lesson>,
        private studentService: StudentService
        // @InjectRepository(Student) private studentRespository: Repository<Student>,
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
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRespository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return this.lessonRespository.save(lesson);
    }


    async assignStudentsToLesson(assignStudentsToLessonInput: AssingStudentsToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput;

        const lesson = await this.lessonRespository.findOne({
            where: {
                id: lessonId,
            }
        });

        lesson.students = [...lesson.students, ...studentIds];

        return this.lessonRespository.save(lesson);
    }
}
