import { Controller, Post, Body } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('webhooks/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  handleWebhookEvent(@Body() payload: any) {
    this.githubService.handleWebhookEvent(payload);
  }
}
