import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { team, teams } from './mocks/Teams.mocks';
import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa times', () => {
  it('Todos os times devem ser retornados', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa se a função retorna um time pelo seu id', async function() {
    sinon.stub(TeamsModel, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

});
