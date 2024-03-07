// Constants and variables used
const paletteItens = document.querySelectorAll('.color');
const randomColorButton = document.getElementById('button-random-color');
const clearButton = document.getElementById('clear-board');
const inputBoard = document.getElementById('board-size');
const vqvButton = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');
const blackSelected = document.getElementById('black');
let selectedColor = ' rgb(0,0,0)';

// getRandomColor function
// Objective: Generate random colors for the color palette
function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
getRandomColor();

// createAndSaveRandomPalette function
// Objective: Create and save random color palette in localStorage
const createAndSaveRandomPalette = () => {
  const colorList = [blackSelected.style.backgroundColor];
  for (let index = 1; index < paletteItens.length; index += 1) {
    colorList.push(paletteItens[index].style.backgroundColor = getRandomColor());
  } localStorage.setItem('colorPalette', JSON.stringify(colorList));
};

// randomColorButton element
// Objective: Change the colors in the palette randomly
randomColorButton.addEventListener('click', createAndSaveRandomPalette);

// rescuePreviousColorPalette function
// Objective: Retrieve palette colors saved in localStorage
function rescuePreviousColorPalette() {
  const recovereColorPalette = JSON.parse(localStorage.getItem('colorPalette'));

  if (recovereColorPalette != null && recovereColorPalette !== '[]') {
    for (let index = 1; index < recovereColorPalette.length; index += 1) {
      paletteItens[index].style.backgroundColor = recovereColorPalette[index];
    }
  } else {
    createAndSaveRandomPalette();
  }
}

// generateBoard function
// Objective: Generate dynamic pixel frame
function generateBoard(size) {
  if (size) {
    const newSize = size;
    for (let index = 0; index < newSize; index += 1) {
      const divLine = document.createElement('div');
      divLine.className = 'pixel-line';
      pixelBoard.appendChild(divLine);
      for (let i = 0; i < newSize; i += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        divLine.appendChild(pixel);
      }
    }
  }
}
generateBoard(5); // Initial pixel frame 5 x 5

// deleteBoard function
// Objective: Remove initial 5 x 5 pixel frame
function deleteBoard() {
  for (let index = pixelBoard.childNodes.length - 1; index >= 0; index -= 1) {
    pixelBoard.removeChild(pixelBoard.childNodes[index]);
  }
}

// Anonymous function
// Goals:
// 1 - Change class between clicked paletteItems
// 2 - Transfer backgroundcolor to the clicked pixel according to the clicked paletteItem

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('color')) {
    if (event.button === 0) {
      document.querySelector('.selected').classList.remove('selected');
      event.target.classList.add('selected');
      selectedColor = event.target.style.backgroundColor;
    }
  }
  if (event.target.classList.contains('pixel')) {
    if (event.button === !0) {
      event.target.style.backgroundColor = 'white';
    } else {
      event.target.style.backgroundColor = selectedColor;
      saveColorSequence();
    }
  }
});

// saveColorSequence function
// Objective: Save sequence of colors used to color the pixel frame
function saveColorSequence() {
  const pixel = document.querySelectorAll('.pixel');
  const colorsUsed = [];
  for (let index = 0; index < pixel.length; index += 1) {
    const pixelColor = pixel[index].style.backgroundColor;
    colorsUsed.push(pixelColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colorsUsed));
}

// clear function
// Objective: Transfer backgroundcolor white to all pixels
function clear() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}

// clearButton element
// Objective: "Clear" all pixels
clearButton.addEventListener('click', clear);

// generateCustomBoard function
// Objective: Generate dynamic table customized by the user
function generateCustomBoard(size) {
  if (size) {
    let newSize = size;
    deleteBoard();

    if (size < 0) {
      alert('Não são permitidos valores menores que zero, digite novamente.');
    } if (size < 5) {
      newSize = 5;
      localStorage.setItem('boardSize', JSON.stringify(5));
    } if (size > 50) {
      newSize = 50;
      localStorage.setItem('boardSize', JSON.stringify(50));
    } generateBoard(newSize);
      localStorage.setItem('boardSize', JSON.stringify(newSize));
  } else {
    alert('Board inválido!');
  }
}

// reorganizeBoard function
// Objective: Rearrange pixel frame according to the size requested by the user
function reorganizeBoard() {
  generateCustomBoard(inputBoard.value);
}

// vqvButton element
// Objective: Generate a frame according to the size requested by the user
vqvButton.addEventListener('click', reorganizeBoard);

// rescuePreviousPaintedBoard function
// Objective: Rescue painted pixels saved in localStorage (color sequence)
function rescuePreviousPaintedBoard() {
  const pixel = document.querySelectorAll('.pixel');

  if (localStorage.getItem('pixelBoard')) {
    const recoverePaintedBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = recoverePaintedBoard[index];
    }
  }
}

function rescuePreviousSize() {
  let recovereSize = JSON.parse(localStorage.getItem('boardSize'));
  generateCustomBoard(recovereSize)
}

//Window.onload
// Objective: Trigger rescue of saved information when reloading page
window.onload = () => {
  rescuePreviousColorPalette();
  rescuePreviousSize();
  rescuePreviousPaintedBoard();
};
