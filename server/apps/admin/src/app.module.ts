import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { CoursesModule } from './courses/courses.module'
import { EpisodesModule } from './episodes/episodes.module'
import { MulterModule } from '@nestjs/platform-express'
import { CommonModule } from '@libs/common'

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      dest: 'uploads'
    }),
    UsersModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
