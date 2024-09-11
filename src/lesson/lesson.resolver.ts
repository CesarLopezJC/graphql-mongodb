import { Resolver, Query, Mutation, Args, Parent, ResolveField } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { AssingStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) { }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLessonById(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(retunrs => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssingStudentsToLessonInput) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}