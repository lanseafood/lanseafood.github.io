$(document).ready(function () {
    const carousel = $(".carousel");
    let currdeg = 0;
    // Store current rotation globally so background manager can access it
    window.carouselRotation = currdeg;
    $(".home").on("click", { d: 0 }, rotate);
    $(".proj").on("click", { d: -90 }, rotate);
    $(".art").on("click", { d: -180 }, rotate);
    $(".cnct").on("click", { d: -270 }, rotate);
    function rotate(e) {
        currdeg = e.data.d;
        window.carouselRotation = currdeg;
        console.log(currdeg);
        carousel.css({
            "-webkit-transform": `rotateY(${currdeg}deg)`,
            "-moz-transform": `rotateY(${currdeg}deg)`,
            "-o-transform": `rotateY(${currdeg}deg)`,
            "transform": `rotateY(${currdeg}deg)`
        });
    }
});
//# sourceMappingURL=carousel.js.map