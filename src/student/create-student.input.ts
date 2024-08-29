import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateStudentInput {
    @Field()
    @MinLength(2)
    firstName: string;

    @Field()
    @MinLength(2)
    lastName: string;
}