import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { DbModule } from "@libs/db";


@Module({
  imports: [DbModule],
  controllers: [TestController]
})
export class TestModule {}
