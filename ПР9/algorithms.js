// JavaScript: базовые алгоритмы
// Практическая работа №9

// Временная сложность: O(sqrt(n)) — в худшем случае
function isPrime(number) {
    if (!Number.isInteger(number) || number < 2) {
        return false;
    }

    if (number === 2) {
        return true;
    }

    if (number % 2 === 0) {
        return false;
    }

    for (let i = 3; i * i <= number; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

// Временная сложность: O(n)
function factorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Факториал определён только для целого неотрицательного числа");
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

// Временная сложность: O(n), дополнительная память: O(n)
function fibonacci(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Количество чисел Фибоначчи должно быть неотрицательным целым");
    }

    const result = [];

    if (n === 0) {
        return result;
    }

    result.push(0);

    if (n === 1) {
        return result;
    }

    result.push(1);

    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }

    return result;
}

// Временная сложность: O(log(min(a, b)))
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }

    return a;
}

// Временная сложность: O(n), где n — длина строки
function isPalindrome(str) {
    const normalized = String(str).toLowerCase().replace(/\s/g, "");

    let left = 0;
    let right = normalized.length - 1;

    while (left < right) {
        if (normalized[left] !== normalized[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// Временная сложность: O(n)
function countVowels(str) {
    const vowels = "аеёиоуыэюяaeiou";
    let count = 0;

    for (const char of String(str).toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

// Временная сложность: O(n), без использования split/reverse/join
function reverseString(str) {
    const value = String(str);
    let result = "";

    for (let i = value.length - 1; i >= 0; i--) {
        result += value[i];
    }

    return result;
}

// Временная сложность: O(n)
function findLongestWord(sentence) {
    const words = String(sentence).trim().split(/\s+/);

    if (words.length === 1 && words[0] === "") {
        return "";
    }

    let longestWord = "";

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}

// Временная сложность: O(n)
function findMax(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Массив не должен быть пустым");
    }

    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}

// Временная сложность: O(n²) в худшем случае
function removeDuplicates(arr) {
    const result = [];

    for (const item of arr) {
        let isDuplicate = false;

        for (const existing of result) {
            if (existing === item) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            result.push(item);
        }
    }

    return result;
}

// Временная сложность: O(n²) в худшем и среднем случае
// Дополнительная память: O(n), так как сортируем копию массива
function bubbleSort(arr) {
    const result = arr.slice();

    for (let i = 0; i < result.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                const temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return result;
}

// Временная сложность: O(log n)
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        if (sortedArr[middle] === target) {
            return middle;
        }

        if (sortedArr[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

// Временная сложность: O(1) для фиксированного количества операций форматирования
function formatCurrency(amount, currency = "₽") {
    if (!Number.isFinite(amount)) {
        throw new Error("Сумма должна быть числом");
    }

    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return `${formatted} ${currency}`;
}

// Временная сложность: O(n), где n — длина email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email));
}

// Временная сложность: O(n), где n — длина пароля
function generatePassword(length = 8) {
    if (!Number.isInteger(length) || length < 4) {
        throw new Error("Длина пароля должна быть целым числом не меньше 4");
    }

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}";
    const all = upper + lower + digits + special;

    const getRandomChar = (characters) => {
        return characters[Math.floor(Math.random() * characters.length)];
    };

    const password = [
        getRandomChar(upper),
        getRandomChar(lower),
        getRandomChar(digits),
        getRandomChar(special)
    ];

    while (password.length < length) {
        password.push(getRandomChar(all));
    }

    // Перемешивание без встроенной сортировки
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = password[i];
        password[i] = password[j];
        password[j] = temp;
    }

    return password.join("");
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isPrime,
        factorial,
        fibonacci,
        gcd,
        isPalindrome,
        countVowels,
        reverseString,
        findLongestWord,
        findMax,
        removeDuplicates,
        bubbleSort,
        binarySearch,
        formatCurrency,
        isValidEmail,
        generatePassword
    };
}
