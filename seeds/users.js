/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('users').insert([
  //   {email: "asd1", name: "1asd", nickname: "a1sd", password: "asd", mbti: "asd", phone: "asd"},
  //   {email: "asd2", name: "2asd", nickname: "a2sd", password: "asd", mbti: "asd", phone: "asd"},
  //   {email: "asd3", name: "3asd", nickname: "a3sd", password: "asd", mbti: "asd", phone: "asd"},
  //   {email: "asd4", name: "4asd", nickname: "a4sd", password: "asd", mbti: "asd", phone: "asd"}
  // ]);
  await knex('devices').insert([
    {user_id: "5"},
  ]);
};
