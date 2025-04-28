// Fungsi untuk hamburger menu pada tampilan mobile
function hamburg() {
    // Menampilkan dropdown menu
    document.querySelector('.dropdown').style.top = '0';
}

// Fungsi untuk menutup dropdown menu
function cancel() {
    // Menyembunyikan dropdown menu
    document.querySelector('.dropdown').style.top = '-100%';
}

// Efek Typewriter untuk menampilkan berbagai keahlian/profesi
document.addEventListener('DOMContentLoaded', function() {
    // Array kata-kata yang akan ditampilkan secara berurutan
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
    let typeSpeed = 100; // Kecepatan mengetik (ms)
    
    const typewriterElement = document.querySelector('.typewriter-text');
    
    function type() {
        // Kata saat ini
        const currentWord = words[wordIndex];
        
        // Mengatur kecepatan berdasarkan apakah sedang mengetik atau menghapus
        if (isDeleting) {
            // Menghapus karakter
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Lebih cepat saat menghapus
        } else {
            // Menambah karakter
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Kecepatan normal saat mengetik
        }
        
        // Logika untuk mengganti kata
        if (!isDeleting && charIndex === currentWord.length) {
            // Ketika selesai mengetik kata, mulai hapus setelah jeda
            isDeleting = true;
            typeSpeed = 1000; // Jeda sebelum mulai menghapus
        } else if (isDeleting && charIndex === 0) {
            // Setelah kata terhapus, pindah ke kata berikutnya
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Kembali ke awal jika sudah kata terakhir
            typeSpeed = 500; // Jeda sebelum mengetik kata berikutnya
        }
        
        // Memanggil fungsi type lagi setelah interval waktu
        setTimeout(type, typeSpeed);
    }
    
    // Mulai efek typewriter
    type();
});