const request = require('request');
const Legislator = require('../methods/legislators.js')
const Votes = require("../methods/votes.js")

const baseUrl = "https://congress.api.sunlightfoundation.com";


function separate(legislators) {
  legis = { house: [], senate: [] }
  legislators.forEach(function(legislator) {
    if (legislator.chamber === "house") {
      legis.house.push(legislator);
    }
    else if (legislator.chamber === "senate") {
      legis.senate.push(legislator);
    }
  });
  return legis;
};

const congress = {

  byZip(zip) {
    let url = `${baseUrl}/legislators/locate`
            + `?zip=${zip}`;
    return url;
  },

  byID(bioguide_id) {
    let url = `${baseUrl}/legislators/`
            + `?bioguide_id=${bioguide_id}`;
    return url;
  },

  votes(bioguide_id) {
    let url = `${baseUrl}/votes?&voter_ids.${bioguide_id}__exists=true&question=On Passage&order=voted_at&bill__exists==true&per_page=50&page=1`
            + `&fields=bill,question,voter_ids.${bioguide_id}`;
    return url;
  },

  requestLegs(url, callback) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let legislators = JSON.parse(body).results;
        legislators = legislators.map(function(legislator) {
          return new Legislator(legislator);
        });
        let Legs = separate(legislators);
        callback(Legs);
      };
    });
  },

  requestVotes(url, callback) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let all_votes = JSON.parse(body).results;
        LegVote = all_votes.map(function(vote) {
          return new Votes(vote);
        })
        callback(LegVote);
      }
    })
  }

}



module.exports = congress;
