
// Scroll on Button Click
window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 2;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}


// Ham Menu
bkg = document.querySelector(".background-container");
ham = document.querySelector(".ham-container");
line = document.querySelector(".menu");
lineItems = document.querySelector(".menu-items")
center = document.querySelector(".center");
thirdSaber = document.querySelector(".third-saber");
textCircle = document.querySelector(".text-circle");

// Logo
logoCenter = document.querySelector(".logo-center");
logoRight = document.querySelector(".logo-right");
logoLeft = document.querySelector(".logo-left");
logoRightCircle = document.querySelector(".logo-right-circle");
logoLeftCircle = document.querySelector(".logo-left-circle");
logoSword = document.querySelector(".logo-sword");

logoArray = [line, lineItems, logoCenter,logoRight,logoLeft,logoSword];
logoLength = logoArray.length;
elementArray = [line,logoCenter,thirdSaber,logoRight,logoLeft,logoRightCircle,logoLeftCircle];
elementLength = elementArray.length;
menu = document.querySelector(".menu-items");

//Menu items
menuHome = document.querySelector(".menu-home");
menuInfo = document.querySelector(".menu-info");
menuGalley = document.querySelector(".menu-gallery");
menuContacts = document.querySelector(".menu-contacts");

//tabs

tabHome = document.querySelector("#tab-home");
tabInfo = document.querySelector("#tab-info");
tabGallery = document.querySelector("#tab-gallery");
tabContacts = document.querySelector("#tab-contacts");

line.addEventListener("click", function () {
	 setTimeout(lineFunction, 200);
	 menuToggle();
	 window.smoothScroll(tabHome);
})

// Menu functions
menuHome.addEventListener("click", function () {
	 setTimeout(openContentFunction, 200);
	 window.smoothScroll(tabHome);
})

menuInfo.addEventListener("click", function () {
	 setTimeout(openContentFunction, 200);
	 window.smoothScroll(tabInfo);
})

menuGalley.addEventListener("click", function () {
	 setTimeout(openContentFunction, 200);
	 window.smoothScroll(tabGallery);
})

menuContacts.addEventListener("click", function () {
	 setTimeout(openContentFunction, 200);
	 window.smoothScroll(tabContacts);
})

bkg.addEventListener("animationend", function(){
		if (bkg.classList.contains("fade-in") === true){
			bkg.classList.remove("fade-in")
			bkg.classList.add("paused");
		}
})

function lineFunction() {
	for (var i = 0; i < elementLength; i++) {
		if (elementArray[i].classList.contains("paused") === true) {
				elementArray[i].classList.replace("paused", "active");
		} else if (elementArray[i].classList.contains("active") === true) {
				elementArray[i].classList.remove("active");
				elementArray[i].classList.add("inactive");
				if (ham.classList.contains("move-up") === true) {
					ham.classList.remove("move-up");
					ham.classList.add("move-down");
					bkg.classList.remove("fade-in");
					bkg.classList.add("fade-out");
				}
		} else {
				elementArray[i].classList.remove("inactive");
				elementArray[i].classList.add("active");
		}
	}
}

function openContentFunction() {
		// hamburger
	if (ham.classList.contains("move-down") === true) {
		ham.classList.remove("move-down");
		ham.classList.add("move-up");
	} else {
		ham.classList.add("move-up");
	}
		// background
	if (bkg.classList.contains("fade-out") === true) {
		bkg.classList.remove("fade-out");
		bkg.classList.add("fade-in");
	} else {
		bkg.classList.add("fade-in");
	}

}

function menuToggle() {
	 menu.classList.toggle("active")
}

// tabs
function openSubTab(subTabName) {
  var i;
  var x = document.getElementsByClassName("sub-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(subTabName).style.display = "block";
}


//caroucel
const track = document.querySelector('.caroucel-track');
const slides = Array.from(track.children);
const rightButton = document.querySelector('.caroucel-button-right');
const leftButton = document.querySelector('.caroucel-button-left');
const navNodes = document.querySelector('.caroucel-nav');
const nodes = Array.from(navNodes.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Arange slides
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px'
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-'+targetSlide.style.left+')';
	currentSlide.classList.remove('current-slide');
	targetSlide.classList.add('current-slide');
}

const updateNodes = (currentNode, targetNode) => {
	currentNode.classList.remove('current-slide');
	targetNode.classList.add('current-slide');
}

const displayArrows = (slides, rightButton, leftButton, targetIndex) => {
		if (targetIndex === 0) {
			leftButton.classList.add('is-hidden');
			rightButton.classList.remove('is-hidden');
		} else if (targetIndex === slides.length - 1) {
			leftButton.classList.remove('is-hidden');
			rightButton.classList.add('is-hidden');
		} else {
			leftButton.classList.remove('is-hidden');
			rightButton.classList.remove('is-hidden');
		}

}

//Right button
rightButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentNode = navNodes.querySelector('.current-slide');
	const nextNode = currentNode.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide);

	moveToSlide(track, currentSlide, nextSlide);
	updateNodes(currentNode, nextNode);
	moveToSlide(track, currentSlide, nextSlide);
	displayArrows(slides, rightButton, leftButton, nextIndex);

})

//Left button
leftButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;
	const currentNode = navNodes.querySelector('.current-slide');
	const prevNode = currentNode.previousElementSibling;
	const prevIndex = slides.findIndex(slide => slide === prevSlide);

	moveToSlide(track, currentSlide, prevSlide);
	updateNodes(currentNode, prevNode);
	moveToSlide(track, currentSlide, prevSlide);
	displayArrows(slides, rightButton, leftButton, prevIndex);
})

// Nav indicator
navNodes.addEventListener('click', e => {
	const targetNode = e.target.closest('button');

	if (!targetNode) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentNode = navNodes.querySelector('.current-slide');
	const targetIndex = nodes.findIndex(node => node === targetNode);
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
	updateNodes(currentNode, targetNode);
	displayArrows(slides, rightButton, leftButton, targetIndex);
})

// Gallery
var folder = "https://www.bellinghamsaberguild.com/img/gallery";
 $.ajax({
     url: folder,
     success: function(data) {
         $(data).find("a").attr("href", function(i, val) {
             $(".gallery").append("<img src='" + folder + '/' + val + "'>");
         });
     }
 });


 $('.submit').click(function(){
   $.ajax({url: "js/text.txt", success: function(result){
     $(".test").html(result);
   }});
 });

// email
$('.submit').click(function (event) {
  const email = $('.email').val();
  const subject = $('.subject').val();
  const message = $('.message').val();
  const status = $('.status');
  status.empty();

  if (email.length > 5 && email.includes('@') && email.includes('.')) {

  } else {
    status.append('<div>Email not valid</div>');
    event.preventDefault();
  }

  if (subject.length > 2) {

  } else {
    status.append('<div>Subject not valid</div>');
    event.preventDefault();
  }

  if (message.length > 20) {

  } else {
    status.append('<div>Content not valid</div>');
    event.preventDefault();
  }

})
