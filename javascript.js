document.addEventListener('wheel', function(e) {
    e.preventDefault();
    let delta = e.deltaY;
    let currentSection = document.querySelector('section.current');
    let nextSection;

    if (delta > 0) {
        nextSection = currentSection.nextElementSibling;
    } else {
        nextSection = currentSection.previousElementSibling;
    }

    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        currentSection.classList.remove('current');
        nextSection.classList.add('current');
    }
}, { passive: false });
