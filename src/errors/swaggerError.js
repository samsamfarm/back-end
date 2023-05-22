/**
 * @swagger
 * components:
 *   schemas:
 *     BadRequest:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 클라이언트 측의 잘못된 요청 구문, 유효하지 않은 요청으로 인해 처리가 불가능한 상황을 의미합니다
 *           example: "Not Found User"
 *         code:
 *           type: integer
 *           description: Error code
 *           example: 400
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Unauthorized:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 유효한 인증 자격 증명이 없을 때 발생하는 에러, 자격 증명이 없어서 요청이 처리가 되지 않는 상황  
 *           example: "Invalid_credentials"
 *         code:
 *           type: integer
 *           description: Error code
 *           example: 401
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Forbidden:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 클라이언트의 요청이 받아들여졌지만 권한 문제로 인해서 거절됐을 때의 에러
 *         code:
 *           type: integer
 *           description: Error code
 *           example: 403
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 서버에서 요청받은 리소스를 찾을 수 없을 때 발생하는 에러
 *           example: "Not Found User"
 *         code:
 *           type: integer
 *           description: Error code
 *           example: 404
 */




