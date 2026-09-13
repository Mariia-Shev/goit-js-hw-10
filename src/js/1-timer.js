import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
input.disabled = false;

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;
let convertedTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const timeNow = Date.now(); // fresh "now" at the moment the picker closes

    if (userSelectedDate.getTime() > timeNow) {
      startBtn.disabled = false;
      input.disabled = false;

      const convertTime = userSelectedDate.getTime() - timeNow;
      convertedTime = convertMs(convertTime);
      timerDays.textContent = addLeadingZero(convertedTime.days);
      timerHours.textContent = addLeadingZero(convertedTime.hours);
      timerMinutes.textContent = addLeadingZero(convertedTime.minutes);
      timerSeconds.textContent = addLeadingZero(convertedTime.seconds);
    } else {
      iziToast.show({
        title: 'Notice:',
        message: 'Please choose a date in the future!',
      });
      startBtn.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', countDown);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countDown() {
  startBtn.disabled = true;
  input.disabled = true;
  const intervalId = setInterval(() => {
    const now = Date.now();
    const distance = userSelectedDate.getTime() - now;
    convertedTime = convertMs(distance);
    timerDays.textContent = addLeadingZero(convertedTime.days);
    timerHours.textContent = addLeadingZero(convertedTime.hours);
    timerMinutes.textContent = addLeadingZero(convertedTime.minutes);
    timerSeconds.textContent = addLeadingZero(convertedTime.seconds);
    if (distance < 0) {
      clearInterval(intervalId);
      input.disabled = false;

      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  }, 1000);
}
