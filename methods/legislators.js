

class Legislator {
  constructor(leg) {
    this.bioguide_id = leg.bioguide_id;
    this.phone = leg.phone;
    this.website = leg.website;
    this.party = leg.party;
    this.chamber = leg.chamber;
    this.first_name = leg.first_name;
    this.last_name = leg.last_name;
    this.middle_name = leg.middle_name;
  };

  get fullName() {
    return this.first_name + " " + this.last_name;
  };

  get partyName() {
    if (this.party === 'R') {
      return "Republican";
    }
    else if (this.party === 'D') {
      return "Democrat";
    }
  };

  get partyadj() {
    if (this.party === 'R') {
      return "Republican";
    }
    else if (this.party === "D") {
      return "Democratic";
    }
  }

}


module.exports = Legislator;
