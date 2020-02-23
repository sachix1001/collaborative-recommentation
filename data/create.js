// const csvToJson = require('convert-csv-to-json')

// const InputPoster = 'credits.csv'
// let Outputposter = 'credits.json'

// csvToJson.fieldDelimiter(',').getJsonFromCsv(InputPoster);
// csvToJson.generateJsonFileFromCsv(InputPoster, Outputposter)

// const csvFilePath = "credits.csv";
// const csv = require("csvtojson");

// const converter=csv({escape:'['})

// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
// })

let ratings = require('./ratings.json')
ratings = ratings.map(rating => rating.movieId)
ratings = Array.from(new Set(ratings))
console.log(ratings.includes("79"))