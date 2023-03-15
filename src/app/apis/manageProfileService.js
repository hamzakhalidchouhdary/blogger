const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createProfile = function(req, res) {
  try{
    res.status(HTTP_STATUS.CREATED).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const updateProfile = function(req, res) {
  try{
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const deleteProfile = function(req, res) {
  try{
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const getProfile = function(req, res) {
  try{
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile
};