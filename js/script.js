// Fungsi untuk hamburger menu pada tampilan mobile
function hamburg() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.add('active');
}

// Fungsi untuk menutup dropdown menu
function cancel() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.remove('active');
}

// Tutup dropdown kalau klik link di dalamnya
document.addEventListener('DOMContentLoaded', function() {
    const dropdownLinks = document.querySelectorAll('.dropdown .links a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.dropdown').classList.remove('active');
        });
    });

    // Efek Typewriter
    const words = [
        "Web Developer",
        "Student",
        "Information Systems Major",
        "Database Developer",
        "UI/UX Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const typewriterElement = document.querySelector('.typewriter-text');

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});
