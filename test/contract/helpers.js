import Joi from 'joi';

import app from '../../app';
import supertest from 'supertest';
import chai from 'chai';
import joiAssert from 'joi-assert';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.joiAssert = joiAssert;

global.Joi = Joi;