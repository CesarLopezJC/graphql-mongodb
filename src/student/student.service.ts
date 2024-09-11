import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudentById(id: string): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                id
            }
        });
    }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
        })

        return this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        const lessonStudentsDB = await this.studentRepository.find();

        const lessonStudents = lessonStudentsDB.filter(student => studentIds.includes(student.id))

        return lessonStudents;
    }
}
