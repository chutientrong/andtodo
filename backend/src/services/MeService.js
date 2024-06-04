import MyError from '../exception/MyError.js';
import User from '../models/User.js';
import userValidate from '../validate/userValidate.js';
import authService from './AuthService.js';
import commonUtils from '../utils/commonUtils.js';

class MeService {
    async getProfile(_id) {
        const user = await User.getById(_id);

        return user;
    }

    async updateProfile(_id, profile) {
        if (!profile) throw new MyError('Profile invalid');

        const profileWasValidate = userValidate.checkProfile(profile);

        // check user
        await User.getById(_id);

        await User.updateOne({ _id }, { ...profileWasValidate });
    }

    async changeAvatar(_id, file) {
        this.checkImage(file);

        const user = await User.getById(_id);
        const { avatar } = user;
        // if (avatar) await awsS3Service.deleteFile(avatar);

        // const avatarUrl = await awsS3Service.uploadFile(file);
        // await User.updateOne({ _id }, { avatar: avatarUrl });

        // return avatarUrl;
    }

    checkImage(file) {
        const { mimetype } = file;

        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
            throw new MyError('Image invalid');
    }


}

export default new MeService();
