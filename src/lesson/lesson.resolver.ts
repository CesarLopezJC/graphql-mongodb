import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
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
    createLesson() {

    }
}