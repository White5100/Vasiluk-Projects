// Практическая работа №10
// JavaScript: работа с функциями

// 1. Rest parameters
// Принимает любое количество числовых аргументов и возвращает их сумму.
function sum(...numbers) {
    let result = 0;

    for (const number of numbers) {
        result += number;
    }

    return result;
}

// 2. Деструктуризация объекта
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// 3. Замыкание
function secretMessage(password, message) {
    return function (enteredPassword) {
        if (enteredPassword === password) {
            return message;
        }

        return "Доступ запрещен";
    };
}

// 4. Композиция функций
// compose(f, g, h)(x) выполняет h(x), затем g(...), затем f(...).
function compose(...functions) {
    return function (value) {
        let result = value;

        for (let i = functions.length - 1; i >= 0; i--) {
            result = functions[i](result);
        }

        return result;
    };
}

// 5. Собственная реализация map
function myMap(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }

    return result;
}

// 6. Собственная реализация filter
function myFilter(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}

// 7. Собственная реализация reduce
function myReduce(array, callback, initialValue) {
    if (array.length === 0 && arguments.length < 3) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    let startIndex = 0;
    let accumulator;

    if (arguments.length >= 3) {
        accumulator = initialValue;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// 8. Каррирование
function curry(fn) {
    function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }

        return function (...nextArgs) {
            return curried(...args, ...nextArgs);
        };
    }

    return curried;
}

// 9. Мемоизация
function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);

        return result;
    };
}

// 10. Debounce
function debounce(fn, delay) {
    let timerId = null;

    return function (...args) {
        const context = this;

        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

// 11. Throttle
function throttle(fn, interval) {
    let lastCallTime = 0;
    let timerId = null;
    let lastArgs;
    let lastContext;

    return function (...args) {
        const now = Date.now();
        const remaining = interval - (now - lastCallTime);

        lastArgs = args;
        lastContext = this;

        if (remaining <= 0) {
            if (timerId !== null) {
                clearTimeout(timerId);
                timerId = null;
            }

            lastCallTime = now;
            fn.apply(lastContext, lastArgs);
            lastArgs = null;
            lastContext = null;
        } else if (timerId === null) {
            timerId = setTimeout(() => {
                lastCallTime = Date.now();
                timerId = null;

                fn.apply(lastContext, lastArgs);
                lastArgs = null;
                lastContext = null;
            }, remaining);
        }
    };
}

// 12. Функция-валидатор
// options:
// minLength — минимальная длина строки;
// requireDigit — требуется хотя бы одна цифра;
// requireUppercase — требуется хотя бы одна заглавная буква.
function createValidator(options = {}) {
    const {
        minLength = 0,
        requireDigit = false,
        requireUppercase = false
    } = options;

    return function (value) {
        const stringValue = String(value);

        if (stringValue.length < minLength) {
            return false;
        }

        if (requireDigit && !/[0-9]/.test(stringValue)) {
            return false;
        }

        if (requireUppercase && !/[A-ZА-ЯЁ]/.test(stringValue)) {
            return false;
        }

        return true;
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        sum,
        createUser,
        secretMessage,
        compose,
        myMap,
        myFilter,
        myReduce,
        curry,
        memoize,
        debounce,
        throttle,
        createValidator
    };
}
