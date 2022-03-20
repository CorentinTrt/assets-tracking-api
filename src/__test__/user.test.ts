import superTest from 'supertest';

import createServer from '../utils/server';
import connect, {disconnect} from '../utils/db.connect';
import {errorResponse, successResponse} from '../utils/responses';

import * as UserService from '../services/user.service';

import {
    duplicateKeyPayload,
    incorrectEmailPayload,
    incorrectPasswordPayload,
    incorrectUsernamePayload,
    userInput,
    userPayload,
} from './user.test.ressources';

const app = createServer();

describe('          __USERS__', () => {
    describe('POST - /users', () => {
        describe('(M) - requestValidate', () => {
            describe('incorrect username format', () => {
                it('should return a 400', async () => {
                    const createUserService = jest.spyOn(UserService, 'createUser');

                    const {statusCode, body} = await superTest(app)
                        .post('/api/users')
                        .send({...userInput, username: 'user'});

                    expect(statusCode).toEqual(400);
                    expect(body).toEqual(errorResponse(400, incorrectUsernamePayload));
                    expect(createUserService).not.toHaveBeenCalled();
                });
            });
            describe('incorrect password format + password confirmation', () => {
                it('should return a 400', async () => {
                    const createUserService = jest.spyOn(UserService, 'createUser');

                    const {statusCode, body} = await superTest(app)
                        .post('/api/users')
                        .send({...userInput, password: 'q', passwordConfirmation: 'w'});

                    expect(statusCode).toEqual(400);
                    expect(body).toEqual(errorResponse(400, incorrectPasswordPayload));
                    expect(createUserService).not.toHaveBeenCalled();
                });
            });
            describe('incorrect email format', () => {
                it('should return a 400', async () => {
                    const createUserService = jest.spyOn(UserService, 'createUser');

                    const {statusCode, body} = await superTest(app)
                        .post('/api/users')
                        .send({...userInput, email: 'q'});

                    expect(statusCode).toEqual(400);
                    expect(body).toEqual(errorResponse(400, incorrectEmailPayload));
                    expect(createUserService).not.toHaveBeenCalled();
                });
            });
        });
        describe('(C) - createUserHandler', () => {
            describe('duplicate key', () => {
                beforeAll(async () => {
                    await connect();
                });

                afterAll(async () => {
                    await disconnect();
                });

                it('should return a 409', async () => {
                    const {statusCode, body} = await superTest(app)
                        .post('/api/users')
                        .send(userInput);

                    expect(statusCode).toEqual(409);
                    expect(body).toEqual(errorResponse(409, duplicateKeyPayload));
                });
            });
            describe('correct request', () => {
                it('should return a 201 + user payload', async () => {
                    const createUserServiceMock = jest
                        .spyOn(UserService, 'createUser')
                        // @ts-ignore
                        .mockReturnValueOnce(userPayload);

                    const {statusCode, body} = await superTest(app)
                        .post('/api/users')
                        .send(userInput);

                    expect(statusCode).toEqual(201);
                    expect(body).toEqual(successResponse(201, userPayload));
                    expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
                });
            });
        });
    });
});
