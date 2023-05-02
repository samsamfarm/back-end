// POST: article
// DELETE: article
// FETCH: article
// GET: article

// 댓글 추가하기
// 댓글 삭제하기
// 댓글 수정하기

const connection = require("../app.js");
const router = express.Router();

router.post("/", (rep, res) => {
  const { title, content } = req.body;
  connection.query(
    "INSERT INTO Posts (title,content)VALUES (??)",
    [title, content],
    (error, result) => {
      if (error) {
        console.error("insert error", error);
        res.status(500).send("error");
      } else {
        res.status(200).send("create article success");
      }
    }
  );
});

router.get("/", (req, res) => {
  connection.query("");
});

exports.router = articleRouter;
