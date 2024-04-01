/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function ($) {
  "use strict"; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $("a.page-scroll").bind("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 50,
        },
        1250,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $("body").scrollspy({
    target: ".navbar-fixed-top",
    offset: 51,
  });

  // Closes the Responsive Menu on Menu Item Click
  $(".navbar-collapse ul li a").click(function () {
    $(".navbar-toggle:visible").click();
  });

  // Fit Text Plugin for Main Header
  $("h1").fitText(1.2, {
    minFontSize: "35px",
    maxFontSize: "65px",
  });

  // Offset for Main Navigation
  $("#mainNav").affix({
    offset: {
      top: 100,
    },
  });

  // Initialize WOW.js Scrolling Animations
  new WOW().init();
})(jQuery); // End of use strict

filterSelection("all"); // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    // Remove "active" class from all buttons
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove("active");
    }
    // Add "active" class to the clicked button
    this.classList.add("active");
  });
}

function setEqualHeights() {
  var contents = document.querySelectorAll(".content");
  var maxHeight = 0;
  contents.forEach(function (content) {
    maxHeight = Math.max(maxHeight, content.offsetHeight);
  });
  contents.forEach(function (content) {
    content.style.height = maxHeight + "px";
  });
}

// animations

var animation2 = bodymovin.loadAnimation({
  container: document.getElementById("animation2"),
  path: "media/animation/Projectspr.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation2",
});

var animationnlp = bodymovin.loadAnimation({
  container: document.getElementById("animationnlp"),
  path: "media/animation/nlp.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation2",
});

var animationglobe = bodymovin.loadAnimation({
  container: document.getElementById("animationglobe"),
  path: "media/animation/globe.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation2",
});

var animationcustomer = bodymovin.loadAnimation({
  container: document.getElementById("animationcustomer"),
  path: "media/animation/customer.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation2",
});

var animationbook = bodymovin.loadAnimation({
  container: document.getElementById("animationbook"),
  path: "media/animation/book.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation2",
});

var animation3 = bodymovin.loadAnimation({
  container: document.getElementById("animation3"),
  path: "media/animation/CV.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation3",
});

var animationCMI = bodymovin.loadAnimation({
  container: document.getElementById("animationCMI"),
  path: "media/animation/CMI.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "animationCMI",
});

var animationDA = bodymovin.loadAnimation({
  container: document.getElementById("animationDA"),
  path: "media/animation/DA2.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "animationDA",
});

var animationRL = bodymovin.loadAnimation({
  container: document.getElementById("animationRL"),
  path: "media/animation/RL.json",
  render: "canvas",
  loop: true,
  autoplay: true,
  name: "animationRL",
});

var animationdata = bodymovin.loadAnimation({
  container: document.getElementById("animationdata"),
  path: "media/animation/Data Analysis.json",
  render: "canvas",
  loop: true,
  autoplay: true,
});

var animationshop = bodymovin.loadAnimation({
  container: document.getElementById("animationshop"),
  path: "media/animation/shop.json",
  render: "canvas",
  loop: true,
  autoplay: true,
});

var animationcmi2 = bodymovin.loadAnimation({
  container: document.getElementById("animationcmi2"),
  path: "media/animation/cmi2.json",
  render: "canvas",
  loop: true,
  autoplay: true,
});

var animationcustomerseg = bodymovin.loadAnimation({
  container: document.getElementById("animationcustomerseg"),
  path: "media/animation/customerseg.json",
  render: "canvas",
  loop: true,
  autoplay: true,
});

customerseg;

var animation = bodymovin.loadAnimation({
  container: document.getElementById("animation"),
  path: "media/animation/5.json",
  render: "svg",
  loop: true,
  autoplay: true,
  name: "demo animation",
});
