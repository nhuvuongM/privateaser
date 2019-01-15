'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


function updateEventsInfo(){
  for(var i=0; i < events.length; i++){
    var idBar = events[i].barId;
    var nbPers = events[i].persons;
    var time = events[i].time;
    var deduc = events[i].options.deductibleReduction;

    events[i].price = computeBookingPrice(nbPers, time, idBar);

    var commission = events[i].price - events[i].price * 0.3;

    events[i].commission.insurance =  commission / 2;
    events[i].commission.treasury = nbPers;
    events[i].commission.privateaser = events[i].commission.insurance - nbPers;

    if(deduc){
      events[i].price = events[i].price + nbPers;
      events[i].commission.privateaser += nbPers;
    }
  }
}

function computeBookingPrice(nbPers, time, idBar){
  var bookingPrice = 0;
  var pourcentage = 0;

  if(nbPers >60){
    pourcentage = 0.5;
  }
  else if (nbPers > 20) {
    pourcentage = 0.3;
  }
  else if (nbPers > 10) {
    pourcentage = 0.1;
  }

  for(var i = 0; i <bars.length; i++){
    if(bars[i].id == idBar){
      bookingPrice = time * bars[i].pricePerHour + nbPers * bars[i].pricePerPerson - (nbPers * bars[i].pricePerPerson) * pourcentage;
    }
  }

  return bookingPrice;
}

function payActors(){
  for(var i=0; i < actors.length; i++){
    var eventId = actors[i].eventId;

    for(var j=0; j<events.length; j++){
      if(eventId == events[j].id){

        actors[i].payment[0].amount = events[j].price;
        actors[i].payment[1].amount = events[j].price - events[j].price * 0.3;
        actors[i].payment[2].amount = events[j].commission.insurance;
        actors[i].payment[3].amount = events[j].commission.treasury;
        actors[i].payment[4].amount = events[j].commission.privateaser;
      }
    }
  }
}


console.log(bars);
console.log(events);
console.log(actors);

updateEventsInfo();
payActors();
