const stickySections = [...document.querySelectorAll('.sticky')];

window.addEventListener('scroll', () => {
    stickySections.forEach((section) => {
        const parent = section.parentElement;
        const scrollSection = section.querySelector('.scroll_section');
        
        // Get the bounding rectangle of the sticky parent
        const parentRect = parent.getBoundingClientRect();
        const parentTop = -parentRect.top; // Distance from top of the viewport to the parent
        const scrollDistance = parent.offsetHeight - window.innerHeight; // Total scrollable distance
        
        // Calculate progress (0 to 1)
        let progress = Math.min(Math.max(parentTop / scrollDistance, 0), 1);
        
        // Calculate the translation for horizontal scrolling
        const maxTranslate = scrollSection.scrollWidth - window.innerWidth; // Total scrollable width
        const translateX = progress * maxTranslate; // Calculate the translation value

        // Apply the translation (inverted to move left)
        scrollSection.style.transform = `translateX(-${translateX}px)`;
    });
});