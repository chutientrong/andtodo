import bcrypt from 'bcryptjs';
import MyError from '../exception/MyError.js';
import NotFoundError from '../exception/NotFoundError.js';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshTokens: {
            type: [
                {
                    token: String,
                    source: String,
                },
            ],
            default: [],
        },
        isActived: Boolean,
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email,
        isActived: true,
        isDeleted: false,
    });

    if (!user) throw new NotFoundError('User');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new MyError('Password invalid');

    return user;
};

userSchema.statics.existsById = async (_id) => {
    const user = await User.findOne({ _id, isActived: true });
    if (user) return true;
    return false;
};

userSchema.statics.checkByIds = async (ids, message = 'User') => {
    for (const idEle of ids) {
        const user = await User.findOne({
            _id: idEle,
            isActived: true,
            isDeleted: false,
        });

        if (!user) throw new NotFoundError(message);
    }
};

userSchema.statics.getById = async (_id, message = 'User') => {
    const user = await User.findOne({ _id, isActived: true });
    if (!user) throw new NotFoundError(message);

    const {
        name,
        email
    } = user;
    return {
        _id,
        name,
        email
    };
};

userSchema.statics.existsByUsername = async (email) => {
    const user = await User.findOne({
        email,
        isActived: true,
    });
    if (user) return true;
    return false;
};

userSchema.statics.findByUsername = async (email, message = 'User') => {
    const user = await User.findOne({
        email,
        isActived: true,
    });

    if (!user) throw new NotFoundError(message);

    const { _id, name, dateOfBirth, gender, avatar } =
        user;
    return {
        _id,
        name,
        email
    };
};

userSchema.statics.checkById = async (_id, message = 'User') => {
    const user = await User.findOne({ _id, isActived: true });

    if (!user) throw new NotFoundError(message);

    return user;
};

userSchema.statics.getSummaryById = async (_id, message = 'User') => {
    const user = await User.findOne({ _id, isActived: true });
    if (!user) throw new NotFoundError(message);

    const { name } = user;
    return {
        _id,
        name
    };
};

const User = mongoose.model('User', userSchema);

export default  User;
