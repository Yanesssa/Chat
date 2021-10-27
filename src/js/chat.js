const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const formButton = document.querySelector('.form_button');
const dialogPage = document.querySelector('.dialog_page');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText = input.value;
  if (!inputText || /^\ *$/.test(inputText)) {
    return
  } 
  dialogPage.innerHTML += `
    <div class="dialog_page-message">
      <p class="dialog_page-message-text">${inputText}</p>
    </div>
  `
  input.value = '';
});

