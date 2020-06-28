import { prop, modelOptions, DocumentType } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcrypt'

export type UserDocument = DocumentType<User>

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    set(val) {
      return val ? hashSync(val, 10) : val
    },
    get(val) {
      return val
    },
    select: false
  })
  password: string
}
