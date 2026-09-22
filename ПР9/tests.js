// tests.js
// Тесты выполняются только после нажатия кнопки «Запустить тестирование».

const testCases = [
    {
        name: "Проверка простого числа",
        run: () => isPrime(7),
        expected: true
    },
    {
        name: "Проверка составного числа",
        run: () => isPrime(10),
        expected: false
    },
    {
        name: "Факториал числа 5",
        run: () => factorial(5),
        expected: 120
    },
    {
        name: "Факториал числа 0",
        run: () => factorial(0),
        expected: 1
    },
    {
        name: "Первые 6 чисел Фибоначчи",
        run: () => fibonacci(6),
        expected: [0, 1, 1, 2, 3, 5]
    },
    {
        name: "НОД чисел 54 и 24",
        run: () => gcd(54, 24),
        expected: 6
    },
    {
        name: "Проверка палиндрома",
        run: () => isPalindrome("А роза упала на лапу Азора"),
        expected: true
    },
    {
        name: "Количество гласных в JavaScript",
        run: () => countVowels("JavaScript"),
        expected: 3
    },
    {
        name: "Разворот строки",
        run: () => reverseString("hello"),
        expected: "olleh"
    },
    {
        name: "Поиск самого длинного слова",
        run: () => findLongestWord("Самое длинное слово в предложении"),
        expected: "предложении"
    },
    {
        name: "Поиск максимального элемента",
        run: () => findMax([3, 7, 2, 9, 1]),
        expected: 9
    },
    {
        name: "Удаление дубликатов",
        run: () => removeDuplicates([1, 2, 2, 3, 4, 4, 5]),
        expected: [1, 2, 3, 4, 5]
    },
    {
        name: "Пузырьковая сортировка",
        run: () => bubbleSort([64, 34, 25, 12, 22, 11, 90]),
        expected: [11, 12, 22, 25, 34, 64, 90]
    },
    {
        name: "Бинарный поиск",
        run: () => binarySearch([1, 3, 5, 7, 9], 5),
        expected: 2
    },
    {
        name: "Форматирование денежной суммы",
        run: () => formatCurrency(1234.56),
        expected: "1 234.56 ₽"
    },
    {
        name: "Корректный email",
        run: () => isValidEmail("test@example.com"),
        expected: true
    },
    {
        name: "Некорректный email",
        run: () => isValidEmail("invalid.email"),
        expected: false
    }
];

function valuesAreEqual(actual, expected) {
    return JSON.stringify(actual) === JSON.stringify(expected);
}

function runAllTests() {
    const resultsBlock = document.getElementById("testResults");
    const summary = document.getElementById("summary");

    resultsBlock.replaceChildren();

    let passed = 0;

    for (const test of testCases) {
        let actual;
        let error = null;

        try {
            actual = test.run();
        } catch (exception) {
            error = exception;
        }

        const success = error === null && valuesAreEqual(actual, test.expected);

        if (success) {
            passed++;
        }

        const result = document.createElement("div");
        result.className = success
            ? "test-result success"
            : "test-result error";

        const title = document.createElement("strong");
        title.textContent = success ? "✓ " + test.name : "✗ " + test.name;

        const expected = document.createElement("div");
        expected.textContent =
            "Ожидаемый результат: " + JSON.stringify(test.expected);

        const actualResult = document.createElement("div");
        actualResult.textContent =
            error
                ? "Ошибка выполнения: " + error.message
                : "Фактический результат: " + JSON.stringify(actual);

        result.append(title, expected, actualResult);
        resultsBlock.appendChild(result);
    }

    summary.textContent =
        "Результат: " + passed + " из " + testCases.length + " тестов пройдено.";

    console.log("Тестирование завершено:", passed + "/" + testCases.length);
}

function clearTests() {
    document.getElementById("testResults").replaceChildren();
    document.getElementById("summary").textContent =
        "Тестирование ещё не запускалось.";
}

document.getElementById("runTests").addEventListener("click", runAllTests);
document.getElementById("clearTests").addEventListener("click", clearTests);
