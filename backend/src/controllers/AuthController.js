import authService from "../services/AuthService.js";
import userService from "../services/UserSevice.js";

class AuthController {
  // [POST] /login
  async login(req, res, next) {
    const { email, password } = req.body;
    const source = req.headers["user-agent"];

    try {
      const { token, refreshToken } = await authService.login(
        email,
        password,
        source
      );
      return res.status(200).json({ token, refreshToken });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(422)
          .send({ data: { error: true, message: "email must be unique" } });
      } else {
        return res
          .status(500)
          .send({ data: { error: true, message: "server error" } });
      }
    }
  }

  // [POST] /refresh-token
  async refreshToken(req, res, next) {
    const { refreshToken } = req.body;
    const source = req.headers["user-agent"];

    try {
      const token = await authService.refreshToken(refreshToken, source);

      return res.status(200).json({ token });
    } catch (err) {
      return res
        .status(500)
        .send({ data: { error: true, message: "server error" } });
    }
  }

  // [POST] /signup
  async signup(req, res, next) {
    try {
     const user = await authService.signup(req.body);
     console.log('user: ', user);
      return res
        .status(201)
        .json({ data: { message: "Sign up is successfull" } });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(422)
          .send({ data: { error: true, message: "email must be unique" } });
      } else {
        return res
          .status(500)
          .send({ data: { error: true, message: "server error" } });
      }
    }
  }
  // [POST] /logout
  async logout(req, res, next) {
    try {
      await authService.logout(req);

      return res
        .status(201)
        .json({ data: { message: "Log out is successfull" } });
    } catch (err) {
      return res
        .status(500)
        .send({ data: { error: true, message: "server error" } });
    }
  }
}

export default new AuthController();
