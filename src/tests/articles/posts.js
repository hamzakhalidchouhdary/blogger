const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Posts', function() {
  it('should allow user to create new post', async function() {
    const resp = await request(app)
      .post('/api/v1/article')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow user to edit a post', async function() {
    const resp = await request(app)
      .put('/api/v1/article')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow user to delete a post', async function() {
    const resp = await request(app)
      .delete('/api/v1/article')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow user to fetch all post', async function() {
    const resp = await request(app)
      .get('/api/v1/article')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
  it('should allow user to fetch post by id', async function() {
    const resp = await request(app)
      .get('/api/v1/article/1')
      .send({});
    resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
    resp.body.should.empty;
  });
});