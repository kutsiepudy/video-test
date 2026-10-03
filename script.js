const video = document.getElementById("screen");
const playPause = document.getElementById("play-pause");
const next = document.getElementById("nextEP");
const prev = document.getElementById("prevEP");
const title = document.getElementById("epTitle");
const fullscreenButton = document.getElementById("fullscreen");

const timestampInput = document.getElementById("timestamp");
const jumpButton = document.getElementById("jump");
const timeDisplay = document.getElementById("timeDisplay");

const availableEpisodes = [
    { title: "Episode 1", file: "ep01.mp4" },
    { title: "Episode 2", file: "ep02.mp4" },
    { title: "Episode 3", file: "ep03.mp4" },
    { title: "Episode 4", file: "ep04.mp4" },
    { title: "Episode 5", file: "ep05.mp4" },
    { title: "Episode 6", file: "ep06.mp4" },
    { title: "Episode 7", file: "ep07.mp4" },
    { title: "Episode 8", file: "ep08.mp4" },
    { title: "Episode 9", file: "ep09.mp4" },
    { title: "Episode 10", file: "ep10.mp4" },
    { title: "Episode 11", file: "ep11.mp4" },
    { title: "Episode 12", file: "ep12.mp4" },
    { title: "Episode 13", file: "ep13.mp4" },
    { title: "Episode 14", file: "ep14.mp4" },
    { title: "Episode 15", file: "ep15.mp4" },
    { title: "Episode 16", file: "ep16.mp4" },
    { title: "Episode 17", file: "ep17.mp4" },
    { title: "Episode 18", file: "ep18.mp4" },
    { title: "Episode 19", file: "ep19.mp4" },
    { title: "Episode 20", file: "ep20.mp4" },
    { title: "Episode 21", file: "ep21.mp4" },
    { title: "Episode 22", file: "ep22.mp4" },
    { title: "Episode 23", file: "ep23.mp4" },
    { title: "Episode 24", file: "ep24.mp4" },
    { title: "Episode 25", file: "ep25.mp4" },
    { title: "Episode 26", file: "ep26.mp4" }
];

let currentEpisode = 0;

function loadVideo(index) {
    if (index < 0 || index >= availableEpisodes.length) {
        return;
    }

    currentEpisode = index;

    const episode = availableEpisodes[currentEpisode];

    video.src = `videos/${episode.file}`;
    video.load();

    title.textContent = episode.title;
    timeDisplay.textContent = "00:00 / 00:00";
    timestampInput.value = "";
    playPause.textContent = "▶︎";
}

playPause.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPause.textContent = "⏸";
    } else {
        video.pause();
        playPause.textContent = "▶︎";
    }
});

video.addEventListener("play", () => {
    playPause.textContent = "⏸";
});

video.addEventListener("pause", () => {
    playPause.textContent = "▶︎";
});

next.addEventListener("click", () => {
    if (currentEpisode < availableEpisodes.length - 1) {
        loadVideo(currentEpisode + 1);
    }
});

prev.addEventListener("click", () => {
    if (currentEpisode > 0) {
        loadVideo(currentEpisode - 1);
    }
});

video.addEventListener("ended", () => {
    if (currentEpisode < availableEpisodes.length - 1) {
        loadVideo(currentEpisode + 1);
        video.play();
    }
});

fullscreenButton.addEventListener("click", () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

video.addEventListener("timeupdate", () => {
    timeDisplay.textContent =
        `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
});

video.addEventListener("loadedmetadata", () => {
    timeDisplay.textContent =
        `00:00 / ${formatTime(video.duration)}`;
});

function jumpToTimestamp() {
    const input = timestampInput.value.trim();

    if (!input) {
        return;
    }

    const parts = input.split(":").map(Number);

    let seconds;

    if (parts.length === 2) {
        const minutes = parts[0];
        const secs = parts[1];

        if (!Number.isFinite(minutes) || !Number.isFinite(secs)) {
            return;
        }

        seconds = minutes * 60 + secs;
    } else if (parts.length === 3) {
        const hours = parts[0];
        const minutes = parts[1];
        const secs = parts[2];

        if (
            !Number.isFinite(hours) ||
            !Number.isFinite(minutes) ||
            !Number.isFinite(secs)
        ) {
            return;
        }

        seconds = hours * 3600 + minutes * 60 + secs;
    } else {
        return;
    }

    if (
        seconds < 0 ||
        seconds > video.duration ||
        !Number.isFinite(video.duration)
    ) {
        return;
    }

    video.currentTime = seconds;
    timestampInput.value = "";
}

jumpButton.addEventListener("click", jumpToTimestamp);

timestampInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        jumpToTimestamp();
    }
});

loadVideo(0);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered successfully!', reg))
      .catch(err => console.log('Service Worker registration failed: ', err));
  });
}
