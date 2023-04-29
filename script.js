function testandoPintarCor(){
  const colorido4 = document.querySelector('#corUm');
  const colorido1 = document.querySelector('#corDois');
     const colorido2 = document.querySelector('#corTres');
     const colorido3 = document.querySelector('#corQuatro');
     colorido1.style.backgroundColor = 'red';
     colorido2.style.backgroundColor = 'blue';
     colorido3.style.backgroundColor = 'green';
     colorido4.style.backgroundColor = 'black';
 } 
 window.addEventListener('load', testandoPintarCor);


const buttonRandomColor = document.querySelector('#button-random-color');

buttonRandomColor.addEventListener('click', function() {
  const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16);
  const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16);
  const randomColor3 = '#' + Math.floor(Math.random()*16777215).toString(16);

  const colorPalette = [randomColor1, randomColor2, randomColor3];
localStorage.setItem('colorPalette', colorPalette);

  const cor1 = document.querySelector('#corDois');
  const cor2 = document.querySelector('#corTres');
  const cor3 = document.querySelector('#corQuatro');

  cor1.style.backgroundColor = randomColor1;
  cor2.style.backgroundColor = randomColor2;
  cor3.style.backgroundColor = randomColor3;
});


function updateColorPalette() {
  const colorPalette = localStorage.getItem('colorPalette');
  if (colorPalette) {
    const colors = colorPalette.split(',');
    const cor1 = document.querySelector('#corDois');
    const cor2 = document.querySelector('#corTres');
    const cor3 = document.querySelector('#corQuatro');
    cor1.style.backgroundColor = colors[0];
    cor2.style.backgroundColor = colors[1];
    cor3.style.backgroundColor = colors[2];
  }
}
window.addEventListener('load', updateColorPalette);

document.querySelector('#corUm').classList.add('selected');

//requisito 9
const paletaCores = document.querySelectorAll('.color');
paletaCores.forEach((cor) => {
  cor.addEventListener('click', () => {
    paletaCores.forEach((c) => {
      c.classList.remove('selected');
    });
    cor.classList.add('selected');
  });
});
//  Requisito 10
// function setPixelColour(pixel) {
//   pixel.style.backgroundColor = 'black';
// }
function setPixelColour(pixel) {
  pixel.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
}

