function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');

let counter = 0;

const handleStartSwitch = () => {
  btnStartRef.setAttribute('disabled', 'disabled');
  counter = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log('Змінюємо колір кожну секунду');
  }, 1000);
};

const handleStopSwitch = () => {
  clearInterval(counter);
  btnStartRef.removeAttribute('disabled');
  console.log('Зупиняємо зміну кольору');
};

btnStartRef.addEventListener('click', handleStartSwitch);
btnStopRef.addEventListener('click', handleStopSwitch);
