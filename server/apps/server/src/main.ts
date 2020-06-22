import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('全站之巅 - 后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  const PORT = process.env.SERVER_PORT || 3001
  await app.listen(PORT)
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap()
