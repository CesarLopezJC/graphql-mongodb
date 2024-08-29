import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studenService: StudentService
    ) { }

    @Query(returns => [StudentType])
    getStudents(): Promise<StudentType[]> {
        return this.studenService.getStudents();
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ): Promise<StudentType> {
        return this.studenService.createStudent(createStudentInput);
    }
}
