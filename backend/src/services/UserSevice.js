import NotFoundError from"../exception/NotFoundError.js";
import User from"../models/User.js";
import commonUtils from"../utils/commonUtils.js";

class UserService {
  async getUserSummaryInfo(email) {
    const user = await User.findOne(
      { email },
      "-_id email name isActived"
    );

    if (!user) throw new NotFoundError("User");

    return user;
  }

  async getUserById(userId) {
    const user = await User.getById(userId);

    if (!user) throw new NotFoundError("User");

    return user;
  }

  async getList(email, page, size) {
    const { skip, limit, totalPages } = commonUtils.getPagination(
      page,
      size,
      await User.countDocuments({
        email: { $regex: ".*" + email + ".*" },
      })
    );

    const users = await User.find(
      {
        // email: { $regex: ".*" + email + ".*" },
      },
      "name email isActived isDeleted"
    )
      .skip(skip)
      .limit(limit);

    return {
      data: users,
      page,
      size,
      totalPages,
    };
  }

  async updateActived(userId, status) {
    const { nModified } = await User.updateOne(
      { _id: userId },
      { isDeleted: status }
    );

    if (nModified === 0) throw new NotFoundError("User");
  }
}

export default new UserService();
