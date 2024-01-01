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

    for (let i = 1; i <= 12; i++) {
      const imageUrl = `${String(i).padStart(2, '0')}.png`;

      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      galleryDiv.appendChild(imgElement);

      const downloadButton = document.createElement("button");
      downloadButton.textContent = "保存4K高清壁纸到相册";
      downloadButton.addEventListener("click", function() {
        downloadImage(imageUrl);
      });

      galleryDiv.appendChild(downloadButton);
    }
  }

  function downloadImage(imageUrl) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.png";

    // Open a new window/tab for the download
    window.open(link.href, '_blank');
  }