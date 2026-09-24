(function () {

    function test(condition, message) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            return true;
        }

        console.error(`❌ FAIL: ${message}`);
        return false;
    }


    // ПРОВЕРКА ФУНКЦИЙ

    function testFunctionsExist() {

        const functions = [
            'handleBasicClick',
            'handleMouseEvents',
            'setupBasicEvents',

            'handleKeyEvents',
            'setupKeyboardEvents',

            'handleDelegationClick',
            'addNewItem',
            'setupDelegationEvents',

            'preventLinkDefault',
            'preventFormSubmit',
            'setupPreventionEvents',

            'triggerCustomEvent',
            'handleCustomEvent',
            'setupMultipleListeners',
            'setupCustomEvents',

            'loadImageWithEvents',
            'simulateLoadError',
            'setupLoadingEvents',

            'startTimer',
            'stopTimer',
            'createDebounce',
            'createThrottle',
            'testDebounce',
            'testThrottle',
            'setupTimerEvents'
        ];

        functions.forEach((name) => {
            test(
                typeof window[name] === 'function',
                `Функция ${name} существует`
            );
        });
    }


    // ПРОВЕРКА HTML-ЭЛЕМЕНТОВ

    function testDomElements() {

        const ids = [
            'basic-btn',
            'basic-output',

            'color-box',
            'mouse-output',

            'key-input',
            'key-output',

            'item-list',
            'add-item-btn',
            'delegation-output',

            'prevent-link',
            'prevent-form',
            'prevention-output',

            'trigger-custom',
            'multiple-listeners',
            'custom-output',

            'load-image',
            'load-error',
            'image-container',
            'loading-output',

            'start-timer',
            'stop-timer',
            'debounce-btn',
            'throttle-btn',
            'timer-output',
            'async-output'
        ];

        ids.forEach((id) => {
            test(
                Boolean(document.getElementById(id)),
                `Элемент #${id} существует`
            );
        });
    }


    // ЗАДАНИЕ 1

    function testBasicClick() {

        const button =
            document.querySelector('#basic-btn');

        const output =
            document.querySelector('#basic-output');

        button.click();

        test(
            output.textContent.includes('Тип события: click'),
            'Клик по basic-btn обновляет basic-output'
        );

        test(
            button.classList.contains('pulse'),
            'Кнопка basic-btn получает класс pulse'
        );

        setTimeout(() => {

            test(
                !button.classList.contains('pulse'),
                'Класс pulse снимается через 500 мс'
            );

        }, 600);
    }


    // ЗАДАНИЕ 3

    function testDelegation() {

        const list =
            document.querySelector('#item-list');

        const before =
            list.querySelectorAll('.item').length;

        addNewItem();

        const after =
            list.querySelectorAll('.item').length;

        test(
            after === before + 1,
            'addNewItem добавляет новый элемент'
        );

        const newItem =
            list.lastElementChild;

        newItem.click();

        test(
            newItem.classList.contains('selected'),
            'Делегирование добавляет selected'
        );

        newItem.click();

        test(
            !newItem.classList.contains('selected'),
            'Делегирование снимает selected'
        );

        const deleteButton =
            newItem.querySelector('.delete');

        deleteButton.click();

        test(
            !list.contains(newItem),
            'Кнопка удаления удаляет родительский .item'
        );
    }


    // ЗАДАНИЕ 4

    function testPreventDefault() {

        const link =
            document.querySelector('#prevent-link');

        let prevented = false;

        link.addEventListener(
            'click',
            (event) => {
                prevented = event.defaultPrevented;
            },
            { once: true }
        );

        link.click();

        setTimeout(() => {

            test(
                prevented,
                'Клик по ссылке предотвращает стандартное поведение'
            );

        }, 50);
    }


    // ЗАДАНИЕ 5

    function testCustomEvent() {

        let received = false;

        const listener = (event) => {

            received =
                event.detail?.message ===
                'Привет от кастомного события!';
        };

        document.addEventListener(
            'customAction',
            listener,
            { once: true }
        );

        triggerCustomEvent();

        setTimeout(() => {

            test(
                received,
                'CustomEvent передаёт правильные данные в event.detail'
            );

        }, 50);
    }

    // DEBOUNCE

    function testDebounce() {

        let count = 0;

        const debounced =
            createDebounce(() => {
                count += 1;
            }, 100);

        debounced();
        debounced();
        debounced();

        setTimeout(() => {

            test(
                count === 1,
                'Debounce оставляет один вызов после серии быстрых вызовов'
            );

        }, 180);
    }


    // THROTTLE

    function testThrottle() {

        let count = 0;

        const throttled =
            createThrottle(() => {
                count += 1;
            }, 100);

        throttled();
        throttled();
        throttled();

        setTimeout(() => {

            test(
                count === 1,
                'Throttle ограничивает серию быстрых вызовов'
            );

        }, 50);
    }

    // ТАЙМЕР

    function testTimer() {

        startTimer();

        const firstInterval =
            timerInterval;

        startTimer();

        test(
            timerInterval === firstInterval,
            'Повторный запуск таймера не создаёт второй interval'
        );

        setTimeout(() => {

            test(
                timerValue >= 1,
                'Таймер увеличивает значение через 1 секунду'
            );

            stopTimer();

            test(
                timerValue === 0,
                'Остановка таймера сбрасывает значение'
            );

        }, 1100);
    }


    // ЗАПУСК ВСЕХ ТЕСТОВ

    function runAllTests() {

        console.group('ПР12 — автоматические тесты');

        testFunctionsExist();
        testDomElements();

        testBasicClick();
        testDelegation();
        testPreventDefault();
        testCustomEvent();

        testDebounce();
        testThrottle();
        testTimer();

        console.log(
            'Асинхронные тесты будут завершены через несколько секунд.'
        );

        console.groupEnd();
    }


    document.addEventListener(
        'DOMContentLoaded',
        () => {
            setTimeout(runAllTests, 100);
        }
    );

})();