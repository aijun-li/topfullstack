import { Controller, Get } from '@nestjs/common'
import { Crud } from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/models/course.model'
import { InjectModel } from 'nestjs-typegoose'
import { ApiTags } from '@nestjs/swagger'

@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) {}

  @Get('option')
  option(): any {
    return {
      title: '课程管理',
      column: [
        {
          prop: 'name',
          label: '课程名称',
          sortable: true,
          search: true,
          regex: true,
          row: true,
          span: 24
        }
        // {
        //   prop: 'cover',
        //   label: '课程封面图',
        //   type: 'upload',
        //   listType: 'picture-img',
        //   tip: '图片上传',
        //   row: true,
        //   width: '120',
        //   action: 'upload'
        // }
      ]
    }
  }
}