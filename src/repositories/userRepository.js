const { Repository } = require("./index");
const { BadRequest } = require("../errors");


// Reference : https://knexjs.org/guide/query-builder.html

class UserRepository extends Repository {
  constructor() {
    super();
      this.table = "users";
  }

  async findById(id) {
    return this.__findByPrimaryKey(this.table, id);
  }

  findByEmail(email) {
    return this.db(this.table).where("email", email).first();
  }

  async createUser(user) {
    const userId = await this.db(this.table)
      .insert({
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        password: user.password,
        mbti: user.mbti,
        phone: user.phone
      })
      .catch((error) => {
        if (error.errno == 1062) {
          // FIXME: Repository 에서는 에러 핸들링을 해주면 안되고, 에러가 발생하지 않기 위해 미리 검증을 해주어야 한다. 
          throw new BadRequest({ email: "duplicate" });
        } else {
          console.error("email : failed", error);
          throw new BadRequest({ email : "failed"});
        }
      });

    const result = await this.findById(userId[0]);
    return result;
  }

  async updateUser(user) {
    const result = await this.db(this.table).where("id", user.id).update({
      name: user.name,
      nickname: user.nickname,
      password: user.password,
      mbti: user.mbti,
      phone: user.phone,
      updated_at: user.updated_at,
    });

    return result;
  }

  async deleteUser(userId) {
    const result = await this.db(this.table).where("id", userId).update({
      deleted_at: new Date(),
    });

    return result;
  }

}

module.exports = UserRepository;
