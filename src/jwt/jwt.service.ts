import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {
  }

  sign(id: number): string {
    return jwt.sign({ id }, this.configService.get('PRIVATE_KEY'));
  }

  verify(token: string) {
    return jwt.verify(token, this.configService.get('PRIVATE_KEY'));
  }
}
