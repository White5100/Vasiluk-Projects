// dom-tests.js
// Самостоятельные тесты. Они запускаются только кнопкой.
// Ожидаемые значения не выводятся как готовые ответы.

function test(name, callback) {
    return { name, callback };
}

const domTests = [
    test("createCard создаёт div.card с заголовком и текстом", () => {
        const target = document.getElementById("target1");
        const before = target.children.length;

        createCard("Тест", "Содержимое");

        const card = target.lastElementChild;

        return target.children.length === before + 1 &&
            card.classList.contains("card") &&
            card.querySelector("h4").textContent === "Тест" &&
            card.querySelector("p").textContent === "Содержимое";
    }),

    test("createList создаёт ol и элементы li", () => {
        const target = document.getElementById("target1");
        const list = createList(["A", "B", "C"]);

        return list.tagName === "OL" &&
            list.children.length === 3 &&
            list.children[0].textContent === "A" &&
            list.children[2].textContent === "C";
    }),

    test("createList обрабатывает пустой массив", () => {
        const list = createList([]);
        return list.tagName === "OL" && list.children.length === 0;
    }),

    test("countChildren возвращает количество дочерних элементов", () => {
        return countChildren() ===
            document.getElementById("parent-element").children.length;
    }),

    test("findSpecialChild находит специальный элемент", () => {
        return findSpecialChild() ===
            document.querySelector("#parent-element .special").textContent;
    }),

    test("getParentBackground возвращает цвет родителя", () => {
        const expected =
            getComputedStyle(document.getElementById("parent-element")).backgroundColor;

        return getParentBackground() === expected;
    }),

    test("setupStyleToggle переключает active-style", () => {
        const target = document.getElementById("style-target");
        const button = document.getElementById("toggle-style");

        target.classList.remove("active-style");

        setupStyleToggle();
        button.click();
        const added = target.classList.contains("active-style");
        button.click();
        const removed = !target.classList.contains("active-style");

        return added && removed;
    }),

    test("changeHeaderColor устанавливает цвет header", () => {
        const header = document.getElementById("page-header");
        const old = header.style.backgroundColor;

        const newColor = changeHeaderColor();

        const validFormat = /^#[0-9a-f]{6}$/i.test(newColor);
        const changed = header.style.backgroundColor !== old;

        return validFormat && changed;
    }),

    test("animateElement добавляет класс анимации", () => {
        const target = document.getElementById("style-target");

        animateElement();

        return target.classList.contains("animated");
    }),

    test("setupClickCounter увеличивает счётчик", () => {
        const button = document.getElementById("click-btn");
        const counter = document.getElementById("click-counter");

        counter.textContent = "0";

        setupClickCounter();
        button.click();

        return counter.textContent === "1";
    }),

    test("setupInputDisplay выводит текст при input", () => {
        const input = document.getElementById("text-input");
        const display = document.getElementById("input-display");

        setupInputDisplay();

        input.value = "Проверка";
        input.dispatchEvent(new Event("input", { bubbles: true }));

        return display.textContent === "Проверка";
    }),

    test("addListItem добавляет li и очищает input", () => {
        clearList();

        const input = document.getElementById("item-input");
        input.value = "Новый пункт";

        const item = addListItem();

        return item !== null &&
            item.classList.contains("list-item") &&
            item.querySelector(".delete-item") !== null &&
            input.value === "";
    }),

    test("addListItem не добавляет пустой элемент", () => {
        clearList();

        const input = document.getElementById("item-input");
        input.value = "   ";

        return addListItem() === null &&
            document.getElementById("dynamic-list").children.length === 0;
    }),

    test("removeListItem удаляет li через кнопку", () => {
        clearList();

        const input = document.getElementById("item-input");
        input.value = "Удалить";
        const item = addListItem();
        const deleteButton = item.querySelector(".delete-item");

        removeListItem({ target: deleteButton });

        return document.getElementById("dynamic-list").children.length === 0;
    }),

    test("clearList очищает весь список", () => {
        clearList();

        const input = document.getElementById("item-input");
        input.value = "1";
        addListItem();
        input.value = "2";
        addListItem();

        clearList();

        return document.getElementById("dynamic-list").children.length === 0;
    }),

    test("setupListEvents работает с динамическим элементом", () => {
        clearList();
        setupListEvents();

        const input = document.getElementById("item-input");
        const addButton = document.getElementById("add-item-btn");

        input.value = "Динамический";
        addButton.click();

        const item = document.querySelector("#dynamic-list .list-item");
        const deleteButton = item.querySelector(".delete-item");

        deleteButton.click();

        return document.getElementById("dynamic-list").children.length === 0;
    }),

    test("validateForm принимает корректные данные", () => {
        return validateForm({
            name: "Иван",
            email: "ivan@example.com",
            age: "20"
        }) === null;
    }),

    test("validateForm отклоняет пустое имя", () => {
        const errors = validateForm({
            name: "",
            email: "ivan@example.com",
            age: "20"
        });

        return errors !== null && Boolean(errors.name);
    }),

    test("validateForm отклоняет короткое имя", () => {
        const errors = validateForm({
            name: "А",
            email: "ivan@example.com",
            age: "20"
        });

        return errors !== null && Boolean(errors.name);
    }),

    test("validateForm отклоняет неправильный email", () => {
        const errors = validateForm({
            name: "Иван",
            email: "wrong-email",
            age: "20"
        });

        return errors !== null && Boolean(errors.email);
    }),

    test("validateForm отклоняет возраст меньше 1", () => {
        const errors = validateForm({
            name: "Иван",
            email: "ivan@example.com",
            age: "0"
        });

        return errors !== null && Boolean(errors.age);
    }),

    test("validateForm отклоняет возраст больше 120", () => {
        const errors = validateForm({
            name: "Иван",
            email: "ivan@example.com",
            age: "121"
        });

        return errors !== null && Boolean(errors.age);
    }),

    test("displayFormErrors создаёт сообщения об ошибках", () => {
        displayFormErrors({
            name: "Ошибка имени",
            email: "Ошибка email"
        });

        const output = document.getElementById("form-output");

        return output.querySelectorAll(".error-message").length === 2;
    }),

    test("displayFormSuccess создаёт success-message", () => {
        displayFormSuccess({
            name: "Иван",
            email: "ivan@example.com",
            age: "20"
        });

        const output = document.getElementById("form-output");

        return output.querySelector(".success-message") !== null;
    }),

    test("handleFormSubmit предотвращает отправку и показывает успех", () => {
        const form = document.getElementById("user-form");

        form.elements.name.value = "Иван";
        form.elements.email.value = "ivan@example.com";
        form.elements.age.value = "20";

        let prevented = false;

        const event = {
            preventDefault() {
                prevented = true;
            },
            currentTarget: form
        };

        const result = handleFormSubmit(event);

        return prevented &&
            result === true &&
            document.querySelector(".success-message") !== null;
    }),

    test("handleFormSubmit показывает ошибки", () => {
        const form = document.getElementById("user-form");

        form.elements.name.value = "";
        form.elements.email.value = "bad";
        form.elements.age.value = "200";

        let prevented = false;

        const event = {
            preventDefault() {
                prevented = true;
            },
            currentTarget: form
        };

        const result = handleFormSubmit(event);

        return prevented &&
            result === false &&
            document.querySelectorAll(".error-message").length === 3;
    }),

    test("setupForm устанавливает обработчик submit", () => {
        const form = document.getElementById("user-form");

        form.elements.name.value = "Анна";
        form.elements.email.value = "anna@example.com";
        form.elements.age.value = "25";

        setupForm();

        const event = new Event("submit", {
            bubbles: true,
            cancelable: true
        });

        form.dispatchEvent(event);

        return event.defaultPrevented &&
            document.querySelector(".success-message") !== null;
    })
];

function clearTestOutput() {
    document.getElementById("test-results").replaceChildren();
    document.getElementById("test-summary").textContent =
        "Тестирование ещё не запускалось.";
}

function runDomTests() {
    const results = document.getElementById("test-results");
    const summary = document.getElementById("test-summary");

    results.replaceChildren();

    let passed = 0;

    for (const currentTest of domTests) {
        let success = false;

        try {
            success = Boolean(currentTest.callback());
        } catch (error) {
            success = false;
            console.error("Ошибка теста:", currentTest.name, error);
        }

        const result = document.createElement("div");
        result.className = success
            ? "test-result test-success"
            : "test-result test-failure";

        result.textContent =
            (success ? "✓ Тест пройден: " : "✗ Тест не пройден: ") +
            currentTest.name;

        results.appendChild(result);

        if (success) {
            passed++;
        }
    }

    summary.textContent =
        `Результат: ${passed} из ${domTests.length} тестов пройдено.`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("run-tests").addEventListener("click", runDomTests);
    document.getElementById("clear-tests").addEventListener("click", clearTestOutput);
});
