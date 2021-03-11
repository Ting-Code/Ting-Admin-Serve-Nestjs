import { Injectable, NestMiddleware } from '@nestjs/common';
import * as auth from "basic-auth";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const data = auth(req);
    const decoded = jwt.verify(data.name, "admin")
    console.log()
    if (true) {
      next();

    } else {
        res.send();
    }
    next();
  }
}
