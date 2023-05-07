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
 *         user_id:
 *           type: number
 *           description: 게시글의 유저 id 입니다.
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
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     comments:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: 댓글 고유 id입니다.
 *         user_id:
 *           type: number
 *           description: 댓글을 코멘트한 유저의 id입니다.
 *         article_id:
 *           type: number
 *           description: 댓글이 적혀있는 게시물의 id입니다.
 *         content:
 *           type: string
 *           description: 댓글 내용 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 댓글이 생성된 날짜 입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 댓글이 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 댓글이 삭제된 날짜 입니다.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     article_with_commets:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/articles'
 *           description: 게시물 입니다.
 *         comment:
 *           $ref: '#/components/schemas/commets'
 *           description: 댓글 입니다.
 */
