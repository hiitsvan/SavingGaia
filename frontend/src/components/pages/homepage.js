const stickySections = [...document.querySelectorAll('.sticky')];

window.addEventListener('scroll', () => {
    stickySections.forEach((section) => {
        const parent = section.parentElement;
        const scrollSection = section.querySelector('.scroll_section');
        
        // Get the distance from the top of the sticky parent to the viewport top
        const parentRect = parent.getBoundingClientRect();
        const parentTop = -parentRect.top;
        const scrollDistance = parent.offsetHeight - window.innerHeight;
        
        // Calculate progress (0 to 1)
        let progress = Math.min(Math.max(parentTop / scrollDistance, 0), 1);
        
        // Calculate the translation
        const maxTranslate = scrollSection.offsetWidth - window.innerWidth;
        const translateX = -progress * maxTranslate;
        
        // Apply the transform
        scrollSection.style.transform = `translateX(${translateX}px)`;
    });
});