// ЗАДАНИЕ 1: Базовые обработчики событий


function handleBasicClick(event) {
	const output = document.querySelector('#basic-output');

	output.textContent =
		`Тип события: ${event.type} | ` +
		`Координаты: X=${event.clientX}, Y=${event.clientY} | ` +
		`Target: ${event.target.tagName}#${event.target.id}`;

	event.currentTarget.classList.remove('pulse');
	void event.currentTarget.offsetWidth;
	event.currentTarget.classList.add('pulse');

	setTimeout(() => {
		event.currentTarget.classList.remove('pulse');
	}, 500);
}

function handleMouseEvents(event) {
	const colorBox = event.currentTarget;
	const output = document.querySelector('#mouse-output');

	if (event.type === 'mouseenter') {
		colorBox.style.backgroundColor = '#e74c3c';
		output.textContent = 'Курсор вошёл в область';
	} else if (event.type === 'mouseleave') {
		colorBox.style.backgroundColor = '#3498db';
		output.textContent = 'Курсор покинул область';
	} else if (event.type === 'mousemove') {
		output.textContent =
			`Координаты мыши: X=${event.clientX}, Y=${event.clientY}`;
	}
}

function setupBasicEvents() {
	const basicButton = document.querySelector('#basic-btn');
	const colorBox = document.querySelector('#color-box');

	basicButton.addEventListener('click', handleBasicClick);

	colorBox.addEventListener('mouseenter', handleMouseEvents);
	colorBox.addEventListener('mouseleave', handleMouseEvents);
	colorBox.addEventListener('mousemove', handleMouseEvents);
}


// ЗАДАНИЕ 2: События клавиатуры

function handleKeyEvents(event) {
	const output = document.querySelector('#key-output');
	const key = event.key;
	const normalizedKey = key.toLowerCase();

	if (event.ctrlKey && normalizedKey === 's') {
		event.preventDefault();
		output.textContent =
			'Специальная комбинация: Ctrl + S (стандартное действие отменено)';
		return;
	}

	if (event.altKey && normalizedKey === 'c') {
		event.preventDefault();
		output.textContent =
			'Специальная комбинация: Alt + C (стандартное действие отменено)';
		return;
	}

	if (event.shiftKey && normalizedKey === 'a') {
		event.preventDefault();
		output.textContent =
			'Специальная комбинация: Shift + A (стандартное действие отменено)';
		return;
	}

	output.textContent =
		`key: ${event.key} | ` +
		`code: ${event.code} | ` +
		`ctrlKey: ${event.ctrlKey} | ` +
		`altKey: ${event.altKey} | ` +
		`shiftKey: ${event.shiftKey}`;
}

function setupKeyboardEvents() {
	const input = document.querySelector('#key-input');
	const pressedKeys = new Set();

	input.addEventListener('keydown', (event) => {
		pressedKeys.add(event.code);
		handleKeyEvents(event);
	});

	input.addEventListener('keyup', (event) => {
		pressedKeys.delete(event.code);
	});

	input.addEventListener('blur', () => {
		pressedKeys.clear();
	});
}


// ЗАДАНИЕ 3: Делегирование событий

let itemCounter = 3;

function updateDelegationOutput() {
	const selectedItems = [
		...document.querySelectorAll('#item-list .item.selected')
	];

	const output = document.querySelector('#delegation-output');

	if (selectedItems.length === 0) {
		output.textContent = 'Выбранные элементы: нет';
		return;
	}

	const ids = selectedItems
		.map((item) => item.dataset.id)
		.join(', ');

	output.textContent = `Выбранные элементы: ${ids}`;
}

function handleDelegationClick(event) {
	const itemList = event.currentTarget;
	const deleteButton = event.target.closest('.delete');

	if (deleteButton && itemList.contains(deleteButton)) {
		const item = deleteButton.closest('.item');

		if (item) {
			item.remove();
		}

		updateDelegationOutput();
		return;
	}

	const item = event.target.closest('.item');

	if (item && itemList.contains(item)) {
		item.classList.toggle('selected');
		updateDelegationOutput();
	}
}

function addNewItem() {
	itemCounter += 1;

	const item = document.createElement('div');

	item.className = 'item';
	item.dataset.id = String(itemCounter);

	item.innerHTML = `
        <span>Элемент ${itemCounter}</span>
        <span class="delete">×</span>
    `;

	document
		.querySelector('#item-list')
		.appendChild(item);

	updateDelegationOutput();
}

function setupDelegationEvents() {
	document
		.querySelector('#item-list')
		.addEventListener('click', handleDelegationClick);

	document
		.querySelector('#add-item-btn')
		.addEventListener('click', addNewItem);

	updateDelegationOutput();
}


// ЗАДАНИЕ 4: Предотвращение поведения

function preventLinkDefault(event) {
	event.preventDefault();

	const output = document.querySelector('#prevention-output');

	output.textContent =
		'Переход по ссылке предотвращён с помощью event.preventDefault().';

	const link = event.currentTarget;

	link.classList.remove('shake');
	void link.offsetWidth;
	link.classList.add('shake');

	setTimeout(() => {
		link.classList.remove('shake');
	}, 300);
}

function preventFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const input = form.querySelector('input[type="text"]');
	const output = document.querySelector('#prevention-output');

	const value = input.value.trim();

	if (!value) {
		output.textContent =
			'Ошибка: поле формы не должно быть пустым.';
		return;
	}

	output.textContent =
		`Отправка предотвращена. Данные формы: ${value}`;

	form.reset();
}

function setupPreventionEvents() {
	document
		.querySelector('#prevent-link')
		.addEventListener('click', preventLinkDefault);

	document
		.querySelector('#prevent-form')
		.addEventListener('submit', preventFormSubmit);
}


// ЗАДАНИЕ 5: Кастомные события

function triggerCustomEvent() {
	const customEvent = new CustomEvent('customAction', {
		detail: {
			message: 'Привет от кастомного события!'
		}
	});

	document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
	const output = document.querySelector('#custom-output');

	output.textContent =
		`Кастомное событие: ${event.detail.message}`;

	const button = document.querySelector('#trigger-custom');

	button.classList.remove('pulse');
	void button.offsetWidth;
	button.classList.add('pulse');

	setTimeout(() => {
		button.classList.remove('pulse');
	}, 500);
}

let multipleListenersAdded = false;

function setupMultipleListeners() {
	if (multipleListenersAdded) {
		document.querySelector('#custom-output').textContent =
			'Три обработчика для customAction уже добавлены.';
		return;
	}

	document.addEventListener('customAction', () => {
		console.log(
			'Обработчик №1: customAction получено.'
		);
	});

	document.addEventListener('customAction', () => {
		console.log(
			'Обработчик №2: данные события получены.'
		);
	});

	document.addEventListener('customAction', () => {
		console.log(
			'Обработчик №3: третий слушатель тоже сработал.'
		);
	});

	multipleListenersAdded = true;

	document.querySelector('#custom-output').textContent =
		'Добавлены 3 обработчика события customAction. Запустите событие и проверьте Console.';
}

function setupCustomEvents() {
	document.addEventListener(
		'customAction',
		handleCustomEvent
	);

	document
		.querySelector('#trigger-custom')
		.addEventListener('click', triggerCustomEvent);

	document
		.querySelector('#multiple-listeners')
		.addEventListener('click', setupMultipleListeners);
}


// ЗАДАНИЕ 6: События загрузки и ошибок

function loadImageWithEvents() {
	const container = document.querySelector('#image-container');
	const output = document.querySelector('#loading-output');

	container.innerHTML = '';

	container.classList.remove('error', 'success');
	container.classList.add('loading');

	output.textContent =
		'Статус загрузки: начало загрузки...';

	const image = document.createElement('img');

	image.addEventListener('loadstart', () => {
		output.textContent =
			'Статус загрузки: loadstart — загрузка началась.';
	});

	image.addEventListener('load', () => {
		output.textContent =
			'Статус загрузки: load — изображение успешно загружено.';

		container.classList.remove('loading', 'error');
		container.classList.add('success');
	});

	image.addEventListener('error', () => {
		output.textContent =
			'Статус загрузки: error — ошибка загрузки изображения.';

		container.classList.remove('loading', 'success');
		container.classList.add('error');
	});

	image.addEventListener('loadend', () => {
		console.log('Событие loadend обработано.');
	});

	container.appendChild(image);

	image.src = 'https://picsum.photos/300/200';
}

function simulateLoadError() {
	const output = document.querySelector('#loading-output');
	const container = document.querySelector('#image-container');

	container.innerHTML = '';

	container.classList.remove('loading', 'success');
	container.classList.add('error');

	output.textContent =
		'Статус загрузки: попытка загрузить несуществующее изображение...';

	const image = new Image();

	image.addEventListener('load', () => {
		output.textContent =
			'Неожиданно: изображение загрузилось.';
	});

	image.addEventListener('error', () => {
		output.textContent =
			'Статус загрузки: ошибка обработана — изображение не существует.';
	});

	image.src =
		'https://example.invalid/nonexistent-image.jpg';
}

function setupLoadingEvents() {
	document
		.querySelector('#load-image')
		.addEventListener('click', loadImageWithEvents);

	document
		.querySelector('#load-error')
		.addEventListener('click', simulateLoadError);
}


// ЗАДАНИЕ 7: Таймеры и асинхронные события

let timerInterval;
let timerValue = 0;

function startTimer() {
	if (timerInterval !== undefined) {
		return;
	}

	timerInterval = setInterval(() => {
		timerValue += 1;

		document.querySelector('#timer-output').textContent =
			`Таймер: ${timerValue}`;
	}, 1000);

	document.querySelector('#timer-output').textContent =
		'Таймер запущен: 0';
}

function stopTimer() {
	if (timerInterval !== undefined) {
		clearInterval(timerInterval);
		timerInterval = undefined;
	}

	timerValue = 0;

	document.querySelector('#timer-output').textContent =
		'Таймер: 0';
}

function createDebounce(func, delay) {
	let timeoutId;

	return function (...args) {
		const context = this;

		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

function createThrottle(func, interval) {
	let lastCall = 0;

	return function (...args) {
		const now = Date.now();

		if (now - lastCall >= interval) {
			lastCall = now;
			func.apply(this, args);
		}
	};
}

let debounceDemo = null;
let throttleDemo = null;
let debounceNormalCount = 0;
let debounceDelayedCount = 0;
let throttleCount = 0;

function testDebounce() {
	const output = document.querySelector('#async-output');

	if (!debounceDemo) {
		debounceDemo = createDebounce(() => {
			debounceDelayedCount += 1;

			output.textContent =
				`Debounce: обычных вызовов=${debounceNormalCount}, ` +
				`фактических вызовов=${debounceDelayedCount}`;
		}, 500);
	}

	debounceNormalCount += 1;

	output.textContent =
		`Debounce: обычных вызовов=${debounceNormalCount}, ` +
		`ожидается выполнение после паузы...`;

	debounceDemo();
}

function testThrottle() {
	const output = document.querySelector('#async-output');

	if (!throttleDemo) {
		throttleDemo = createThrottle(() => {
			throttleCount += 1;

			output.textContent =
				`Throttle: функция реально сработала ${throttleCount} раз(а). ` +
				`Повторные быстрые вызовы ограничиваются.`;
		}, 1000);
	}

	throttleDemo();

	console.log(
		'Throttle тест: кнопка была нажата. ' +
		'Повторные нажатия чаще 1 раза в секунду ограничиваются.'
	);
}

function setupTimerEvents() {
	document
		.querySelector('#start-timer')
		.addEventListener('click', startTimer);

	document
		.querySelector('#stop-timer')
		.addEventListener('click', stopTimer);

	document
		.querySelector('#debounce-btn')
		.addEventListener('click', testDebounce);

	document
		.querySelector('#throttle-btn')
		.addEventListener('click', testThrottle);
}


// ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ

function initializeEventHandlers() {
	setupBasicEvents();
	setupKeyboardEvents();
	setupDelegationEvents();
	setupPreventionEvents();
	setupCustomEvents();
	setupLoadingEvents();
	setupTimerEvents();

	console.log(
		'Все обработчики событий инициализированы!'
	);
}

document.addEventListener(
	'DOMContentLoaded',
	initializeEventHandlers
);