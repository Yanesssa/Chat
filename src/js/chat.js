const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const formButton = document.querySelector('.form_button');
const dialogPage = document.querySelector('.dialog_page');
let idMessage = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText = input.value;
  if (!inputText || /^\ *$/.test(inputText)) {
    return
  } 
  dialogPage.innerHTML += `
    <div class="dialog_page-message" id="${idMessage++}">
      <p class="dialog_page-message-text-p">${inputText}</p>
      <button class="dialog_page-message-button delete" id="delete-${idMessage++}">-</button>
    </div>
  `
  input.value = '';
  const buttonsDelete = document.querySelectorAll('.delete');
  buttonsDelete.forEach(function(buttonDelete){
    buttonDelete.addEventListener('click', (event) => {
      event.target.parentNode.remove();
    })
  });
});

