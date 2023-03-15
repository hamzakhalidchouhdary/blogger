const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Comments', function() {
  it('should allow user to add comments on article', async function() {
    const resp = await request(app)
      .post('/api/v1/article/1/comment')
      .send({});
    resp.status.should.equal(HTTP_STATUS.CREATED);
    resp.body.should.empty;
  });
  it('should allow user to edit comments on article', async function() {
    const resp = await request(app)
      .put('/api/v1/article/1/comment')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow user to delete comments on article', async function() {
    const resp = await request(app)
      .delete('/api/v1/article/1/comment')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
  it('should allow user to view comments on article', async function() {
    const resp = await request(app)
      .get('/api/v1/article/1/comment')
      .send({});
    resp.status.should.equal(HTTP_STATUS.OK);
    resp.body.should.empty;
  });
});