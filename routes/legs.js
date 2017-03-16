const request = require('request');
const express = require('express');
const router = express.Router();

const congress = require("./methods/request.js");
const Legislator = require("./methods/legislators.js");
const Votes = require(".methods/votes.js");


router.get('/', function(req, res, next) {
  let zip = req.query.zip;
  let url = congress.byZip(zip);
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let legislators = JSON.parse(body).results;
      legislators = legislators.map(function(legislator) {
        return new Legislator(legislator);
      })
      let Legislators = congress.separate(legislators);
      response.render('legislators', {Legislators: Legislators, zip: zip});
    }
  })
})


router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  let url = congress.byID(id);
  request(url, function(error, res, body) {
    if (!error && response.statusCode === 200) {
      let legis = JSON.parse(body).results;
      let legislator = new Legislator(legis);
    }
  })
  let vote_url = congress.votes(id);
  request(vote_url, function(error, res, body) {
    if (!error && response.statusCode === 200) {
      let all_votes = JSON.parse(body).results;
      all_votes = all_votes.map(function(vote) {
        return new Votes(vote);
      })
      res.render('Record', {legislator: legislator, all_votes = all_votes});
    }
  })
})


module.exports = router;
