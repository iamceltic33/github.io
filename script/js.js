$(document).ready( function(){
   let images = ["images/bg.png", "images/bg2.png", "images/bg3.png", "images/bg4.png", "images/bg5.png"];
   let loadedImages = images.map(function(val, index){
      let img = new Image();
      img.src = val;
      $(img).on('load', function(){
         images[index] = `url("${$(this).attr('src')}")`;
      })
      return img
   });
   images = images.map(function(){
      return 'none'
   })
   console.log(loadedImages);
   let slider = new Slider(images, $('.header'), $('.switchers'));
   slider.changeBG();
   slider.slideShowStart(5000);

   $('nav').hide();
   $('.menu-btn-show').on('click', function(){
      $('nav').slideDown(500)
   })
   $('.menu-btn-close').on('click', function(e){
      e.preventDefault();
      $('nav').slideUp(300)
   })
   $(window).on('mousemove', fillGradOnMove)
})
class Slider {
   constructor(images, target, switchers) {
      this.images = images;
      this.target = target;
      this.counter = 0;
      this.timerID = null;
      this.switchers = switchers;
      for (let i = 0; i < this.images.length; i++){
         let li = $('<li></li>');
         this.switchers.append(li);
      }
      this.switchers.children().first().addClass('active');
   };
   counterUp(){
      this.counter++;
      if (this.counter == this.images.length){
         this.counter = 0;
      }
   };
   changeBG(){
      let url = this.images[this.counter];
      this.target.css({
         backgroundImage: url,
         backgroundSize: 'cover'});
      this.counterUp();
      this.switchers.children('.active').removeClass('active');
      this.switchers.children().eq(this.counter).addClass('active')
   };
   slideShowStart(interval){
      this.timerID = setInterval(this.changeBG.bind(this), interval)
   }
}

function fillGradOnMove(e){
   let x = e.pageX - $('.menu').offset().left,
      y = e.pageY - $('.menu').offset().top;
      $('.menu').css('background', `radial-gradient(circle at ${100*x/$(this).width()}% ${100*y/$(this).height()}%, rgba(0,0,0,0.95) 0%, rgba(84,84,84,0.99) 100%)`)

}
