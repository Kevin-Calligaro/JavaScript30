const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);

//  DEPRECIATION :
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO !!!`, err);
    });
}

function paintToCanavas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
setInterval(() => {
  ctx.drawImage(video, 0, 0, width, height);
}, 16);
}

function takePhoto() {
  snap.currentTime = 0 ;
  snap.play();

  //récupère les datas
  const data = canvas.toDataUrl('image/jpeg');
}

getVideo();

video.addEventListener('canplay', paintToCanavas)


