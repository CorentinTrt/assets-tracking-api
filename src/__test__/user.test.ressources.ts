import mongoose from 'mongoose';
import config from 'config';

import {getPasswordMessages, getUsernameMessages,} from '../utils/errors.messages';

const userInput = {
    email: 'test@mail.com',
    username: config.get<string>('test_user_username'),
    password: config.get<string>('test_user_pswd'),
    passwordConfirmation: config.get<string>('test_user_pswd'),
};

const userPayload = {
    email: 'test@test.com',
    username: 'test1q',
    _id: new mongoose.Types.ObjectId().toString(),
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
};

const incorrectUsernamePayload = [
    {
        type: 'username',
        message: getUsernameMessages(1)?.message,
    },
];

const incorrectPasswordPayload = [
    {
        type: 'password',
        message: getPasswordMessages(1)?.message,
    },
    {
        type: 'password',
        message: getPasswordMessages(8)?.message,
    },
    {
        type: 'password',
        message: getPasswordMessages(9)?.message,
    },
    {
        type: 'password',
        message: getPasswordMessages(10)?.message,
    },
    {type: 'password', message: getPasswordMessages(5)?.message},
];

const incorrectEmailPayload = [
    {
        type: 'email',
        message: "Your email does not match to email's standards",
    },
];

const duplicateKeyPayload = [
    {
        type: 'db',
        message:
            'MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test@mail.com" }',
    },
];

export {
    userInput,
    userPayload,
    incorrectUsernamePayload,
    incorrectPasswordPayload,
    incorrectEmailPayload,
    duplicateKeyPayload,
};
