
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

  // Actions
  $('#filter-toggle').on('click', function() {
    console.log('Filters!');
    $('.filters').toggle();
  });

  $('#search-send').on('click', search);

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
      var tuit = '<div class="row"><div class="tweet">';
      tuit += '<blockquote class="twitter-tweet" data-lang="en">';
      tuit += '!<a href="' + tuits[i].url + '"></a>';
      tuit +='</blockquote>';
      tuit += '</div>';

      var valid;
      var icon;

      if (tuits[i].rating > 0) {
        valid = 'verified';
        icon = '<i class="material-icons">check_circle</i>';
      } else {
        valid = 'false';
        icon = '<i class="material-icons">close</i>';
      }

      tuit += '<div class="scoring ' + valid + '">';
      tuit += '<span>' + icon + '</span><br/><span>' + percent(tuits[i].rating) + '%</span>';
      tuit += '</div></div>';

      $('.tweet-list').append(tuit);
    }

    $('.tweet-list').show();

    twttr.widgets.load();
  }

  function percent(num) {
    if(num > 0) {
      return num*100;
    } else {
      return -num*100;
    }
  }

});