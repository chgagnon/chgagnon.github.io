$(function(){

  // alert('wow');

  // $('a').each(function(i) {
  //   $(this).css('filter', 'invert(100%)');
  // })

  // sessionStorage does NOT persist while testing locally because there is no session
  // avoids overwriting the value every time this code is run (since the code run every time a page loads)
  if (!sessionStorage.getItem('firstClick')) {
    sessionStorage.setItem('firstClick', 'f');
  }
  // var firstClick = false;

  function logFirstClick() {
    // remove clickbait if clickbait was displayed before first click
    if (sessionStorage.getItem('firstClick') && sessionStorage.getItem('firstClick') === 'hookisbaited') {
      removeClickbait();
    }

    Tone.context.resume();
    sessionStorage.setItem('firstClick', 't')
  };

  window.addEventListener('click', logFirstClick);

  function blinkPiano() {
      $('.fancy_title').children().each(function(i) {$(this).addClass('pianoletter')});
      setTimeout(() => {$('.fancy_title').children().each(function(i) {$(this).removeClass('pianoletter')})}, 500);
  };

  function enticeClickToEnableAudio() {
    // alert(sessionStorage.getItem('firstClick'));
    if (sessionStorage.getItem('firstClick') && sessionStorage.getItem('firstClick') === 'f') {
      sessionStorage.setItem('firstClick', 'hookisbaited');
      // display click-enticing message
      const nameContainer = $('.nameContainer');
      // this works without indexing because only one element has class nameContainer
      // alert('hey there');
      // $clickbait = $("<h3>", {class: 'clickbait', text: 'Click anywhere to enable audio!'});

      // nameContainer.append($clickbait);
      // nameContainer.children('.fancy_title').css('margin', '5px');
      $('.clickbait').removeClass('collapsed');
    }

  };

  // remove added HTML element and reset margin on Charlie's name
  function removeClickbait() {
    // const charliename = $('.fancy_title');
    // // charliename.css('margin', '')
    const clickbait = $('.clickbait');
    // clickbait.remove();
    clickbait.addClass('collapsed');
  }

  function startOrStopHelper(note_num, song, whetherstart) {
    if (whetherstart) {
      instrument.triggerAttack(song[0][note_num-1])
    } else {
      instrument.triggerRelease(song[0][note_num-1])
    }
  }

  function startOrStopNote(letter, song, whetherstart) {
    // alert('helper 1 triggered');
    if (letter.hasClass('char1')) {
      startOrStopHelper(1, song, whetherstart);
    } else if (letter.hasClass('char2')) {
      startOrStopHelper(2, song, whetherstart);
    } else if (letter.hasClass('char3')) {
      startOrStopHelper(3, song, whetherstart);
    } else if (letter.hasClass('char4')) {
      startOrStopHelper(4, song, whetherstart);
    } else if (letter.hasClass('char5')) {
      startOrStopHelper(5, song, whetherstart);
    } else if (letter.hasClass('char6')) {
      startOrStopHelper(6, song, whetherstart);
    } else if (letter.hasClass('char7')) {
      startOrStopHelper(7, song, whetherstart);
    } else if (letter.hasClass('char8')) {
      // char 8 is the space between Charlie and Gagnon
      return;
    } else if (letter.hasClass('char9')) {
      startOrStopHelper(8, song, whetherstart);
    } else if (letter.hasClass('char10')) {
      startOrStopHelper(9, song, whetherstart);
    } else if (letter.hasClass('char11')) {
      startOrStopHelper(10, song, whetherstart);
    } else if (letter.hasClass('char12')) {
      startOrStopHelper(11, song, whetherstart);
    } else if (letter.hasClass('char13')) {
      startOrStopHelper(12, song, whetherstart);
    } else {
      startOrStopHelper(13, song, whetherstart);
    }
  }

  // delay enticing message for 5s
  setTimeout(enticeClickToEnableAudio, 5000);

  // randomly select song from songbook when page loads
  var songNum = Math.floor(Math.random() * songbook.length);

  var instrument = SampleLibrary.load({
    // selected song, and second entry (index 1) is the instrument
    instruments: songbook[songNum][1]
  });

  // wait until saxophone samples are loaded
  Tone.Buffer.on('load', function() {
    // alert('samples loaded');
    // blinkPiano();

    instrument.toMaster();

    // for all children of fancy title (my name)
    $('.fancy_title').children().each(function(i) {
      $(this).hover(function() {
        // function to perform when hovering begins
        $(this).addClass('pianoletter');
        // set index to songbook as a randomized session variable
        // alert(songbook);
        startOrStopNote($(this), songbook[songNum], true);
        // sax.triggerAttack('A3');
        },
        // function to perform when no longer hovering
        function() {
          $(this).removeClass('pianoletter');
          startOrStopNote($(this), songbook[songNum], false);
          // sax.triggerRelease('A3');
        }
      )
    })

  });

  


});