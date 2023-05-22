/**
 * @swagger
 * components:
 *   schemas:
 *     plants:
 *       type: object
 *       required:
 *         - current_grade
 *         - plant_type
 *       properties:
 *         id:
 *           type: number
 *           description: 작물 고유 id입니다.
 *         device_id:
 *           type: string
 *           description: 작물에 배정된 디바이스 고유_id 입니다.
 *         user_id:
 *           type: number
 *           description: 작물에 배정된 유저 고유_id 입니다.
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: string
 *           description: 작물의 종류 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 작물이 생성된 날짜 입니다.
 *         plant_grade_update_time:
 *           type: string
 *           format: date
 *           description: 작물 성장단계가 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 작물이 삭제된 날짜 입니다.
 */

class CreateDeviceDTO {
  user_id;
  constructor(info) {
  const {user_id} = info;
  this.user_id = user_id;
  } 
}

class DeviceDTO {
  id;
  user_id;
  created_at;
  updated_at;
  deleted_at;

  constructor(info) {
    this.id = info.id;
    this.user_id = info.user_id;
    this.created_at = info.created_at;
    this.updated_at = info.updated_at;
    this.deleted_at = info.deleted_at;
  }
}

module.exports = {
  CreateDeviceDTO,
  DeviceDTO,
};