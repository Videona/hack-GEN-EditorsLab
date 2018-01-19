
$(document).ready(function() {

  // Configure things...
  $('.chips-autocomplete').material_chip({
    placeholder: 'Find by #hashtag',
    secondaryPlaceholder: '#hashag',
    autocompleteOptions: {
      data: {
        '#Terreno': null,
        '#Terremoto': null,
        '#San Francisco': null,
        '#Santa Bárbara': null,
        '#Santa Mónica': null,
        '#Apple': null,
        '#Microsoft': null,
        '#Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  });

  var slider = document.getElementById('verify-slider');
  noUiSlider.create(slider, {
    start: [50, 100],
    connect: true,
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
     'min': 0,
     'max': 100
    },
    format: wNumb({
     decimals: 0
    })
  });

  slider.noUiSlider.on('end', function () {
    var values = slider.noUiSlider.get();
    filterByTrust(Number(values[0]), Number(values[1]));
  });

  // Actions
  $('#filter-toggle').on('click', function() {
    console.log('Filters!');
    $('.filters').toggle();
  });

  $('#search-send').on('click', search);


  // Functions
  function search() {

    var tuits = [
      {
        url: 'https://twitter.com/DJROMANROXFORD/status/954015867754381312',
        rating: 0.97
      },
      {
        url: 'https://twitter.com/KarlKParker/status/954016566739456000?ref_src=twsrc%5Etfw',
        rating: 0.71
      },
      {
        url: 'https://twitter.com/DJROMANROXFORD/status/954015867754381312',
        rating: -0.2
      },
      {
        url: 'https://twitter.com/KarlKParker/status/954016566739456000?ref_src=twsrc%5Etfw',
        rating: 0.68
      }
    ];

    for (var i = 0; i < tuits.length; i++) {
      var tuit = makeTuit(tuits[i]);
      writeTuit(tuit);
    }
  }

  function makeTuit(data) {
    var tuit = '<div class="row tweet-elem"><div class="tweet">';
      tuit += '<blockquote class="twitter-tweet" data-lang="en">';
      tuit += '<a href="' + data.url + '"></a>';
      tuit +='</blockquote>';
      tuit += '</div>';

      var valid;
      var icon;

      if (data.rating > 0) {
        valid = 'verified';
        icon = '<i class="material-icons">check_circle</i>';
      } else {
        valid = 'false';
        icon = '<i class="material-icons">close</i>';
      }

      tuit += '<div class="scoring ' + valid + '">';
      tuit += '<span>' + icon + '</span><br/><span class="trust">' + percent(data.rating) + '</span>%';
      tuit += '</div></div>';

      return tuit;
  }

  function writeTuit(tuit) {
    console.log('Yeeeeepa!')
    prependTuit(tuit)
  }
  function appendTuit(tuit) {
    $('.tweet-list').append(tuit);
    twttr.widgets.load(); // ToDo: Would be great pass as param the .tweet-list dom elem.
  }
  function prependTuit(tuit) {
    $('.tweet-list').prepend(tuit);
    twttr.widgets.load(); // ToDo: Would be great pass as param the .tweet-list dom elem.
  }

  function percent(num) {
    return ((Number(num) + 1) * 50).toFixed();
  }


  var written = [];

  function isWritten(data) {
    for (var i = written.length - 1; i >= 0; i--) {
      if(written[i].url.toUpperCase() === data.url.toUpperCase()) {
        return true;
      }
    }

    return false;
  }


  // Realtime DB
  var database = firebase.database();

  var hashtag = 'breakingNews';

  var tuitRef = firebase.database().ref(hashtag);
  tuitRef.on('value', function(snapshot) {
    var data = snapshot.val();
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      if (!isWritten(data[keys[i]])) {
        var tuit = makeTuit(data[keys[i]]);
        prependTuit(tuit);        
        written.push(data[keys[i]]);
      }
    }
  });


  // Filters!

  function filterByTrust(min, max) {
    $('.tweet-elem').each(function () {
      var trust = Number($(this).find('.trust').html());

      if(trust < min || trust > max ) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }

});