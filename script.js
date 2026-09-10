```javascript
const CORRECT_PIN = '240726';

// =============================
// ELEMENTS
// =============================

const page1 = document.getElementById('page1');
const pinInput = document.getElementById('pinInput');
const pinBtn = document.getElementById('pinBtn');

const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

const restartBtn = document.getElementById('restartBtn');

let isPlaying = false;


// =============================
// PIN CHECK
// =============================

pinBtn.addEventListener('click', checkPin);

pinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkPin();
    }
});

function checkPin() {

    if (pinInput.value === CORRECT_PIN) {

        // Pindah dari PIN ke halaman pertama surat
        switchPage('page1', 'page2');

        // Putar musik otomatis
        playMusic();

        // Bersihkan input
        pinInput.value = '';

        window.scrollTo(0, 0);

    } else {

        // Efek PIN salah
        pinInput.style.border = '2px solid #ff6b6b';

        pinInput.value = '';

        alert('PIN salah ya, coba lagi 💜');

        setTimeout(() => {
            pinInput.style.border = 'none';
        }, 2000);
    }
}


// =============================
// PAGE NAVIGATION
// =============================

// Tombol halaman berikutnya
document.querySelectorAll('.nextBtn').forEach((btn) => {

    btn.addEventListener('click', () => {

        const currentPage = btn.closest('.page').id;
        const nextPage = btn.dataset.next;

        switchPage(currentPage, nextPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});


// Tombol halaman sebelumnya
document.querySelectorAll('.prevBtn').forEach((btn) => {

    btn.addEventListener('click', () => {

        const currentPage = btn.closest('.page').id;
        const previousPage = btn.dataset.prev;

        switchPage(currentPage, previousPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});


// =============================
// RESTART
// =============================

restartBtn.addEventListener('click', () => {

    switchPage('page6', 'page1');

    // Reset PIN
    pinInput.value = '';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});


// =============================
// SWITCH PAGE
// =============================

function switchPage(from, to) {

    const currentPage = document.getElementById(from);
    const nextPage = document.getElementById(to);

    if (currentPage) {
        currentPage.classList.remove('active');
    }

    if (nextPage) {
        nextPage.classList.add('active');
    }
}


// =============================
// MUSIC CONTROL
// =============================

musicBtn.addEventListener('click', () => {

    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }

});


// =============================
// PLAY MUSIC
// =============================

function playMusic() {

    bgMusic.play()
        .then(() => {

            isPlaying = true;

            musicBtn.textContent = '🔊';
            musicBtn.classList.add('playing');

        })
        .catch(() => {

            // Jika browser menolak autoplay
            isPlaying = false;

            musicBtn.textContent = '🎵';
            musicBtn.classList.remove('playing');

        });

}


// =============================
// PAUSE MUSIC
// =============================

function pauseMusic() {

    bgMusic.pause();

    isPlaying = false;

    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');

}


// =============================
// UPDATE STATUS JIKA AUDIO
// BERHENTI / SELESAI
// =============================

bgMusic.addEventListener('pause', () => {

    if (!bgMusic.ended) {
        isPlaying = false;

        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    }

});

bgMusic.addEventListener('play', () => {

    isPlaying = true;

    musicBtn.textContent = '🔊';
    musicBtn.classList.add('playing');

});
```
