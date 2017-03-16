const request = require('request');

const baseUrl = "https://congress.api.sunlightfoundation.com";


const bioguide_id = 'B001305';



var votes = function(x) {
  let url = `${baseUrl}/votes?&voter_ids.${x}__exists=true&question=On Passage&order=voted_at&bill__exists==true&per_page=50&page=1`
          + `&fields=bill,question,voter_ids.${x}, urls`;
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let votes = JSON.parse(body).results;
      console.log(votes);
    }
  })
};

votes(bioguide_id);
