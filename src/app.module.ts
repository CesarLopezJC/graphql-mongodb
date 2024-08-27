import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql'
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      // useUnifiedTopology: true,
      entities: [
        Lesson,
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule
  ],
})
export class AppModule { }
