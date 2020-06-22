import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @ApiProperty({ description: '名称' })
  @prop()
  name: string

  @ApiProperty({ description: '文件' })
  @prop()
  file: string

  @prop({ ref: 'Course' })
  course: Ref<Course>
}
