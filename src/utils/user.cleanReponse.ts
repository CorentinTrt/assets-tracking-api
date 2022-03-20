import { UserDocument } from '../models/user.model';

export default function (data: UserDocument) {
  const { _id, username, email, password, createdAt, updatedAt } = data;

  return { _id, username, email, password, createdAt, updatedAt };
}
