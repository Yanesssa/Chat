const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const formButton = document.querySelector('.form_button');
const dialog = document.querySelector('.dialog');
const progress = document.querySelector('.progress-bar');

const messages = JSON.parse(localStorage.getItem('messages')) ?? [];

messages.forEach(rendorMessage);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText = input.value;
  if (!inputText || /^\ *$/.test(inputText)) {
    return
  } 
  loadingProgress();
  setTimeout(() => {
    let now = new Date().toLocaleString().slice(0,-3); 
    const message = {
      // id: messages.length,
      id: new Date().getTime(),
      message: inputText,
      date: now,
    }
    rendorMessage(message);
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    input.value = '';
  },1500);
});

function loadingProgress(){
  let width = 0;
  let interval = setInterval(() => {
    if (width < 100){
      width += 50;
      progress.style.width = `${width}%`;  
    } else {
      clearInterval(interval);
      progress.style.width = `0%`;
    }
  }, 600);
}

function rendorMessage(message){
  dialog.innerHTML += `
    <div class="dialog-message" id="${message.id}">
      <div class="dialog-message-header">
        <span class="dialog-message-header-date-time">${message.date}</span>
        <button class="dialog-message-header-button delete" data-id="${message.id}">-</button>
      </div>
      <p class="dialog-message-text">${message.message}</p>
    </div>
  `;
  const buttonsDelete = document.querySelectorAll('.delete');
  buttonsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      document.getElementById(id).remove();
      // messages = messages.filter((message) => {
      //   return message.id != id;
      // });
      const deletedIndex = messages.findIndex((message)=>{
        return message.id == id;
      })
      messages.splice(deletedIndex, 1);
      localStorage.setItem('messages', JSON.stringify(messages));
    });
  });
}