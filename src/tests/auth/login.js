const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('auth', function() {
  describe('Login', function() {
    it('should login user', async function() {
      const resp = await request(app)
        .post('/api/v1/auth/login')
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.have.key('token');
    });
    it('should access login:get route', async function() {
      const resp = await request(app)
        .get('/api/v1/auth/login')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
    });
    it('should access login:put route', async function() {
      const resp = await request(app)
        .put('/api/v1/auth/login')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
    });
    it('should access login:delete route', async function() {
      const resp = await request(app)
        .delete('/api/v1/auth/login')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
    });
  });
});