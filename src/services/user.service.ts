import { DocumentDefinition, FilterQuery } from 'mongoose';

import UserModel, { UserDocument } from '../models/user.model';

import {
  getPasswordMessages,
  getUsernameMessages,
} from '../utils/errors.messages';

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword' | 'salt'>
  >
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username, is_valid: true });

  if (!user) {
    return {
      result: false,
      error: getUsernameMessages(2),
    };
  }

  const isValid = await user.comparePassword(password);

  return isValid
    ? { result: true, data: user }
    : {
        result: false,
        error: { type: 'password', message: getPasswordMessages(3)?.message },
      };
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query);
}
