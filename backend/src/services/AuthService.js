import User from "../models/User.js";
import userValidate from "../validate/userValidate.js";
import AuthenError from "../exception/AuthenError.js";
import tokenUtils from "../utils/tokenUtils.js";

class AuthService {
  async login(email, password, source) {
    userValidate.validateLogin(email, password);
    const { _id } = await User.findByCredentials(email, password);

    return await this.generateAndUpdateAccessTokenAndRefreshToken(_id, source);
  }

  async generateAndUpdateAccessTokenAndRefreshToken(_id, source) {
    const token = await tokenUtils.generateToken(
      { _id, source },
      process.env.JWT_LIFE_ACCESS_TOKEN
    );
    const refreshToken = await tokenUtils.generateToken(
      { _id, source },
      process.env.JWT_LIFE_REFRESH_TOKEN
    );

    await User.updateOne({ _id }, { $pull: { refreshTokens: { source } } });
    await User.updateOne(
      { _id },
      { $push: { refreshTokens: { token: refreshToken, source } } }
    );

    return {
      token,
      refreshToken,
    };
  }

  async signup(userInfo) {
    const registerInfo = await userValidate.checkRegisterInfo(userInfo);
    const newUser = new User({
      ...registerInfo,
      isActived: true,
    });
    return await newUser.save();
  }

  async logout(req) {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("Invalid token");
    }
    const token = tokenString.replace("Bearer ", "");

    await User.updateOne(
      { _id: req._id },
      { $push: { refreshTokens: { token: "", source: "" , isActived: false} } }
    );
  }

  async refreshToken(refreshToken, reqSource) {
    // check token
    const { _id } = await tokenUtils.verifyToken(refreshToken);

    const user = await User.findOne({
      _id,
      isActived: true,
      refreshTokens: {
        $elemMatch: { token: refreshToken, source: reqSource },
      },
    });

    if (!user) throw new AuthenError();

    return await tokenUtils.generateToken(
      { _id, source: reqSource },
      process.env.JWT_LIFE_ACCESS_TOKEN
    );
  }
}

export default new AuthService();
