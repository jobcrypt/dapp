
//Header Background
var changebackground = document.getElementById('main-navbar');

window.addEventListener('scroll',() =>
{

 if(window.pageYOffset > 200)
 {
    black();
 }
 else
 {
    transparent();
 }
});
 
function black()
{
 changebackground.setAttribute('class','navbar navbar-expand-lg fixed-top active');
};

function transparent()
{


 changebackground.setAttribute('class','navbar navbar-expand-lg fixed-top');
};



 //portfolio

 var btnDayOne = document.getElementById('btnDayOne');
 var btnDayTwo = document.getElementById('btnDayTwo');
 var btnDayThree = document.getElementById('btnDayThree');
 var btnDayFour = document.getElementById('btnDayFour');
 var btnDayFive = document.getElementById('btnDayFive');
 

 function buttonOne()
 {
  btnDayOne.setAttribute('id','btnDayOne');
  btnDayOne.setAttribute('class','row  portfolio-container  port_images_active');
  btnDayTwo.setAttribute('class','row  portfolio-container port_images');
  btnDayFour.setAttribute('class','row  portfolio-container port_images');
  btnDayThree.setAttribute('class','row  portfolio-container port_images');
 }

 function buttonTwo()
 {
  btnDayOne.setAttribute('id','port_images_none');
  btnDayOne.setAttribute('class','row  portfolio-container port_images');
  btnDayTwo.setAttribute('class',' row  portfolio-container port_images_active');
  btnDayFour.setAttribute('class','row  portfolio-container port_images');
  btnDayThree.setAttribute('class','row  portfolio-container port_images');
 }


 function buttonThree()
 {
  btnDayOne.setAttribute('id','port_images_none');
  btnDayOne.setAttribute('class','row  portfolio-container  port_images');
  btnDayTwo.setAttribute('class','row  portfolio-container  port_images');
  btnDayFour.setAttribute('class','row  portfolio-container port_images');
  btnDayThree.setAttribute('class','row  portfolio-container port_images_active');
 }

 function buttonFour()
 {
  btnDayOne.setAttribute('id','port_images_none');
  btnDayOne.setAttribute('class','row  portfolio-container port_images');
  btnDayTwo.setAttribute('class','row  portfolio-container port_images');
  btnDayFour.setAttribute('class','row  portfolio-container port_images_active');
  btnDayThree.setAttribute('class','row  portfolio-container port_images');
 }

 function buttonFive()
 {
  btnDayOne.setAttribute('id','port_images_none');
  btnDayOne.setAttribute('class','row  portfolio-container port_images');
  btnDayTwo.setAttribute('class','row  portfolio-container port_images');
  btnDayFour.setAttribute('class','row  portfolio-container port_images');
  btnDayThree.setAttribute('class','row  portfolio-container port_images');
 }