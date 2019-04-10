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
   images = images.map(function(val, index){
      if (index == 0) return `url(${val})`;
      return 'none'
   })
   let slider = new Slider(images, $('.header'), $('.switchers'), 5000);
   slider.changeBG();
   slider.slideShowStart();

   $('nav').hide();
   $('.menu-btn-show').on('click', function(){
      $('nav').slideDown(500)
      $('.middle-header').fadeOut(500)
   })
   $('.menu-btn-close').on('click', function(e){
      e.preventDefault();
      $('nav').slideUp(300)
      $('.middle-header').fadeIn(300)
   })
   $(window).on('mousemove', fillGradOnMove);
   $(window).on('scroll', function(){
      let scroll = $(window).scrollTop();
      $('.middle-header').css('top', (0 - scroll*0.5)+'px');
      $('.about blockquote').css('top', (0 - scroll*0.1)+'px');

      if (scroll > $('header').height() || $(window).height()> $('header').height() ){
         $('.message-icon').fadeIn(200)
      } else {
         $('.message-icon').fadeOut(200)
      }
   })
   $('.about').on('mousemove', function(e){
      if ((e.offsetX + e.offsetY)%10 == 0 && e.target == $('.about').get(0)){
         let transition = Math.floor(Math.random()*8000+500),
         size = Math.floor(Math.random()*100)+'px';
         let d = $('<div></div>').css({
            width: size,
            height: size,
            position: 'absolute',
            transition: 'top ' + transition+'ms',
            top: e.offsetY + 'px',
            left: e.offsetX + 'px',
            border: '1px solid rgba(171,171,171,0.5)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: ' radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(171,171,171,0.5) 100%)'
         }).appendTo(this)
         setTimeout(function(){
            d.css('top', 0)
          }, 100)
         setTimeout(function(){
            d.remove()
          }, transition)
      }
   })
   $('.message-icon').on('click', function(){
      $(this).css('right', '-20rem');
      $('.message-input').addClass('active');
   })
   $('#message-close').on('click', function(e){
      e.preventDefault()
      $('.message-input').removeClass('active');
      $('.message-icon').css('right', '5%');
   })
   $('.message-input button').on('click', function(){
      $.get('https://api.telegram.org/bot891789180:AAF0jhI2GX5QsEAt8pi54zMTiUs0zc9zfSo/sendMessage', {
         chat_id: '240125885',
         text: $('#message').val()
         }, function(data, status){
            if (data.ok){
               $('#message-close').trigger('click')
            }
         }
      )
   })
})
class Slider {
   constructor(images, target, switchers, interval = 5000) {
      this.images = images;
      this.target = target;
      this.counter = 0;
      this.timerID = null;
      this.switchers = switchers;
      this.interval = interval;
      for (let i = 0; i < this.images.length; i++){
         let li = $('<li></li>');
         li.on('click', ()=>{
            
            this.changeSlide(i);
         })
         this.switchers.append(li);
      }
      this.switchers.children().first().addClass('active');
   };
   counterUp(){
      this.counter++;
      if (this.counter >= this.images.length){
         this.counter = 0;
      }
   };
   changeBG(){
      let url = this.images[this.counter];
      this.target.css({
         backgroundImage: url,
         backgroundSize: 'cover'});
      this.switchers.children('.active').removeClass('active');
      this.switchers.children().eq(this.counter).addClass('active')
      this.counterUp();
   };
   slideShowStart(interval){
      if (interval) {
         this.interval = interval;
      }
      this.timerID = setInterval(this.changeBG.bind(this), this.interval)
   }
   slideShowStop(){
      clearInterval(this.timerID);
   }
   changeSlide(index){
      console.log(index);
      this.counter = index;
      this.changeBG();
      this.slideShowStop();
      this.slideShowStart();
   }
}

function fillGradOnMove(e){
   let x = e.pageX - $('.menu').offset().left,
      y = e.pageY - $('.menu').offset().top;
      $('.menu').css('background', `radial-gradient(circle at ${100*x/$('.menu').width()}% ${100*y/$('.menu').height()}%, rgba(84,84,84,0.99) 0%, rgba(0,0,0,0.95) 100%)`)

}
