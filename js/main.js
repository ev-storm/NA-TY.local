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

////////////------------SCROLL--------//////////////////

window.addEventListener('scroll', function() {
  const outerCircle = document.getElementById('outer-circle');
	const innerCircle = document.getElementById('inner-circle');
	const menuDark = document.getElementById('menu-dark');
	const logoDark = document.getElementById('logo-dark');
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
