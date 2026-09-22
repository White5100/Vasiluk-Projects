// tests.js
// Тесты запускаются только после нажатия кнопки.
// Значения ожидаемых результатов не выводятся пользователю,
// чтобы тестирование было именно проверкой, а не списком готовых ответов.

const tests = [
    {
        name: "sum: несколько аргументов",
        test: () => sum(1, 2, 3, 4) === 10
    },
    {
        name: "sum: без аргументов",
        test: () => sum() === 0
    },
    {
        name: "sum: отрицательные числа",
        test: () => sum(-5, 10, -2) === 3
    },

    {
        name: "createUser: все поля",
        test: () =>
            createUser({
                name: "Иван",
                age: 20,
                email: "ivan@example.com"
            }) === "Пользователь: Иван, возраст: 20, email: ivan@example.com"
    },
    {
        name: "createUser: email по умолчанию",
        test: () =>
            createUser({
                name: "Анна",
                age: 19
            }) === "Пользователь: Анна, возраст: 19, email: не указан"
    },

    {
        name: "secretMessage: правильный пароль",
        test: () => {
            const getMessage = secretMessage("1234", "Секрет");
            return getMessage("1234") === "Секрет";
        }
    },
    {
        name: "secretMessage: неправильный пароль",
        test: () => {
            const getMessage = secretMessage("1234", "Секрет");
            return getMessage("0000") === "Доступ запрещен";
        }
    },

    {
        name: "compose: последовательное применение",
        test: () => {
            const double = x => x * 2;
            const addThree = x => x + 3;
            const composed = compose(double, addThree);
            return composed(5) === 16;
        }
    },
    {
        name: "compose: без функций",
        test: () => compose()(7) === 7
    },

    {
        name: "myMap: преобразование элементов",
        test: () =>
            JSON.stringify(myMap([1, 2, 3], x => x * 2)) ===
            JSON.stringify([2, 4, 6])
    },
    {
        name: "myMap: передача индекса",
        test: () =>
            JSON.stringify(myMap(["a", "b"], (value, index) => value + index)) ===
            JSON.stringify(["a0", "b1"])
    },
    {
        name: "myMap: пустой массив",
        test: () => JSON.stringify(myMap([], x => x * 2)) === JSON.stringify([])
    },

    {
        name: "myFilter: фильтрация",
        test: () =>
            JSON.stringify(myFilter([1, 2, 3, 4], x => x % 2 === 0)) ===
            JSON.stringify([2, 4])
    },
    {
        name: "myFilter: нет подходящих элементов",
        test: () =>
            JSON.stringify(myFilter([1, 3, 5], x => x % 2 === 0)) ===
            JSON.stringify([])
    },

    {
        name: "myReduce: сумма с initialValue",
        test: () => myReduce([1, 2, 3], (a, b) => a + b, 10) === 16
    },
    {
        name: "myReduce: сумма без initialValue",
        test: () => myReduce([1, 2, 3], (a, b) => a + b) === 6
    },
    {
        name: "myReduce: пустой массив с initialValue",
        test: () => myReduce([], (a, b) => a + b, 10) === 10
    },

    {
        name: "curry: два аргумента",
        test: () => {
            const add = (a, b) => a + b;
            return curry(add)(2)(3) === 5;
        }
    },
    {
        name: "curry: аргументы можно передать вместе",
        test: () => {
            const multiply = (a, b, c) => a * b * c;
            return curry(multiply)(2, 3, 4) === 24;
        }
    },

    {
        name: "memoize: возвращает результат",
        test: () => {
            const square = memoize(x => x * x);
            return square(5) === 25;
        }
    },
    {
        name: "memoize: использует кэш",
        test: () => {
            let calls = 0;
            const calculate = memoize(x => {
                calls++;
                return x * 2;
            });

            calculate(10);
            calculate(10);

            return calls === 1;
        }
    },

    {
        name: "createValidator: все условия выполнены",
        test: () => {
            const validate = createValidator({
                minLength: 8,
                requireDigit: true,
                requireUppercase: true
            });

            return validate("Password1") === true;
        }
    },
    {
        name: "createValidator: слишком короткая строка",
        test: () => {
            const validate = createValidator({
                minLength: 8,
                requireDigit: true,
                requireUppercase: true
            });

            return validate("Pass1") === false;
        }
    },
    {
        name: "createValidator: нет цифры",
        test: () => {
            const validate = createValidator({
                minLength: 8,
                requireDigit: true,
                requireUppercase: true
            });

            return validate("Password") === false;
        }
    },
    {
        name: "createValidator: нет заглавной буквы",
        test: () => {
            const validate = createValidator({
                minLength: 8,
                requireDigit: true,
                requireUppercase: true
            });

            return validate("password1") === false;
        }
    }
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAllTests() {
    const button = document.getElementById("runTests");
    const clearButton = document.getElementById("clearTests");
    const results = document.getElementById("testResults");
    const summary = document.getElementById("summary");

    button.disabled = true;
    clearButton.disabled = true;
    results.replaceChildren();
    summary.textContent = "Тестирование выполняется...";

    // Создаём независимый набор тестов для каждого запуска.
    const currentTests = tests.slice();

    let passed = 0;

    for (const test of currentTests) {
        let success = false;

        try {
            success = Boolean(test.test());
        } catch (error) {
            success = false;
        }

        const item = document.createElement("div");
        item.className = success
            ? "test-result success"
            : "test-result error";

        item.textContent =
            (success ? "✓ Тест пройден: " : "✗ Тест не пройден: ") + test.name;

        results.appendChild(item);

        if (success) {
            passed++;
        }
    }

    // Асинхронные debounce/throttle тесты выполняются отдельно.
    let debounceCalls = 0;
    const debounced = debounce(() => {
        debounceCalls++;
    }, 40);

    debounced();
    debounced();
    debounced();

    await sleep(70);

    const debounceSuccess = debounceCalls === 1;
    addAsyncResult(
        "debounce: серия вызовов выполняется один раз",
        debounceSuccess
    );
    if (debounceSuccess) {
        passed++;
    }

    let throttleCalls = 0;
    const throttled = throttle(() => {
        throttleCalls++;
    }, 40);

    throttled();
    throttled();
    throttled();

    await sleep(70);

    const throttleSuccess = throttleCalls >= 1 && throttleCalls <= 2;
    addAsyncResult(
        "throttle: частота вызовов ограничивается",
        throttleSuccess
    );
    if (throttleSuccess) {
        passed++;
    }

    const total = currentTests.length + 2;

    summary.textContent =
        `Результат: ${passed} из ${total} тестов пройдено.`;

    button.disabled = false;
    clearButton.disabled = false;
}

function addAsyncResult(name, success) {
    const results = document.getElementById("testResults");

    const item = document.createElement("div");
    item.className = success
        ? "test-result success"
        : "test-result error";

    item.textContent =
        (success ? "✓ Тест пройден: " : "✗ Тест не пройден: ") + name;

    results.appendChild(item);
}

function clearTests() {
    document.getElementById("testResults").replaceChildren();
    document.getElementById("summary").textContent =
        "Тестирование ещё не запускалось.";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("runTests").addEventListener("click", runAllTests);
    document.getElementById("clearTests").addEventListener("click", clearTests);
});
