const timerInput = document.getElementById("timer-input");
const timerStart = document.getElementById("timer-start");
const timerReset = document.getElementById("timer-reset");
const timerOutput = document.getElementById("timer-output");

const parseTime = (totalSeconds) => {
	const totalMinutes = Math.floor(totalSeconds / 60);

	return {
		h: Math.floor(totalMinutes / 60),
		m: totalMinutes % 60,
		s: totalSeconds % 60
	};
}

const formatTime = (time) => {
	const format = {};

	for (const val in time)
		format[val] = Math
			.round(time[val])
			.toString()
			.padStart(2, "0");

	return `${format.h}:${format.m}:${format.s}`
}

const resetTimer = (timer) => {
	clearInterval(timer);
	timerStart.style.display = "block";
	timerReset.style.display = "none";
	timerInput.readOnly = false;
	timerOutput.innerText = "00:00:00"
}

const createTimerAnimator = () => {
	let timer;

	timerReset.addEventListener("click", () => {
		resetTimer(timer);
	});

	return (seconds) => {
		const startTime = Date.now();
		const endTime = startTime + seconds * 1000;

		const tick = () => {
			const timeLeft = endTime - Date.now();
			const time = parseTime(timeLeft / 1000);

			timerOutput.innerText = formatTime(time);

			if (timeLeft <= 0) {
				resetTimer(timer);
			}

		};

		tick();
		timer = setInterval(tick, 1000);
	};
};
const animateTimer = createTimerAnimator();


timerInput.addEventListener("input", (i) => {
	timerInput.value = i.target.value.replace(/\D/g, "");
});

timerStart.addEventListener("click", () => {
	const seconds = Number(timerInput.value);
	timerStart.style.display = "none";
	timerReset.style.display = "block";
	timerInput.readOnly = true;
	animateTimer(seconds);
	// timerInput.value = "";
});

