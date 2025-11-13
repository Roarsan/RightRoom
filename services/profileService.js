const UserModel = require('../models/userModel');
const ExpressError = require('../utils/ExpressError');
const httpStatus = require('../utils/httpStatus');

const profileService={
    getProfile: async (id) => {
        const profile = await UserModel.findById(id);
        if (!profile) {
            throw new ExpressError(httpStatus.NOT_FOUND.code, 'Profile Not Found');
          }
        return profile;
    }
};
module.exports = profileService;