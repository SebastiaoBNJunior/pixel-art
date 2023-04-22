const buttonRandomColor = document.querySelector('#button-random-color');

// function generateColor() {//Função para gerar os números aleatórios das cores
//     const letters = '0123456789ABCDEF';
//     let color = '#';   
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }    
//     return color;   
//   }
// console.log(generateColor()) // Exibe o resultado das cores aleatórias

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
    // código para selecionar a cor clicada
    paletaCores.forEach((c) => {
      c.classList.remove('selected');
    });
    cor.classList.add('selected');
  });
});
