const { expect } = require('chai');
const CommentModel = require('../../app/models').Comment;
const ERROR_TEXT = require('../../utils/constants/errorText');

describe('Comment Model', function(){
  describe('Create new', function() {
    it('should expect a object arg', async function() {
      try{
        await CommentModel.new('');
      }catch(err) {
        expect(err.message).to.equal(ERROR_TEXT.NOT_OBJECT);
      }
    });
    it('should expect a non object arg', async function() {
      try{
        await CommentModel.new({});
      }catch(err) {
        expect(err.message).to.equal(ERROR_TEXT.EMPTY);
      }
    });
  });
});