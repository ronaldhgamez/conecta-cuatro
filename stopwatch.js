let timerId;
let seconds = 0;
let minutes = 0;
let pause = false;
var formattedTime = "";

self.onmessage = function (event) {

  if (event.data === 'start' && timerId == null) {

    timerId = setInterval(() => {
      if (!pause) {
        seconds += 1;
        formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (seconds == 59) {
          minutes += 1;
          seconds = -1;
        }

        self.postMessage(formattedTime);
      }
    }, 1000);

    console.log(timerId)
  }
  else if (event.data === 'pause') {
    pause = (pause == true && timerId != null) ? false : true;
  }
  else if (event.data === 'stop') {
    pause = true;
    minutes = 0;
    seconds = 0;
    self.postMessage('00:00');
  }
};
