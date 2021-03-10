import { NestFactory } from '@nestjs/core';
import { AdminModule } from './modules/admin/admin.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger/dist";

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  const config = new DocumentBuilder()
    .setTitle('后台管理系统')
    .setDescription('后台管理系统API接口文档')
    .setVersion('1.0 版本')
    //.addTag('cats')添加一个
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
  console.log(`http://localhost:3000/api-docs`);//访问swagger
}
bootstrap();
