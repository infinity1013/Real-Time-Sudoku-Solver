
$(document).ready(function(){
  let namespace = "/test";
  let video = document.querySelector("#videoElement");
  let canvas = document.querySelector("#canvasElement");
  let ctx = canvas.getContext('2d');
  var localMediaStream = null;

  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

  function sendSnapshot() {
    if (!localMediaStream) {
      return;
    }

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, 1280, 720);

    let dataURL = canvas.toDataURL('image/jpeg');

    socket.emit('input image', dataURL);

    socket.on('input image', function(msg) {
      if(msg=="True"){
        localMediaStream.getTracks()[0].stop();  //Turned off webcam
        $("#pseudo_form").submit();     //Called sudoku_board
      }
    });
  }

  socket.on('connect', function() {
    console.log('Connected!');
  });

  var constraints = {
    video: {
      width: { min: 1280 },
      height: { min: 720 }
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    localMediaStream = stream;

    setInterval(function () {
      sendSnapshot();
    }, 200);
  }).catch(function(error) {
    console.log(error);
  });
});