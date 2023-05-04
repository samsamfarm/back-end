/**
 * @swagger
 * components:
 *   schemas:
 *     articles:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 게시글 고유 id입니다.
 *         title:
 *           type: string
 *           description: 게시글 제목 입니다.
 *         content:
 *           type: string
 *           description: 게시글 본문 내용 입니다.
 *         view_count:
 *           type: number
 *           description: 게시글의 조회수 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 게시글이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 게시글이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 게시글이 삭제된 날짜 입니다.
 *       example:
 *         id: 4
 *         title: 게시물 제목
 *         content: 게시물 내용
 *         view_count: 203
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */
