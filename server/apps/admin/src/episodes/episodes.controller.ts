import { Controller, Get } from '@nestjs/common'
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose'
import { ApiTags } from '@nestjs/swagger'
import { Episode } from '@libs/db/models/episode.model'
import { Course } from '@libs/db/models/course.model'

@Crud({
  model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model,
    @InjectModel(Course) private readonly courseModel
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    return {
      title: '课时管理',
      column: [
        {
          prop: 'name',
          label: '课时名称',
          span: 24,
          row: true
        },
        { prop: 'course', label: '所属课程', type: 'select', dicData: courses }
        // {
        //   prop: 'file',
        //   label: '视频文件',
        //   span: 24,
        //   type: 'upload',
        //   action: '/upload',
        //   listType: 'picture-img'
        // }
      ]
    }
  }
}
