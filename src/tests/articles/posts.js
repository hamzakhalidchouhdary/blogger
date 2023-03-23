const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Posts', function() {
  before(async function() {
    this.user = await UserFixtures.createUser();
    this.token = await UserFixtures.getUserToken(this.user.id);
  });
  it('should allow user to create new post', async function() {
    const resp = await request(app)
      .post('/api/v1/article')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.CREATED);
    resp.body.should.empty;
  });
  it('should allow user to edit a post', async function() {
    const resp = await request(app)
      .put('/api/v1/article')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow user to delete a post', async function() {
    const resp = await request(app)
      .delete('/api/v1/article')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow user to fetch all post', async function() {
    const resp = await request(app)
      .get('/api/v1/article')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow user to fetch post by id', async function() {
    const resp = await request(app)
      .get('/api/v1/article/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
});