import userService from "../services/UserSevice.js";

class UserController {

    // [GET]
    async getList(req, res, next) {
        const { email = '', page = 0, size = 20 } = req.query;

        try {
            const users = await userService.getList(
                email,
                parseInt(page),
                parseInt(size)
            );

            res.json(users);
        } catch (err) {
            next(err);
        }
    }
  // [GET] /search/email/:email
  async getByUsername(req, res, next) {
    const { _id } = req;
    const { email } = req.params;

    try {
      const user = await userService.getUserSummaryInfo( email);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /search/id/:userId
  async getUserById(req, res, next) {
    const { _id } = req;
    const { userId } = req.params;

    try {
      const user = await userService.getUserById(userId);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
