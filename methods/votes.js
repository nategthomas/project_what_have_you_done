
class Votes {
  constructor(vote) {
    this.bill_id = vote.bill.bill_id;
    this.voter_ids = vote.voter_ids[Object.keys(vote.voter_ids)];
    this.official_title = vote.bill.official_title;
    this.govtrack = vote.bill.urls.govtrack
  }

}

module.exports = Votes;
