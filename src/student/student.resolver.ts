import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studenService: StudentService
    ) { }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ): Promise<StudentType> {
        console.log("createStudent", createStudentInput);
        return this.studenService.createStudent(createStudentInput);
    }
}
