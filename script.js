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
    { title: "Episode 1", file: "Samurai Champloo - 01 L@mBerT.mp4" },
    { title: "Episode 2", file: "Samurai Champloo - 02 L@mBerT.mp4" },
    { title: "Episode 3", file: "Samurai Champloo - 03 L@mBerT.mp4" },
    { title: "Episode 4", file: "Samurai Champloo - 04 L@mBerT.mp4" },
    { title: "Episode 5", file: "Samurai Champloo - 05 L@mBerT.mp4" },
    { title: "Episode 6", file: "Samurai Champloo - 06 L@mBerT.mp4" },
    { title: "Episode 7", file: "Samurai Champloo - 07 L@mBerT.mp4" },
    { title: "Episode 8", file: "Samurai Champloo - 08 L@mBerT.mp4" },
    { title: "Episode 9", file: "Samurai Champloo - 09 L@mBerT.mp4" },
    { title: "Episode 10", file: "Samurai Champloo - 10 L@mBerT.mp4" },
    { title: "Episode 11", file: "Samurai Champloo - 11 L@mBerT.mp4" },
    { title: "Episode 12", file: "Samurai Champloo - 12 L@mBerT.mp4" },
    { title: "Episode 13", file: "Samurai Champloo - 13 L@mBerT.mp4" },
    { title: "Episode 14", file: "Samurai Champloo - 14 L@mBerT.mp4" },
    { title: "Episode 15", file: "Samurai Champloo - 15 L@mBerT.mp4" },
    { title: "Episode 16", file: "Samurai Champloo - 16 L@mBerT.mp4" },
    { title: "Episode 17", file: "Samurai Champloo - 17 L@mBerT.mp4" },
    { title: "Episode 18", file: "Samurai Champloo - 18 L@mBerT.mp4" },
    { title: "Episode 19", file: "Samurai Champloo - 19 L@mBerT.mp4" },
    { title: "Episode 20", file: "Samurai Champloo - 20 L@mBerT.mp4" },
    { title: "Episode 21", file: "Samurai Champloo - 21 L@mBerT.mp4" },
    { title: "Episode 22", file: "Samurai Champloo - 22 L@mBerT.mp4" },
    { title: "Episode 23", file: "Samurai Champloo - 23 L@mBerT.mp4" },
    { title: "Episode 24", file: "Samurai Champloo - 24 L@mBerT.mp4" },
    { title: "Episode 25", file: "Samurai Champloo - 25 L@mBerT.mp4" },
    { title: "Episode 26", file: "Samurai Champloo - 26 L@mBerT.mp4" }
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
