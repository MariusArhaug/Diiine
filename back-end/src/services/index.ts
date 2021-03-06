import { Application } from '../declarations';
import users from './users/users.service';
import dinners from './dinners/dinners.service';
import chat from './chat/chat.service';
import attendingdinners from './attendingdinners/attendingdinners.service';
import rating from './rating/rating.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(dinners);
  app.configure(chat);
  app.configure(attendingdinners);
  app.configure(rating);
}
