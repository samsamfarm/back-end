const bcrypt = require('bcrypt');

const {checkMissingParams, checkByPhone, checkByEmail, checkByMbti, checkByPasswordCompare} = require("../utils/validation");
const { BadRequest, Forbidden } = require("../errors");


/**
 * @swagger
 * components:
 *   dtos:
 *     UserDTO:
 *       properties:
 *         id:
 *           type: int
 *           description: 유저의 아이디
 *         email:
 *           type: string
 *           description: 유저의 이메일
 *         name:
 *           type: string
 *           description: 유저의 이름
 *         nickname:
 *           type: string
 *           description: 유저의 닉네임
 *         mbti:
 *           type: string
 *           enum: ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ']
 *           description: mbti 16종류입니다.
 *         phone:
 *           type: string
 *           description: 유저의 전화번호입니다
 *         created_at:
 *           type: string
 *           format: date
 *           description: 유저 생성날짜입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 유저 정보 업데이트 날짜입니다 .
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 유저 정보가 삭제된 날짜입니다.
 *       example:
 *         id: 1
 *         email: abc@abc.com
 *         name: 온호성
 *         nickname: 핸섬호성
 *         mbti: 'ISTJ'
 *         phone: '01012341234'
 *         created_at: '2023-05-05T15:35:37.000Z'
 *         updated_at: '2023-05-05T15:35:37.000Z'
 *         deleted_at: '2023-05-05T15:35:37.000Z'
 */
class UserDTO {
    id;
    email;
    name;
    nickname;
    mbti;
    phone;
    created_at;
    updated_at;
    dleeted_at;

    constructor(data)
    {
        this.id = data.id;
        this.email = data.email;
        this.mbti = data.mbti;
        this.name = data.name;
        this.nickname = data.nickname;
        this.phone = data.phone;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
    }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     CreateUserRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 회원가입시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 name:
 *                   type: string
 *                 nickname: 
 *                   type: string
 *                 mbti:
 *                   type: string
 *                 phone:
 *                   type: string
 *             example:
 *               email: abc@abc.com
 *               name: 온호성
 *               nickname: 핸섬호성
 *               password: thisispassword
 *               mbti: ENFP
 *               phone: '01012343214'
 */
class CreateUserRequestDTO {
    email;
    name;
    nickname;
    password;
    mbti;
    phone;

    constructor(requestData) {
        const requireData = ['email', 'password', 'password_confirm', 'phone', 'mbti', 'nickname', 'name'];
        const errorMessage = checkMissingParams(requestData, requireData);
      
        if (errorMessage) {
            throw new BadRequest(errorMessage);
        }

        const emailFlag = checkByEmail(requestData.email);
        if (emailFlag === false) {
            throw new BadRequest({email: 'invited'});
        }

        const passwordFlag = checkByPasswordCompare(requestData.password, requestData.password_confirm);
        if (passwordFlag === false) {
            throw new BadRequest({password_confirm: 'invited'});
        }

        const phoneFlag = checkByPhone(requestData.phone);
        if (phoneFlag === false) {
            throw new BadRequest({phone: 'invited'});
        }

        const mbtiFlag = checkByMbti(requestData.mbti);
        if (mbtiFlag === false) {
            throw new BadRequest({mbti: 'invited'});
        }


        this.email = data.email;
        this.password = bcrypt.hashSync(data.password, 10);
        this.name = data.name;
        this.nickname = data.nickname;
        this.mbti = data.mbti;
        this.phone = data.phone;
    }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     LoginUserRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 로그인 시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *             example:
 *               email: 'abc@abc.com'
 *               password: 'thisispassword'
 */
class LoginUserRequestDTO {
    email;
    password;

    constructor(requestData) {
        const requireData = ['email', 'password'];
        const errorMessage = checkMissingParams(requestData, requireData)
      
        if (errorMessage) {
            throw new BadRequest(errorMessage);
        }

        const emailFlag = checkByEmail(requestData.email);
        if (emailFlag === false) {
            throw new BadRequest({email: 'invited'});
        }

        this.email = requestData.email;
        this.password = requestData.password;
    }
}


/**
 * @swagger
 * components:
 *   dtos:
 *     UpdateUserRequestDTO:
 *       type: object
 *       parameters:
 *         pathParam:
 *           name: id
 *           in: path
 *           description: 유저 ID
 *           required: true
 *           schema:
 *             $ref: "#/components/schemas/users/properties/id"
 *       requestBody:
 *         description: 유저 업데이트 시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 password:
 *                   type: string
 *                 mbti:
 *                   type: string
 *                 phone:
 *                   type: string
 *             example:
 *               name: '온호성'
 *               nickname: '핸섬호성'
 *               password: 'modifiedpassword'
 *               mbti: 'ESFP'
 *               phone: '01012341234'
 */
class UpdateUserRequestDTO {
    id;
    name;
    nickname;
    password;
    mbti;
    phone;

    constructor(userId, requestData) {
        requestData = {
            id: requestData.id,
            ...requestData.body,
        }

        const requireData = ['password', 'phone', 'name', 'nickname'];
        const errorMessage = checkMissingParams(requestData, requireData)
      
        if (errorMessage) {
            throw new BadRequest(errorMessage);
        }

        const phoneFlag = checkByPhone(requestData.phone);
        if (phoneFlag === false) {
            throw new BadRequest({phone: 'invited'});
        }

        const mbtiFlag = checkByMbti(requestData.mbti);
        if (requestData?.mbti && mbtiFlag === false) {
            throw new BadRequest({mbti: 'invited'});
        }

        if (userId != requestData.id) {
            throw new Forbidden();
        }

        this.id = requestData.id;
        this.name = requestData.name;
        this.nickname = requestData.nickname
        this.password = bcrypt.hashSync(requestData.password, 10);
        this.mbti = requestData.mbti;
        this.phone = requestData.phone;
    }
}

class DeleteUserRequestDTO {
    id 

    constructor(userId, requestData) {
        const requireData = ['id'];
        const errorMessage = checkMissingParams(requestData, requireData)

        if (errorMessage) {
            throw new BadRequest(errorMessage);
        }
      
        if (userId != requestData.id) {
            throw new Forbidden();
        }
        
        this.id = requestData.id;
    }
}


/**
 * @swagger
 * components:
 *   dtos:
 *     LoginUserResponseDTO:
 *       properties:
 *         id:
 *           type: int
 *           description: 로그인을 성공한 유저의 아이디
 *         email:
 *           type: string
 *           description: 로그인을 성공한 유저의 이메일
 *         name:
 *           type: string
 *           description: 로그인을 성공한 유저의 이름
 *         nickname:
 *           type: string
 *           description: 로그인을 성공한 유저의 닉네임
 *       example:
 *         id: 1
 *         email: abc@abc.com
 *         name: 온호성
 *         nickname: 핸섬호성
 */
class LoginUserResponseDTO {
    email;
    name;
    nickname;
    accessToken;

    constructor(data) {
        this.email = data.email;
        this.name = data.name;
        this.nickname = data.nickname;
        this.accessToken = data.accessToken;
    }
}


module.exports = {
    UserDTO,
    CreateUserRequestDTO,
    LoginUserRequestDTO, 
    UpdateUserRequestDTO,
    DeleteUserRequestDTO,
    LoginUserResponseDTO
}