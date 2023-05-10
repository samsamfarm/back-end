import { checkMissingParams } from "../utils/validation";

/**
 * @swagger
 * components:
 *   schemas:
 *     device_logs:
 *       type: object
 *       required:
 *         - temperature
 *         - humid
 *         - moisture
 *         - bright
 *       properties:
 *         plant_id:
 *           type: int
 *           description: 해당 측정 로그를 발생시키는 디바이스의 고유id 입니다.
 *         temperature:
 *           type: number
 *           description: 온도 측정 로그 입니다.
 *         humid:
 *           type: number
 *           description: 습도 측정 로그 입니다.
 *         moisture:
 *           type: string
 *           format: date
 *           description: 토양수분 측정 로그 입니다.
 *         bright:
 *           type: string
 *           format: date
 *           description: 조도 측정 로그 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 디바이스 로그가 측정된 시간 입니다.
 *       example:
 *         plant_id: 4
 *         temperature: 35.5
 *         humid: 59.2
 *         moisture: 78.3
 *         bright: 1200
 *         created_at:  2023-05-05 20:24:43
 */

class CreateDeviceLogDto {
    message;

    constructor(requestData) {
        const requireData = [device_id, temperature, humid, moisture, bright];
        const errorMessage = checkMissingParams(requestData, requireData)
        
        if (errorMessage) {
            throw new BadRequest(errorMessage);
        }

        this.message = {
          device_id: requestData.device_id,
          temperature: requestData.temperature,
          humid: requestData.humid,
          moisture: requestData?.moisture,
          bright: requestData?.bright,
        }
        
    }
}

module.exports = CreateDeviceLogDto