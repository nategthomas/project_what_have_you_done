const request = require('request');
const express = require('express');

const router = express.Router();

const congress = require("../methods/request.js");
const Legislator = require("../methods/legislators.js");
const Votes = require("../methods/votes.js");

router.get('/', function(req, res, next) {
  let zip = req.query.zip;
  let url = congress.byZip(zip);
  congress.requestLegs(url, function(Legs) {
    res.render('legislators', {Legs: Legs, zip: zip});
  });
});


router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  let url = congress.byID(id);
  let vote_url = congress.votes(id);
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let legis = JSON.parse(body).results[0];
      let legislator = new Legislator(legis);
      congress.requestVotes(vote_url, function(LegVote) {
        res.render('record', {legislator: legislator, LegVote: LegVote});
      })
    }
  })
})


module.exports = router;
