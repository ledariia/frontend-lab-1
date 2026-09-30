document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const iconPath = menuBtn.querySelector('path');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');

            if (!isExpanded) {
                iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                iconPath.setAttribute('d', 'M3 12H21M3 6H21M3 18H21');
            }
        });
    }
});