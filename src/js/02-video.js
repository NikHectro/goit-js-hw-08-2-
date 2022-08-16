import Player from "@vimeo/player";
import throttle from "lodash.throttle";


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let pauseTime = Number(localStorage.getItem("videoplayer-current-time"));
// if (!pauseTime) {
//     pauseTime = 0;
// }


player.on('timeupdate', throttle(onSavePausedTime, 2000));

player.setCurrentTime(pauseTime);

function onSavePausedTime ({ seconds } = 0) {
    localStorage.setItem("videoplayer-current-time", seconds);
    // console.log(seconds);
}