import { Picker } from "emoji-picker-element";

const picker = new Picker();

const form = document.querySelector(".form");
const input = document.querySelector(".form_input");
const formButton = document.querySelector(".form_button");
const dialog = document.querySelector(".dialog");
const progress = document.querySelector(".progress-bar");
const emoji = document.querySelector(".emoji_button");
const emojiContainer = document.querySelector(".emoji_container");

emojiContainer.appendChild(picker);
fetchMessages();

emoji.addEventListener("click", (event) => {
  event.preventDefault();
  emoji.classList.toggle("shown");
});

picker.addEventListener("emoji-click", (event) => {
  input.value += event.detail.unicode;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputText = input.value;
  if (!inputText || /^\ *$/.test(inputText)) {
    return;
  }
  formButton.classList.add("loading");
  const response = await fetch("https://f7ep8.sse.codesandbox.io/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: inputText,
    }),
  });
  input.value = "";
  fetchMessages();
  formButton.classList.remove("loading");
});

function loadingProgress() {
  let width = 0;
  let interval = setInterval(() => {
    if (width < 100) {
      width += 50;
      progress.style.width = `${width}%`;
    } else {
      clearInterval(interval);
      progress.style.width = `0%`;
    }
  }, 600);
}

function renderMessage(message) {
  dialog.innerHTML += `
    <div class="dialog-message ${
      message.isYourMessage ? "your_message" : ""
    }" id="${message.id}">
      <div class="dialog-message-header">
        <img src="${
          message.user.avatar
        }" alt="" class="dialog-message-header-avatar">
        <span class="dialog-message-header-user">${message.user.name}</span>
        <span class="dialog-message-header-date-time">${message.date}</span>
        ${
          message.isYourMessage
            ? `
            <button
              type="button"
              class="dialog-message-header-button delete btn-close"
              aria-label="Close"
              data-id="${message.id}"
            ></button>
          `
            : ""
        }
      </div>
      <p class="dialog-message-text">${message.message}</p>
    </div>
  `;
}

async function fetchMessages() {
  const response = await fetch("https://f7ep8.sse.codesandbox.io/messages", {
    headers: {
      authorization: "Bearer rtQRFtNsNe",
    },
  });
  const data = await response.json();
  dialog.innerHTML = "";
  data.forEach(renderMessage);
  deleteMessage();
}

function deleteMessage() {
  const buttonsDelete = document.querySelectorAll(".delete");
  buttonsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener("click", async (event) => {
      const id = event.target.getAttribute("data-id");
      const response = await fetch(
        "https://f7ep8.sse.codesandbox.io/messages",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      fetchMessages();
      // document.getElementById(id).remove();
      // // messages = messages.filter((message) => {
      // //   return message.id != id;
      // // });
      // const deletedIndex = messages.findIndex((message)=>{
      //   return message.id == id;
      // })
      // messages.splice(deletedIndex, 1);
      // localStorage.setItem('messages', JSON.stringify(messages));
    });
  });
}
