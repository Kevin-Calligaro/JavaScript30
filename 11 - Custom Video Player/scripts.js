/*  1 récupérer les éléments*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*  2 Créer des fonctions*/
function togglePlay() {/* Mettre en pause ou play */
  const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() { /* changer le button play/pause */
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() { /* Avance la vidéo */
  video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate(){ /* Avance ou recule la vidéo suivant les data du button */
  video[this.name] = this.value;

}

function handleProgress() { /* La barre de lecture avance en même temps que l'avancement de la vidéo */
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) { /* Avance la vidéo avec la barre de lecture */
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
/*  3 Relier les fonction au eventListener */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); /* lors du déplacement de la souris, ssi mousedown = true on exe scrub */
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

