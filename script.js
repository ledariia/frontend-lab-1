const actionBtn = document.getElementById('action-btn');
const themeBtn = document.getElementById('theme-btn');
const counterSpan = document.getElementById('counter');

let count = 0;

actionBtn.addEventListener('click', () => {
    count++;
    counterSpan.textContent = count;
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
});
