import $ from 'jquery';


export function initScroll(){
  $('.nav__link').on('click', function() {
  
    let href = $(this).attr('href');
    let scrollTop = $(href).offset().top; 
  
    $('html, body').animate(
      { scrollTop },
      {
        duration: 500 + scrollTop / 200,
      }
    );
  
    return false;
  });
}