const video = document.getElementById("screen")
const playPause = document.getElementById("play-pause");
const next = document.getElementById("nextEP");
const prev = document.getElementById("prevEP");
let videoPlaying = false;
let currentIndex = 0;
const availableEpisodes = [
  {title: "Episode 1", file: "ep1.mp4"},
  {title: "Episode 2", file: "ep2.mp4"},
  {title: "Episode 3", file: "ep3.mp4"},
  {title: "Episode 4", file: "ep4.mp4"},
  {title: "Episode 5", file: "ep5.mp4"},
  {title: "Episode 6", file: "ep6.mp4"},
  {title: "Episode 7", file: "ep7.mp4"},
  {title: "Episode 8", file: "ep8.mp4"},
  {title: "Episode 9", file: "ep9.mp4"},
  {title: "Episode 10", file: "ep10.mp4"},
  {title: "Episode 11", file: "ep11.mp4"},
  {title: "Episode 12", file: "ep12.mp4"},
  {title: "Episode 13", file: "ep13.mp4"},
  {title: "Episode 14", file: "ep14.mp4"},
  {title: "Episode 15", file: "ep15.mp4"},
  {title: "Episode 16", file: "ep16.mp4"},
  {title: "Episode 17", file: "ep17.mp4"},
  {title: "Episode 18", file: "ep18.mp4"},
  {title: "Episode 19", file: "ep19.mp4"},
  {title: "Episode 20", file: "ep20.mp4"},
  {title: "Episode 21", file: "ep21.mp4"},
  {title: "Episode 22", file: "ep22.mp4"},
  {title: "Episode 23", file: "ep23.mp4"},
  {title: "Episode 24", file: "ep24.mp4"},
  {title: "Episode 25", file: "ep25.mp4"},
  {title: "Episode 26", file: "ep26.mp4"},
];

playPause.addEventListener("click", () => {
  videoPlaying = !videoPlaying;
  
  if (videoPlaying) {
    console.log("Video playing");
    video.play();
    playPause.textContent = "❚❚";
  } else {
    console.log("Video paused");
    video.pause();
    playPause.textContent = "▶︎";
  }
});
