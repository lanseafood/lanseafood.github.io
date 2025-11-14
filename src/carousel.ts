// jQuery is loaded globally via CDN
declare const $: any;

$(document).ready(function(): void {
  const carousel = $(".carousel");
  let currdeg: number = 0;

  $(".home").on("click", { d: 0 }, rotate);
  $(".proj").on("click", { d: -90 }, rotate);
  $(".art").on("click", { d: -180 }, rotate);
  $(".cnct").on("click", { d: -270 }, rotate);

  function rotate(e: any): void {
    currdeg = e.data.d;
    console.log(currdeg);
    carousel.css({
      "-webkit-transform": `rotateY(${currdeg}deg)`,
      "-moz-transform": `rotateY(${currdeg}deg)`,
      "-o-transform": `rotateY(${currdeg}deg)`,
      "transform": `rotateY(${currdeg}deg)`
    });
  }
});

