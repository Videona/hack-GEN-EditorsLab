
$(document).ready(function() {

  // Configure things...
  $('.chips-autocomplete').material_chip({
    placeholder: 'Find by #hashtag',
    secondaryPlaceholder: '#hashtag',
    autocompleteOptions: {
      data: {
        '#breakingNews': null,
        '#gurtel': null,
        '#macron': null,
        '#francia': null,
        '#PabloCrespo': null,
        '#hyperloop': null,
        '#mili': null
      },
      limit: Infinity,
      minLength: 1
    }
  });

  var slider = document.getElementById('verify-slider');
  noUiSlider.create(slider, {
    start: [0, 100],
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

    // Update search!

    written = [];
    clearTuits();
    hashtag = 'breakingNews';

    var tags = $('.chips-autocomplete').material_chip('data');

    if(tags.length > 0) {
      hashtag = tags[0].tag.replace('#', '');
    }
    
    console.log(hashtag);

    updateSearch();
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

  function clearTuits() {
    $('.tweet-list').html('');
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
  var ref = firebase.database().ref('topics/' + hashtag);
  var off = false;

  function updateSearch() {
    if(off) {
      ref.off();
    }

    hashtag.replace('#', '');
    
    firebase.database().ref('search').set(hashtag);

    ref = firebase.database().ref('topics/' + hashtag);
    ref.on('value', recieveData);
    off = true;

  }
  updateSearch(); // Execute first update, to start loading things


  function recieveData(snapshot) {
    var data = snapshot.val();
    var keys = (data && Object.keys(data)) || [];


    for (var i = 0; i < keys.length; i++) {
      if (!isWritten(data[keys[i]])) {
        var tuit = makeTuit(data[keys[i]]);
        prependTuit(tuit);        
        written.push(data[keys[i]]);
      }
    }
  }


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