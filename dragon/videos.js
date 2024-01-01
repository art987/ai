const correctPassword = "8861"; // Set your desired password
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const galleryDiv = document.getElementById("gallery");

// Check if there is a code parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const defaultCode = urlParams.get('code');

if (defaultCode) {
  passwordInput.value = defaultCode;
  checkPassword(); // Automatically check password if code parameter is present
}

function checkPassword() {
  const enteredPassword = passwordInput.value;

  if (enteredPassword === correctPassword) {
    showGallery();
  } else {
    errorMessage.textContent = "取图码错误或过期，请到订单核对或咨询订单客服";
  }
}

function showGallery() {
  document.getElementById("password-input").style.display = "none";
  galleryDiv.style.display = "block";

  for (let i = 1; i <= 10; i++) {
    const videoUrl = `${i}.mp4`;

    const videoBox = document.createElement("div");
    videoBox.classList.add("vbox");

    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
  
    videoElement.setAttribute("autoplay", "autoplay"); // Start playing immediately
    videoElement.setAttribute("loop", "loop"); // Loop the video
    videoElement.preload = "metadata"; // Load metadata for seeking
    videoBox.appendChild(videoElement);

    const playButton = document.createElement("button");
    playButton.textContent = "暂停";
    playButton.classList.add("vplay");
    playButton.addEventListener("click", function() {
      togglePlayPause(videoElement, playButton);
    });
    videoBox.appendChild(playButton);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "保存动态壁纸";
    downloadButton.classList.add("vd");
    downloadButton.addEventListener("click", function() {
      downloadVideo(videoUrl);
    });
    videoBox.appendChild(downloadButton);

    galleryDiv.appendChild(videoBox);
  }
}

function downloadVideo(videoUrl) {
  const link = document.createElement("a");
  link.href = videoUrl;
  link.download = "video.mp4";

  // Open a new window/tab for the download
  window.open(link.href, '_blank');
}

function togglePlayPause(video, button) {
  if (video.paused) {
    video.play();
    button.textContent = "暂停";
  } else {
    video.pause();
    button.textContent = "播放";
  }
}