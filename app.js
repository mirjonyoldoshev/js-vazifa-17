// Bo'sh array bilan boshlanadi
let menuItems = [];

// HTML elementlarni tanlash
const menuItemsContainer = document.getElementById("menu-items");
const addForm = document.getElementById("add-form");
const clearButton = document.getElementById("clear-button");
const removeForm = document.getElementById("remove-form");
const messagesContainer = document.getElementById("messages");

// Menyu elementini qo'shish funktsiyasi
function addMenuItem(name, description) {
  // Element ID'sini generatsiya qilish
  const id = Date.now();

  // Menyu elementini yaratish
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");
  menuItem.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="action-buttons">
            <button type="button" onclick="removeMenuItem(${id})">O'chirish</button>
        </div>
    `;

  // Menyu elementini sahifaga qo'shish
  menuItemsContainer.appendChild(menuItem);

  // Menyu elementini array ga qo'shish
  menuItems.push({ id, name, description });

  // LocalStorage ga elementlarni saqlash
  saveMenuItemsToLocalStorage();

  // Xabar joylashtirish
  showMessage("success", "Element muvaffaqiyatli qo'shildi.");
}

// Menyu elementini o'chirish funktsiyasi
function removeMenuItem(id) {
 
  const menuItem = document.querySelector(`.menu-item[data-id="${id}"]`);
  if (menuItem) {
    menuItemsContainer.removeChild(menuItem);
  }

  // Menyu elementini array dan olib tashlash
  menuItems = menuItems.filter((item) => item.id !== id);

  // LocalStorage dan elementni olib tashlash
  saveMenuItemsToLocalStorage();

  // Xabar joylashtirish
  showMessage("success", "Element muvaffaqiyatli o'chirildi.");
}

// LocalStorage dan menyu elementlarini o'qish
function loadMenuItemsFromLocalStorage() {
  const storedMenuItems = localStorage.getItem("menuItems");
  if (storedMenuItems) {
    menuItems = JSON.parse(storedMenuItems);

    // Menyu elementlarini sahifaga chiqarish
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");
      menuItem.setAttribute("data-id", item.id);
      menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="action-buttons">
                    <button type="button" onclick="removeMenuItem(${item.id})">O'chirish</button>
                </div>
            `;
      menuItemsContainer.appendChild(menuItem);
    });
  }
}

// Menyu elementlarini LocalStorage ga saqlash
function saveMenuItemsToLocalStorage() {
  localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// Xabar joylashtirish
function showMessage(type, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(`${type}-message`);
  messageElement.innerText = message;
  messagesContainer.appendChild(messageElement);

  // Xabarni 5 sekunddan so'ng o'chirish
  setTimeout(() => {
    messagesContainer.removeChild(messageElement);
  }, 5000);
}

// Menyu elementlarini LocalStorage dan yuklash
loadMenuItemsFromLocalStorage();

// Formalar bilan tashqaridagi harakatlar
addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  addMenuItem(nameInput.value, descriptionInput.value);
  nameInput.value = "";
  descriptionInput.value = "";
});

clearButton.addEventListener("click", function () {
  menuItemsContainer.innerHTML = "";
  menuItems = [];
  localStorage.removeItem("menuItems");
  showMessage("success", "Menyu elementlari tozalandi.");
});

removeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const removeIdInput = document.getElementById("remove-id");
  const id = parseInt(removeIdInput.value);
  removeIdInput.value = "";
  removeMenuItem(id);
});
