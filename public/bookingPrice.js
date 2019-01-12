function bookingPrice(events, bars){

  var time;
  var persons;
  var idBar;
  var idEvent;

  var pricePerHour;
  var pricePerPerson;

  var bookingPrice = 0;

  for(var i = 0; i < events.length; i++){
     time = events[i].time;
     persons = events[i].persons;
     idBar = events[i].barId;
     idEvent = events[i].id;

    for(var j=0; j < bars.length; j++){
      if(bars[j].id == idBar){
         pricePerHour = bars[j].pricePerHour;
         pricePerPerson = bars[j].pricePerPerson;
      }
    }
    var bookingPrice = time * pricePerHour + persons * pricePerPerson;

    for(var k=0; k < events.length; k++){
      if(events[k].id == idEvent){
        events[k].price = bookingPrice;
      }
    }
  }

  return bookingPrice;
}
