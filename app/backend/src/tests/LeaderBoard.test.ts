import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import LeaderBoard from '../utils/leaderBoard';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2Nzk4Mjg4LCJleHAiOjE2ODc0MDMwODh9.Ec17E3dZRM49r77xW5Zufe2uoSRPpRH98Hc9ReY2J_s'

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard', () => {
    afterEach(() => {
        sinon.restore();
      })

  it('Retorna o endpoint /leaderboard/home com sucesso', async () => {
        const result = await chai.request(app).get('/leaderboard/home')
		.set('token', token).send();		

		expect(result.status).to.be.deep.equal(200);
    });

  it('Retorna /leaderboard/away com sucesso', async () => {
		const result = await chai.request(app).get('/leaderboard/away')
		.set('token', token).send();		

		expect(result.status).to.be.deep.equal(200);
  });
  });

    it('Retorna corretamente os pontos quando um time ganha', () => {
      const aTeamScore = 2;
      const bTeamScore = 1;
      const points = 5;
      const expectedPoints = 8;

      const result = LeaderBoard.points(aTeamScore, bTeamScore, points);

      expect(result).to.equal(expectedPoints);
    });

    it('Retorna corretamente os pontos em caso de empate', () => {
      const aTeamScore = 1;
      const bTeamScore = 1;
      const points = 3;
      const expectedPoints = 4;

      const result = LeaderBoard.points(aTeamScore, bTeamScore, points);

      expect(result).to.equal(expectedPoints);
    });

    it('Retorna os pontos do time de fora', () => {
      const aTeamScore = 0;
      const bTeamScore = 2;
      const points = 7;
      const expectedPoints = 7;

      const result = LeaderBoard.points(aTeamScore, bTeamScore, points);

      expect(result).to.equal(expectedPoints);
    });

