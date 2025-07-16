import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // TODO: Configure transport with RabbitMQ
    // TODO: Connect with the service exercise
    HttpModule.register({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
    }),
  ],
  exports: [HttpModule],
})
export class GetPorcentageTemplateSkillTransport {}
