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
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('todos os times devem ser retornados', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('testa se a função retorna um time pelo seu id', async function() {
    sinon.stub(TeamsModel, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('retorna "not found" se um time não existir', async function() {
    sinon.stub(TeamsModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('team 1 not found');
  });
});
