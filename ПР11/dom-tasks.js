// Практическая работа №11
// Реализация функций для работы с DOM.

// ЗАДАНИЕ 1. Создание и вставка элементов

function createCard(title, content) {
    const target = document.getElementById("target1");

    if (!target) {
        return null;
    }

    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h4");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = content;

    card.append(heading, paragraph);
    target.appendChild(card);

    return card;
}

function createList(items) {
    const target = document.getElementById("target1");

    if (!target) {
        return null;
    }

    const list = document.createElement("ol");

    for (const item of items) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
    }

    target.appendChild(list);

    return list;
}

// ЗАДАНИЕ 2. Навигация по DOM

function countChildren() {
    const parent = document.getElementById("parent-element");
    return parent ? parent.children.length : 0;
}

function findSpecialChild() {
    const parent = document.getElementById("parent-element");

    if (!parent) {
        return "";
    }

    const special = parent.querySelector(".special");
    return special ? special.textContent : "";
}

function getParentBackground() {
    const child = document.querySelector("#parent-element .child");

    if (!child) {
        return "";
    }

    return getComputedStyle(child.parentElement).backgroundColor;
}

// ЗАДАНИЕ 3. Работа с классами и стилями

function setupStyleToggle() {
    const button = document.getElementById("toggle-style");
    const target = document.getElementById("style-target");

    if (!button || !target) {
        return;
    }

    button.addEventListener("click", () => {
        target.classList.toggle("active-style");
    });
}

function changeHeaderColor() {
    const header = document.getElementById("page-header");

    if (!header) {
        return "";
    }

    const randomColor = "#" +
        Math.floor(Math.random() * 16777216)
            .toString(16)
            .padStart(6, "0");

    header.style.backgroundColor = randomColor;
    return randomColor;
}

function animateElement() {
    const target = document.getElementById("style-target");

    if (!target) {
        return;
    }

    target.classList.remove("animated");

    // Форсируем новый цикл анимации.
    void target.offsetWidth;

    target.classList.add("animated");

    setTimeout(() => {
        target.classList.remove("animated");
    }, 450);
}

// ЗАДАНИЕ 4. Обработка событий

function setupClickCounter() {
    const button = document.getElementById("click-btn");
    const counter = document.getElementById("click-counter");

    if (!button || !counter) {
        return;
    }

    let count = Number(counter.textContent) || 0;

    button.addEventListener("click", () => {
        count++;
        counter.textContent = String(count);
    });
}

function setupInputDisplay() {
    const input = document.getElementById("text-input");
    const display = document.getElementById("input-display");

    if (!input || !display) {
        return;
    }

    input.addEventListener("input", () => {
        display.textContent = input.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener("keydown", event => {
        console.log("keydown:", event.code, event.key);
    });

    document.addEventListener("keyup", event => {
        console.log("keyup:", event.code, event.key);
    });
}

// ЗАДАНИЕ 5. Динамические списки

function addListItem() {
    const input = document.getElementById("item-input");
    const list = document.getElementById("dynamic-list");

    if (!input || !list) {
        return null;
    }

    const value = input.value.trim();

    if (!value) {
        return null;
    }

    const item = document.createElement("li");
    item.className = "list-item";
    item.textContent = value;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-item";
    deleteButton.textContent = "Удалить";

    item.appendChild(deleteButton);
    list.appendChild(item);

    input.value = "";

    return item;
}

function removeListItem(event) {
    if (!event || !event.target) {
        return;
    }

    if (!event.target.classList.contains("delete-item")) {
        return;
    }

    const item = event.target.closest(".list-item");

    if (item) {
        item.remove();
    }
}

function clearList() {
    const list = document.getElementById("dynamic-list");

    if (list) {
        list.replaceChildren();
    }
}

function setupListEvents() {
    const addButton = document.getElementById("add-item-btn");
    const clearButton = document.getElementById("clear-list-btn");
    const list = document.getElementById("dynamic-list");

    if (!addButton || !clearButton || !list) {
        return;
    }

    addButton.addEventListener("click", addListItem);
    clearButton.addEventListener("click", clearList);
    list.addEventListener("click", removeListItem);
}

// ЗАДАНИЕ 6. Работа с формами

function validateForm(formData) {
    const errors = {};

    const name = String(formData.name || "").trim();
    const email = String(formData.email || "").trim();
    const age = Number(formData.age);

    if (!name) {
        errors.name = "Имя не должно быть пустым.";
    } else if (name.length < 2) {
        errors.name = "Имя должно содержать минимум 2 символа.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        errors.email = "Введите корректный email.";
    }

    if (!Number.isFinite(age) || !Number.isInteger(age) || age < 1 || age > 120) {
        errors.age = "Возраст должен быть целым числом от 1 до 120.";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

function displayFormErrors(errors) {
    const output = document.getElementById("form-output");

    if (!output) {
        return;
    }

    output.replaceChildren();

    for (const message of Object.values(errors || {})) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = message;
        output.appendChild(errorElement);
    }
}

function displayFormSuccess(userData) {
    const output = document.getElementById("form-output");

    if (!output) {
        return;
    }

    output.replaceChildren();

    const message = document.createElement("div");
    message.className = "success-message";

    const title = document.createElement("strong");
    title.textContent = "Данные успешно прошли проверку.";

    const data = document.createElement("p");
    data.textContent =
        `Имя: ${userData.name}; Email: ${userData.email}; Возраст: ${userData.age}`;

    message.append(title, data);
    output.appendChild(message);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget || document.getElementById("user-form");

    if (!form) {
        return false;
    }

    const formData = Object.fromEntries(new FormData(form).entries());
    const errors = validateForm(formData);

    if (errors) {
        displayFormErrors(errors);
        return false;
    }

    displayFormSuccess(formData);
    return true;
}

function setupForm() {
    const form = document.getElementById("user-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", handleFormSubmit);
}

// Первоначальная настройка интерфейса.
document.addEventListener("DOMContentLoaded", () => {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();

    const cardButton = document.getElementById("create-card-btn");
    const listButton = document.getElementById("create-list-btn");
    const headerButton = document.getElementById("change-header-color");
    const animateButton = document.getElementById("animate-element");

    cardButton.addEventListener("click", () => {
        createCard("Новая карточка", "Карточка создана через DOM.");
    });

    listButton.addEventListener("click", () => {
        createList(["Первый пункт", "Второй пункт", "Третий пункт"]);
    });

    headerButton.addEventListener("click", changeHeaderColor);
    animateButton.addEventListener("click", animateElement);

    document.getElementById("dom-info").textContent =
        `Дочерних элементов: ${countChildren()}. ` +
        `Специальный элемент: ${findSpecialChild()}. ` +
        `Фон родителя: ${getParentBackground()}.`;
});
