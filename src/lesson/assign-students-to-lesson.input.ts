import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssingStudentsToLessonInput {
    @IsUUID("4")
    @Field(type => ID)
    lessonId: string;

    @IsUUID("4", { each: true })
    @Field(type => [ID])
    studentIds: string[];
}