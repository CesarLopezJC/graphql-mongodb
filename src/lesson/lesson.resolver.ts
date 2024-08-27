import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
    ) { }
    @Query(returns => LessonType)
    lesson() {
        return {
            id: 'dsakasnjk',
            name: 'Physics Class',
            startDate: (new Date().toDateString()),
            endDate: (new Date().toDateString()),
        }
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,

    ) {
        return this.lessonService.createLesson(name, startDate, endDate);
    }
}