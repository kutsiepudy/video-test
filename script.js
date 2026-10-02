const video = document.getElementById("screen")
const playPause = document.getElementById("play-pause");
const next = document.getElementById("nextEP");
const prev = document.getElementById("prevEP");
const title = document.getElementById("epTitle");
let videoPlaying = false;
let currentIndex = 0;
const availableEpisodes = [
  {title: "Episode 01", file: "ep01.mp4"},
  {title: "Episode 02", file: "ep02.mp4"},
  {title: "Episode 03", file: "ep03.mp4"},
  {title: "Episode 04", file: "ep04.mp4"},
  {title: "Episode 05", file: "ep05.mp4"},
  {title: "Episode 06", file: "ep06.mp4"},
  {title: "Episode 07", file: "ep07.mp4"},
  {title: "Episode 08", file: "ep08.mp4"},
  {title: "Episode 09", file: "ep09.mp4"},
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

function loadVideo(index) {
  let episode = availableEpisodes[index]
  video.src = `videos/${episode.file}`
  video.load()
  title.textContent = episode.title
}

next.addEventListener("click", () => {
  currentIndex++;
  
  if (currentIndex >= availableEpisodes.length) {
    currentIndex = 0;
  }
  
  loadVideo(currentIndex);
});

prev.addEventListener("click", () => {
  currentIndex--;
  
  if (currentIndex < 0) {
    currentIndex = availableEpisodes.length - 1;
  }
  
  loadVideo(currentIndex)
});

loadVideo(0)
