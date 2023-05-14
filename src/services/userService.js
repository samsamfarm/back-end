const { BadRequest, InternalServerError, Unauthorized } = require('../errors');
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
        const deivce = await this.deviceRepository.getDeviceByUserId(userInfo.id);
        if (userInfo == null) {
            throw new Error("Not Found User");
        }
        
        // Create JWT
        const tokenPayload = {
            id: userInfo.id,
            email: userInfo.email,
            deivce_id: deivce?.id || null,
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
        const result = await this.repository.updateUser(user);
        if (result == 1) {
            const userData = this.findUserByUserId(user.id);
            return userData;
        }
        throw new InternalServerError("Update Failed");
    }

    deleteUser(user) {
        this.repository.deleteUser(user);
    }
}

module.exports = UserService;
