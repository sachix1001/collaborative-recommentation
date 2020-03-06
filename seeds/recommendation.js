let ratings = require('../data/ratings.json')
ratings = ratings.filter(rating=> rating.rating >= 3)

exports.seed = function(knex) {
 
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
