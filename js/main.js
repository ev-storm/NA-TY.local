const outerCircle = document.getElementById('outer-circle');
const innerCircle = document.getElementById('inner-circle');

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', function(e) {
		const rect = outerCircle.getBoundingClientRect();
		const radius = rect.width / 2;
		const innerRadius = innerCircle.offsetWidth / 2;
		const centerX = rect.left + radius;
		const centerY = rect.top + radius;


		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const dx = mouseX - centerX;
		const dy = mouseY - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);


		if (distance < radius - innerRadius) {
				targetX = mouseX - rect.left - innerRadius;
				targetY = mouseY - rect.top - innerRadius;
		} else {

				const angle = Math.atan2(dy, dx);
				targetX = centerX + (radius - innerRadius) * Math.cos(angle) - rect.left - innerRadius;
				targetY = centerY + (radius - innerRadius) * Math.sin(angle) - rect.top - innerRadius;
		}
});

function animate() {
		currentX += (targetX - currentX) * 0.05;
		currentY += (targetY - currentY) * 0.05;

		innerCircle.style.left = currentX + 'px';
		innerCircle.style.top = currentY + 'px';

		requestAnimationFrame(animate);
}


animate();

////////////------------ TAb --------//////////////////

document.addEventListener("DOMContentLoaded", function() {
	const words = ["выдающимися", "вдохновляющими", "запоминающимися"];
	let i = 0;
	let j = 0;
	let currentWord = '';
	let isDeleting = false;
	const spanElement = document.getElementById('changing-text');

	function typeWriter() {
			const fullWord = words[i];

			if (isDeleting) {
					currentWord = fullWord.substring(0, currentWord.length - 1);
			} else {
					currentWord = fullWord.substring(0, currentWord.length + 1);
			}

			spanElement.textContent = currentWord;

			let typingSpeed = 150;

			if (isDeleting) {
					typingSpeed /= 2;
			}

			if (!isDeleting && currentWord === fullWord) {
					typingSpeed = 2000;
					isDeleting = true;
			} else if (isDeleting && currentWord === '') {
					isDeleting = false;
					i = (i + 1) % words.length;
					typingSpeed = 500;
			}

			setTimeout(typeWriter, typingSpeed);
	}

	typeWriter();
});


////////////------------SCROLL--------//////////////////

window.addEventListener('scroll', function() {
  const outerCircle = document.getElementById('outer-circle');
	const innerCircle = document.getElementById('inner-circle');
	const menuDark = document.getElementById('menu-dark');
	const logoDark = document.getElementById('logo-dark');
	const about = document.getElementById('about');
  const scrollPosition = window.scrollY;


	const stopScrollPosition = (50 - 30) * window.innerHeight / 100;
	if (scrollPosition > stopScrollPosition) {
		outerCircle.style.left = '50%';
	} else {
		outerCircle.style.left = (30 + scrollPosition / (window.innerHeight / 100)) + '%';
	}

	outerCircle.style.width = (700 + scrollPosition * 2) + 'px';
	outerCircle.style.height = (700 + scrollPosition * 2) + 'px';
	innerCircle.style.opacity = (100 - scrollPosition * 0.1) + '%';
	menuDark.style.opacity = (100 - scrollPosition * 0.3) + '%';
	logoDark.style.opacity = (100 - scrollPosition * 0.15) + '%';
	
});


function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}


function onScroll() {
	const items = document.querySelectorAll('.about__item');
	items.forEach(item => {
			if (isElementInViewport(item)) {
					item.classList.add('visible');
			}
	});
}

window.addEventListener('scroll', onScroll);
document.addEventListener('DOMContentLoaded', onScroll);

