import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay-input');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = form.elements.state.value; // 'fulfilled' | 'rejected'
  const isSuccess = state === 'fulfilled';

  createPromise(delay, isSuccess)
    .then(message => {
      iziToast.show({
        title: 'Success',
        message,
        backgroundColor: '#59A10D',
        titleColor: '#fff',
        messageColor: '#fff',
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.show({
        title: 'Error',
        message,
        backgroundColor: '#EF4040',
        titleColor: '#fff',
        messageColor: '#fff',
        position: 'topRight',
      });
    })
    .finally(() => {
      form.reset();
    });
}

function createPromise(delay, isSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
