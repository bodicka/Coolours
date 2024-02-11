const col = document.querySelectorAll('.col');

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    setRendomCallors();
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyClickBoard(event.target.textContent)
  }
})

function getGenerateinRandomCollor () {
  // RGB
  // #FF0000 - red;
  // #00FF00 - gren;
  // #0000FF - blue;
  const hexCodse = '0123456789ABCDEF';
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodse[Math.floor(Math.random() * hexCodse.length)];
  }
  return '#' + color;
}

function copyClickBoard (text) {
  navigator.clipboard.writeText(text);

}

function setRendomCallors (isInitions) {
  const colors = isInitions ? getColorsToHash() : [];

  col.forEach((col, index) => {
    const isLock = col.querySelector('i').classList.contains('fa-lock');
    const textCol = col.querySelector('h2');
    const button = col.querySelector('button');
    
    if (isLock) {
      colors.push(textCol.textContent)
      return
    }
    
    const color = isInitions 
    ? colors[index]
      ? colors[index]
      : chroma.random()
    : chroma.random();

    if (!isInitions) {
      colors.push(color)
    }
    
    textCol.textContent = color;
    col.style.background = color;

    setTextColor(textCol, color);
    setTextColor(button, color);
  })

  uppdeyteLocationHash(colors);
}

function setTextColor (textCol, color) {
  const luminance = chroma(color).luminance();
  textCol.style.color = luminance > 0.5 ? 'black' : 'white';
}

function uppdeyteLocationHash (colors = []) {
  document.location.hash = colors.map((col) => {
    return col.toString().substring(1)
  }).join('-')
}

function getColorsToHash () {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(color => '#' + color)
  }
  return []
}

setRendomCallors(true);
