import { NestFactory } from '@nestjs/core';
import { AdminModule } from './modules/admin/admin.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  //配置cookie中间件
  app.use(cookieParser("this signed cookies"));
  //配置session的中间件
  app.use(session({
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 219000,httpOnly:true },
    rolling:true
  }));

  //允许跨域
  app.enableCors({
    origin: "http://localhost:8080",
    credentials: true,//允许cookie
  });


  const config = new DocumentBuilder()
    .setTitle('后台管理系统')
    .setDescription('后台管理系统API接口文档')
    .setVersion('1.0 版本')
    // .addBearerAuth()//启用token验证功能
    //.addTag('cats')添加一个
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
  console.log(`http://localhost:3000/api-docs`);//访问swagger
}
bootstrap();
