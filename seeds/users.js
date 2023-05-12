/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    await knex("users").insert([
      {
        email: "elice@elice.io",
        name: "elice",
        nickname: "엘리스",
        password:
          "$2a$10$j0tScKX94a7YDiNNbKVRluWOlsRnIW2TehsvcJLu.tnF3a1zsb7Re", // password
        mbti: "ENTJ",
        phone: "010-9999-9999",
      },
    ]);
    await knex("devices").insert([{ user_id: "1" }]);
};
