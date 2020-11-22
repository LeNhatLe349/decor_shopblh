var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slider__photo");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1
  }    

  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Hien anh chi tiet san pham

function mythumb(imgs) {
  var exImg = document.getElementById("expandImg");

exImg.src = imgs.src;
exImg.parentElement.style.display = "block"
}