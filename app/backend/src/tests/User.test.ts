import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../../src/app';
import {
  dbUserMock,
  dbUserWrongPassword
} from './mocks/Users.mock';
import JWT from '../utils/JWT';
import Validations from '../validations/Validations';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa login', () => {
  it('Testa se é possível fazer login', async () => {
    sinon.stub(User, 'findOne').resolves(dbUserMock as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@email.com',
        password: '123456'
      });
    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('Testa se retorna erro caso a senha não seja inserida', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@email.com'
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message", 'All fields must be filled');
  });

  it('Testa se retorna erro caso o email seja inválido', async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({
        email: 'user.email.com',
        password: '123456'
      });
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Testa se retorna erro caso a senha seja inválida', async () => {
    sinon.stub(User, 'findOne').resolves(dbUserWrongPassword as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@email.com',
        password: '#@%'
      });
    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });
  afterEach(sinon.restore);
});
