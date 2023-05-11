const { BadRequest, InternalServerError } = require('../errors');
const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');


class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async findUserByUserId(id) {
        await this.validateUserByUserId(id);
        return this.repository.findById(id);
    }

    createUser(user) {
        return this.repository.createUser(user);
    }

    async validateUserByUserId(userId) {
        const userInfo = await this.repository.findById(userId);
        if (userInfo == null) {
            throw new BadRequest({user: "not_found"})
        };
    }

    async validateUserByEmail(email) {
        try {
            const userFlag = await this.repository.findByEmail(email);
            if (userFlag === null) {
                throw new BadRequest("Not Found User")
            };
        } catch (error) {
            new Error(error);
        }
    }

    async validateUserByPasswordAndEmail(password, email) {
        try {
            const userInfo = await this.repository.findByEmail(email);
            if (userInfo == null) {
                throw new BadRequest("Not Found User")
            };
    
            const passwordCheck = bcrypt.compareSync(password, userInfo.password);
            if(!passwordCheck) {
                throw new BadRequest("No Matched Password");
            }
        } catch (error) {
            new Error(error);
        }
    }

     async getLoginInfoByUser(user) {
        const userInfo = await this.repository.findByEmail(user.email);
        if (userInfo === null) {
            throw new Error("Not Found User");
        }

        return userInfo;
    }

    async updateUser(user) {
        const result = await this.repository.updateUser(user);
        if (result == 1) {
            const userData = this.findUserByUserId(user.id);
            return userData;
        }
        throw new InternalServerError("Update Failed");
    }

    deleteUser(user) {
        const result = this.repository.deleteUser(user);
        return result;
    }
}

module.exports = UserService;
