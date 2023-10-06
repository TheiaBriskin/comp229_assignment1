let currentImageIndex = 0;
let imagesList = [];
let timeoutId;

function loadImages(file, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      imagesList = data.images;
      callback();
    }
  };
  xhr.open("GET", file, true);
  xhr.send();

  $("#update").hide(1500);
  $("#update").fadeIn(1500);
}

function displayImage() {
  $("#slides")
    .html(`<img src="${imagesList[currentImageIndex].file}" alt="Photo" style="display:none;">`)
    .find("img")
    .fadeIn(1500);
  $("#caption")
    //.hide()
    .text(`Image ${currentImageIndex + 1} of ${imagesList.length}`)
   // .fadeIn(1500);
}

function nextImage() {
  timeoutId = setTimeout(function () {
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    displayImage();
    nextImage();
  }, 5000);
}

function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + imagesList.length) % imagesList.length;
  displayImage();
}

function updateImages() {
  loadImages("images2.txt", function () {
    currentImageIndex = 0;
    displayImage();
  });
}


document.addEventListener("DOMContentLoaded", function () {
  loadImages("images1.txt", function () {
    displayImage();
    nextImage();
  });

  document.querySelector("#leftbutton").addEventListener("click", previousImage);
  document.querySelector("#rightbutton").addEventListener("click", function () {
    clearTimeout(timeoutId);
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    displayImage();
    nextImage();
  });
  document.querySelector("#update").addEventListener("click", updateImages);
});