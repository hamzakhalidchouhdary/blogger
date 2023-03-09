const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');
const UserModel = require('../../app/models').User;

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('auth', function() {
  describe('Signup', function() {
    it('should create new user', async function() {
      const payload = {
        firstName: 'test',
        lastName: 'user',
        username: 'abc12',
        hashedPassword: '1234'
      };
      const resp = await request(app)
        .post('/api/v1/auth/signup')
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.have.key('id');
      const latestUser = await UserModel.findLatest();
      resp.body.id.should.equal(latestUser.id);
      latestUser.firstName.should.equal(payload.firstName);
      latestUser.lastName.should.equal(payload.lastName);
      latestUser.username.should.equal(payload.username);
    });
    it('should access signup:get route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .get('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
    it('should access signup:put route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .put('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
    it('should access signup:delete route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .delete('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
  });
});