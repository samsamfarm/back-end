const { BadRequest, Unauthorized } = require('../errors');
const UserRepository = require('../repositories/userRepository');
const DeviceRepository = require('../repositories/deviceRepository');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor() {
        this.repository = new UserRepository();
        this.deviceRepository = new DeviceRepository();
    }

    findUserByUserId(id) {
        return this.repository.findById(id);
    }

    async createUser(user) {
        try {
            const result = await this.repository.createUser(user);
            return result;
        } catch(error) {
            if(error.errno == 1062) {
                throw new BadRequest({ email: "duplicate" });
            } else {
                console.error("email : failed", error);
                throw new BadRequest({ email: "failed" });
            }
        }
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
                throw new BadRequest({ user: "not_found" });
            };
        } catch (error) {
            new Error(error);
        }
    }

    async validateUserByPasswordAndEmail(email, password) {
        const userInfo = await this.repository.findByEmail(email);
        if (userInfo == null) {
            throw new Unauthorized({email: "invalid"});
        }

        const passwordCheck = bcrypt.compareSync(password, userInfo.password);
        if(passwordCheck === false) {
            throw new Unauthorized({email: "invalid"});
        }
    }

     async getLoginInfoByUser(user) {
        const userInfo = await this.repository.findByEmail(user.email);
        const device = await this.deviceRepository.getDeviceByUserId(userInfo.id);
        if (userInfo == null) {
            throw new Error({ user: "not_found" });
        }

        // Create JWT
        const tokenPayload = {
          id: userInfo.id,
          email: userInfo.email,
          device_id: device?.id || null,
        };

        const tokenOptions = {
            algorithm : "HS256",
            expiresIn : "12h",
            issuer : "samsamfarm"
        }

        const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenOptions)

        userInfo.accessToken = accessToken;

        return userInfo;
    }

    async updateUser(user) {
        return this.repository.updateUser(user);
    }

    deleteUser(user) {
        this.repository.deleteUser(user);
    }
}

module.exports = UserService;
