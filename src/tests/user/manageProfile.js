const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Manage Profile', function() {
  it('should allow to create profile', async function() {
    const resp = await request(app)
      .post('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.CREATED);
  });
  it('should allow to update profile', async function() {
    const resp = await request(app)
      .put('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
  });
  it('should allow to delete profile', async function() {
    const resp = await request(app)
      .delete('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
  });
  it('should allow to get profile', async function() {
    const resp = await request(app)
      .get('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
  });
});