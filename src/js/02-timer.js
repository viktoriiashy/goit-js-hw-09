import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/airbnb.css');

const btnRef = document.querySelector('button[data-start]');
const timeRef = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let counter = 0;
let userDate = 0;

btnRef.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (userDate < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnRef.removeAttribute('disabled');
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(timeRef, options);

const handleBtnStart = () => {
  counter = setInterval(() => {
    const targetDate = userDate - new Date();
    btnRef.setAttribute('disabled', 'disabled');
    addLeadingZero(convertMs(targetDate));
  }, 1000);
};
btnRef.addEventListener('click', handleBtnStart);

function addLeadingZero(time) {
  dataDays.textContent = time.days;
  dataHours.textContent = time.hours;
  dataMinutes.textContent = time.minutes;
  dataSeconds.textContent = time.seconds;
  return String().padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
