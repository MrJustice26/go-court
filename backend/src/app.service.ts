import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): { status: string } {
    return { status: 'OK' };
  }
}
