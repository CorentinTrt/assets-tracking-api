import superTest from 'supertest';

import connect, { disconnect } from '../utils/db.connect';
import createServer from '../utils/server';
import { errorResponse, successResponse } from '../utils/responses';

import * as SessionService from '../services/session.service';
import * as UserService from '../services/user.service';
import * as TokenService from '../services/tokens.service';
import * as JWT from '../utils/jwt.utils';

import SessionModel from '../models/session.model';
import TokensModel from '../models/tokens.model';

import {
  incorrectPasswordFormatPayload,
  incorrectPasswordPayload,
  incorrectUsernamePayload,
  sessionInput,
  sessionPayload,
} from './session.test.ressources';
import spyOn = jest.spyOn;

const app = createServer();

describe('          __SESSIONS__', () => {
  describe('POST - /sessions', () => {
    describe('(M) - requestValidate', () => {
      describe('incorrect username format', () => {
        it('should return 400', async () => {
          const createSessionService = jest.spyOn(
            SessionService,
            'findSession'
          );

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .send({ ...sessionInput, username: 'user' });

          expect(statusCode).toEqual(400);
          expect(body).toEqual(errorResponse(400, incorrectUsernamePayload));
          expect(createSessionService).not.toHaveBeenCalled();
        });
      });
      describe('incorrect password format', () => {
        it('should return 400', async () => {
          const createSessionService = jest.spyOn(
            SessionService,
            'findSession'
          );

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .send({ ...sessionInput, password: 'test' });

          expect(statusCode).toEqual(400);
          expect(body).toEqual(
            errorResponse(400, incorrectPasswordFormatPayload)
          );
          expect(createSessionService).not.toHaveBeenCalled();
        });
      });
    });
    describe('(C) - createSessionHandler', () => {
      beforeAll(async () => {
        await connect();
      });

      afterAll(async () => {
        await disconnect();
      });
      describe('incorrect password', () => {
        it('should return a 401', async () => {
          const createSessionService = jest.spyOn(
            SessionService,
            'findSession'
          );

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .send({ ...sessionInput, password: 'Qwerty!1' });

          expect(statusCode).toEqual(401);
          expect(body).toEqual(errorResponse(401, incorrectPasswordPayload));
          expect(createSessionService).not.toHaveBeenCalled();
        });
      });
      describe('no open session found', () => {
        it('should return a 201 + session payload', async () => {
          const validatePasswordService = spyOn(
            UserService,
            'validatePassword'
          );
          const findSessionService = spyOn(SessionService, 'findSession');
          const createSessionService = spyOn(SessionService, 'createSession');
          const createTokensService = spyOn(TokenService, 'createTokens');
          const findTokenService = spyOn(TokenService, 'findTokens');

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .send(sessionInput);

          expect(validatePasswordService).toHaveBeenCalled();
          expect(findSessionService).toHaveBeenCalled();
          expect(createSessionService).toHaveBeenCalled();
          expect(createTokensService).toHaveBeenCalled();
          expect(findTokenService).not.toHaveBeenCalled();

          expect(statusCode).toEqual(201);
          // add .toEqual(payload)
        });
      });
      describe('open session found', () => {
        afterAll(async () => {
          await SessionModel.find().remove();
          await TokensModel.find().remove();
        });
        it('should return a 200 + session payload', async () => {
          const validatePasswordService = spyOn(
            UserService,
            'validatePassword'
          );
          const findSessionService = spyOn(SessionService, 'findSession');
          const createSessionService = spyOn(SessionService, 'createSession');
          const createTokensService = spyOn(TokenService, 'createTokens');
          const findTokenService = spyOn(TokenService, 'findTokens');

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .send(sessionInput);

          expect(validatePasswordService).toHaveBeenCalled();
          expect(findSessionService).toHaveBeenCalled();
          expect(createSessionService).not.toHaveBeenCalled();
          expect(createTokensService).not.toHaveBeenCalled();
          expect(findTokenService).toHaveBeenCalled();

          expect(statusCode).toEqual(200);
          // add .toEqual(payload)
        });
      });
    });
  });
  // describe('GET - /sessions', () => {
  //   describe('(M) - requireUser', () => {
  //     it('should return', () => {});
  //   });
  // });
  describe('DELETE - /sessions', () => {
    describe('(M) - userDeserialize', () => {
      describe('no access token', () => {
        it('should call next()', async () => {
          const findTokenService = spyOn(TokenService, 'findTokens');
          const verifyJwtUtil = spyOn(JWT, 'verifyJWT');

          const { statusCode, body } = await superTest(app)
            .post('/api/sessions')
            .set('Authorization', '')
            .send({ ...sessionInput, username: 'user' });

          expect(findTokenService).toHaveBeenCalled();
          expect(verifyJwtUtil).not.toHaveBeenCalled();
        });
      });
      describe('access token expired', () => {
        it('should call next()', () => {});
      });
    });
    describe('(M) - userRequire', () => {
      describe('no user', () => {
        it('should return a 403', () => {});
      });
    });
    describe('(C) - deleteSessionHandler', () => {
      describe('session & tokens has been updated', () => {
        it('should return a 200 + message', () => {});
      });
    });
  });
});
