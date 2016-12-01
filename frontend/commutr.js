const commutingInfo = [{
        name: 'Emily',
        workAddress: '3711 S Mopac Expy, Austin, TX',
        amTime: {hours: 7, minutes: 0},
        pmTime: {hours: 5, minutes: 30}
    },
    {
        name: 'Ethan',
        workAddress: '10000 Burnet Rd, Austin, TX',
        amTime: {hours: 8, minutes: 30},
        pmTime: {hours: 6, minutes: 0}
    }
];

function initMap() {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const home = document.getElementById('home');

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 30.27, lng: -97.74}
    });
    directionsDisplay.setMap(map);

    const onClickHandler = function() {
        const nextWorkWeek = getNextWorkWeek(new Date());
        communtingInfo.forEach(commuter => {
            nextWorkWeek.forEach(day => {
                calculateAndDisplayRoute(directionsService, directionsDisplay, commuter.workAddress, day, commuter.amTime);
                calculateAndDisplayRoute(directionsService, directionsDisplay, commuter.workAddress, day, commuter.pmTime);
            });
        });
    };
    document.getElementById('calculate').addEventListener('click', onClickHandler);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, destination, departureTime = new Date()) {

      directionsService.route({
          origin: home.value,
          destination,
          drivingOptions: {departureTime},
          travelMode: 'DRIVING'
      }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
          } else {
          window.alert('Directions request failed due to ' + status);
          }
      });
  }

  function getNextWorkWeek(today, time) {
      const result = [];
      let nxtDay = new Date(today.setDate(today.getDate() + 1));
      nxtDay.setT
      while (result.length < 5) {
          if (nxtDay.getDay() >= 1 && nxtDay.getDay() <= 5) {
            result.push(new Date(nxtDay));
          }
          nxtDay.setDate(nxtDay.getDate() + 1);
      }
      return result;
  }
