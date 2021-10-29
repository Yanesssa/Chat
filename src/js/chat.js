const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const formButton = document.querySelector('.form_button');
const dialog = document.querySelector('.dialog');
let now = new Date().toLocaleString().slice(0,-3); 

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText = input.value;
  if (!inputText || /^\ *$/.test(inputText)) {
    return
  } 
  let now = new Date().toLocaleString().slice(0,-3); 
  dialog.innerHTML += `
    <div class="dialog-message">
      <div class="dialog-message-header">
        <span class="dialog-message-header-date-time">${now}</span>
        <button class="dialog-message-header-button delete">-</button>
      </div>
      <p class="dialog-message-text">${inputText}</p>
    </div>
  `
  input.value = '';
  const buttonsDelete = document.querySelectorAll('.delete');
  buttonsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener('click', (event) => {
      event.target.parentNode.parentNode.remove();
    })
  });
});

