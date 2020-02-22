// let keywords = require('../data/keywords.json')
// keywords = keywords.map(keyword => {
//   return {
//     movie_id: keyword.id,
//     keywords: keyword.keywords
//   }
// })
// // Filter if keywords are empty
// .filter(keyword=>keyword.keywords.length > 4)
let ratings = require('../data/ratings.json')
ratings = ratings.filter(rating=> rating.rating >= 3)
// ratings = ratings.map(rating=>{
//   return {
//     userId: Number(rating.userID),
//     movieId: Number(rating.movieId),
//     rating: Number(rating.rating),
//     timestamp: Number(rating.timestamp)
//   }
// })
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('keywords').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('keywords').insert(keywords);
  //   });
  
  return knex('ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert(ratings.slice(0,16383));
    })
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert(ratings.slice(16383));
    })
};
