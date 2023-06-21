import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Should be able to get all matches', () => {
  it('Return all matches', async () => {
    sinon.stub(Matches, 'findAll').resolves();
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
 //   expect(body).to.be.deep.equal();
  });

  it('Should be able to get all matcher in progress', async () => {
    sinon.stub(Matches, 'findAll').resolves();
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.equal(200);
  //  expect(body).to.be.deep.equal();
  });

  it('Should be able to get all matches not in progress', async () => {
    sinon.stub(Matches, 'findAll').resolves();
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.equal(200);
  //  expect(body).to.be.deep.equal();
  });

  afterEach(sinon.restore);
});