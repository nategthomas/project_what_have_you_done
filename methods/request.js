const request = require('request');
const baseUrl = "https://congress.api.sunlightfoundation.com";


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

  separate(legislators) {
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
  }


}



module.exports = congress;
