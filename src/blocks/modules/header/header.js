window.onscroll = function() {myFunction()};

// // Get the header
// let header = document.getElementsByClassName("header__bottom");
//
// // Get the offset position of the navbar
// let sticky = header.offsetTop;
//
// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//     if (window.pageYOffset >= sticky) {
//         header.classList.add("sticky");
//     } else {
//         header.classList.remove("sticky");
//     }
// }

var wrap = $(".header__bottom");
wrap.on("scroll", function(e) {
    if (this.scrollTop > 147) {
        wrap.addClass(".sticky");
    } else {
        wrap.removeClass(".sticky");
    }
})
