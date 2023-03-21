const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixture = require('../fixtures/user');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Manage Profile', function() {
  beforeEach(async function() {
    this.user = await UserFixture.createUser({hashedPassword: '1234'});
    const resp = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: this.user.username,
        password: '1234'
      });
    this.token = resp.body.token;
  })
  it('should allow to create profile', async function() {
    const resp = await request(app)
      .post('/api/v1/user/profile')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
    resp.status.should.equal(HTTP_STATUS.CREATED);
    resp.body.should.empty;
  });
  it('should allow to update profile', async function() {
    const resp = await request(app)
      .put('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow to delete profile', async function() {
    const resp = await request(app)
      .delete('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow to get profile', async function() {
    const resp = await request(app)
      .get('/api/v1/user/profile')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
});