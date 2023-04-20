
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



 //Events toggler

 var btnDayOne = document.getElementById('btnDayOne');
 var btnDayTwo = document.getElementById('btnDayTwo');
 var btnDayThree = document.getElementById('btnDayThree');
 var btnDayFour = document.getElementById('btnDayFour');
 var btnDayFive = document.getElementById('btnDayFive');
 

 function buttonOne()
 {
  btnDayOne.setAttribute('class','mx-1 text-center btnActive');
  btnDayTwo.setAttribute('class','mx-1 text-center btnNotActive');
  btnDayFour.setAttribute('class','mx-1 text-center btnNotActive');
  btnDayThree.setAttribute('class','mx-1 text-center btnNotActive');
  btnDayFive.setAttribute('class','mx-1 text-center btnNotActive');
 }

 function buttonTwo()
 {
   btnDayOne.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayTwo.setAttribute('class','mx-1 text-center btnActive');
   btnDayFour.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayThree.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFive.setAttribute('class','mx-1 text-center btnNotActive');
 }


 function buttonThree()
 {
   btnDayOne.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayTwo.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFour.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayThree.setAttribute('class','mx-1 text-center btnActive');
   btnDayFive.setAttribute('class','mx-1 text-center btnNotActive');
 }

 function buttonFour()
 {
   btnDayOne.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayTwo.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFour.setAttribute('class','mx-1 text-center btnActive');
   btnDayThree.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFive.setAttribute('class','mx-1 text-center btnNotActive');
 }

 function buttonFive()
 {
   btnDayOne.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayTwo.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFour.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayThree.setAttribute('class','mx-1 text-center btnNotActive');
   btnDayFive.setAttribute('class','mx-1 text-center btnActive');
 }