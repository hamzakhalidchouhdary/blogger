const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Manage User', function() {
  it('should allow to create new user profile', async function() {
    const resp = await request(app)
      .post('/api/v1/user/manage/new')
      .send({});
    resp.status.should.equal(HTTP_STATUS.CREATED);
    resp.body.should.empty;
  });
  it('should allow to update user profile', async function() {
    const resp = await request(app)
      .put('/api/v1/user/manage/1')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow to delete user profile', async function() {
    const resp = await request(app)
      .delete('/api/v1/user/manage/1')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow to get user profile', async function() {
    const resp = await request(app)
      .get('/api/v1/user/manage/1')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
});