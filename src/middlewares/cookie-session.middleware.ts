import { Injectable, NestMiddleware } from '@nestjs/common';
const cookieSession = require('cookie-session');

@Injectable()
export class CookieSessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    cookieSession({
      name: 'session', // Tên của cookie
      keys: ['your-secret-key'], // Mảng các khóa để mã hóa cookie <=> this.configService.get<string>('COOKIE_KEY')
      maxAge: 2 * 60 * 1000, // Thời gian sống của cookie (1 ngày)
    })(req, res, next);
  }
}
