import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.on('timeupdate', throttle(updateTime, 1000));

function updateTime(evt) {
  {
    duration: 61.857;
    percent: 0.049;
    seconds: 3.034;
  }
  localStorage.setItem(LOCALSTORAGE_KEY, evt.seconds);
}

player
  .setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY))
  .then(function (seconds) {
    seconds = localStorage.getItem(LOCALSTORAGE_KEY);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred;
        break;
    }
  });
