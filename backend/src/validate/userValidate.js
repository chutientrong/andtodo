import commonUtils from'../utils/commonUtils.js';
import MyError from'../exception/MyError.js';
import User from'../models/User.js';
import dateUtils from'../utils/dateUtils.js';
import bcrypt from'bcryptjs';

const NAME_INVALID = 'Tên không hợp lệ';
const USERNAME_INVALID = 'Tài khoản không hợp lệ';
const USERNAME_EXISTS_INVALID = 'Tài khoản đã tồn tại';
const PASSWORD_INVALID = 'Mật khẩu không hợp lệ, từ 8 đến 50 kí tự';
const DATE_INVALID = 'Ngày sinh không hợp lệ';
const GENDER_INVALID = 'Giới tính không hợp lệ';
const NAME_REGEX = /\w{1,50}/;

const userValidate = {
    validateEmail: (email) => {
        if (!email) return false;

        const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    },
    validatePhone: (phone) => {
        if (!phone) return false;
        const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

        return regex.test(phone);
    },
    validateUsername: function (email) {
        if (
            !email ||
            (!this.validateEmail(email))
        )
            return false;

        return true;
    },
    // không được trống, 8 <= size <=50
    validatePassword: (password) => {
        if (!password) return false;
        if (password.length < 8 || password.length > 50) return false;

        return true;
    },
    validateLogin: function (email, password) {
        if (
            !this.validateUsername(email) ||
            !this.validatePassword(password)
        )
            throw new MyError('Info login invalid');
    },
    checkRegisterInfo: async function (userInfo) {
        const { name, email, password } = userInfo;
        const error = {};

        if (!name || !NAME_REGEX.test(name)) error.name = NAME_INVALID;

        if (!this.validateUsername(email)) error.email = USERNAME_INVALID;
        else if (await User.findOne({ email }))
            error.email = USERNAME_EXISTS_INVALID;

        if (!this.validatePassword(password)) error.password = PASSWORD_INVALID;

        // nếu như có lỗi
        if (!commonUtils.isEmpty(error)) throw new MyError(error);

        return { name, email, password };
    },
    checkProfile: function (profile) {
        const { name, dateOfBirth, gender } = profile;

        const error = {};

        if (!name || !NAME_REGEX.test(name)) error.name = NAME_INVALID;

        if (!this.validateDateOfBirth(dateOfBirth))
            error.dateOfBirth = DATE_INVALID;

        if (gender !== 0 && gender !== 1) error.gender = GENDER_INVALID;

        if (!commonUtils.isEmpty(error)) throw new MyError(error);

        return {
            name,
            dateOfBirth: dateUtils.toDateFromObject(dateOfBirth),
            gender: new Boolean(gender),
        };
    },
    validateEnterPassword: async function (_id, enterPassword) {
        const { password } = await User.checkById(_id);
        const isPasswordMatch = await bcrypt.compare(enterPassword, password);
        if (!isPasswordMatch) throw new MyError('Password wrong');
    },
    validateChangePassword: function (oldPassword, newPassword) {
        if (
            !this.validatePassword(oldPassword) ||
            !this.validatePassword(newPassword) ||
            oldPassword == newPassword
        )
            throw new MyError('Body change password invalid');
    },
};

export default userValidate;
