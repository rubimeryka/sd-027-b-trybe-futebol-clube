import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches';
import { matchesMock } from './mocks/Matchers.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa partidas', () => {
  it('Testa se é possível retornar todas as partidas', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
   
    const { status, body } = await chai.request(app).get('/matches');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesMock);
  });

  it('Testa se é possível filtrar partidas em progresso', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
    
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesMock);
  });
  
  it('Retorna partidas que não estão em progresso', async () => {
		const result = await chai.request(app).get('/matches?inProgress=false').send();
				
		expect(result.status).to.be.deep.equal(200);
  });

  it('Retorna mensagem de erro caso a partida não esteja finalizada', async () => {
    const { status, body } = await chai.request(app).patch('/matches/1/finish');

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token not found');
  });

  it('Retorna erro para token inválido', async () => {
    sinon.stub(JWT, 'verify').returns('Token must be a valid token');

    const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'invalidToken');

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token must be a valid token');
  });

  describe('Testa a atualização das partidas', () => {
    const updatedGoals = {
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    };

    it('Retorna erro quando um token não é encontado', async () => {
      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .send(updatedGoals);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token not found');
    });

    it('Retorna erro caso o token seja inválido', async () => {
      sinon.stub(JWT, 'verify').returns('Token must be a valid token');

      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', 'invalidToken')
        .send(updatedGoals);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token must be a valid token');
    });
  });

  afterEach(sinon.restore);
});