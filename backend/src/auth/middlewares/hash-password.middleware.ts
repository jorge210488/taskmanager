import * as bcrypt from 'bcrypt';
import { UserDocument } from '../schemas/user.schema';

export async function hashPasswordMiddleware(
  this: UserDocument,
  next: Function,
) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
}
