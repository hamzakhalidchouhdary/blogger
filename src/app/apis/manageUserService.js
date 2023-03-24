const ServiceResponse = require("../../utils/common/serviceResponse");
const HTTP_STATUS = require("../../utils/constants/httpStatus");

const createUserProfile = async function (req, res) {
  try {
    const { user, body: userDetails = {} } = req;
    const newUser = await user.createUser(userDetails);
    res.status(HTTP_STATUS.CREATED).json(newUser);
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const updateUserProfile = function (req, res) {
  try {
    const { user } = req;
    user.updateUser();
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const deleteUserProfile = function (req, res) {
  try {
    const { user } = req;
    user.deleteUser();
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

const getUserProfile = function (req, res) {
  try {
    res.status(HTTP_STATUS.OK).end();
    return;
  } catch (err) {
    ServiceResponse.error(res, err);
    return;
  };
};

module.exports = {
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile
};