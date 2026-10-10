// Data Array based on your map links
const pandals = [
    { id: 1, name: "শ্যামবাজার পল্লী সংঘ", link: "https://maps.app.goo.gl/cMerW7WpH88oXkVr9" },
    { id: 2, name: "শ্যাম স্কোয়ার", link: "https://maps.app.goo.gl/BxKDhAMwCsL5wPNQA" },
    { id: 3, name: "উত্তর কলকাতা সার্বজনীন দুর্গা", link: "https://maps.app.goo.gl/z8w5nRixxWoXGLkE7" },
    { id: 4, name: "জগৎ মুখার্জী পার্ক", link: "https://maps.app.goo.gl/H5J99FXED7mCVq8w7" },
    { id: 5, name: "সারঙ্গ দুর্গোৎসব সমিতি", link: "https://maps.app.goo.gl/s9ieLVpbacrMrjFr9?g_st=ac" },
    { id: 6, name: "বাগবাজার পল্লী পুজো ও প্রদর্শনী", link: "https://maps.app.goo.gl/vUnbS4Q4Htxm1giw5?g_st=ac" },
    { id: 7, name: "বাগবাজার সার্বজনীন দুর্গা পুজো (রানী মা)", link: "https://maps.app.goo.gl/SaqCQ3VkR6Eor5Rf9" },
    { id: 8, name: "কুমোরটুলি সার্বজনীন দুর্গোৎসব", link: "https://maps.app.goo.gl/8kz8XgFY2tTjau9V6?g_st=ac" },
    { id: 9, name: "কুমোরটুলি পার্ক", link: "https://maps.app.goo.gl/ViSggi1E6ktogg716" },
    { id: 10, name: "বেনিয়াটোলা", link: "https://maps.app.goo.gl/jvGPzvCeTrG8Wenu9?g_st=ac" },
    { id: 11, name: "আহিরীটোলা", link: "https://maps.app.goo.gl/gmSinLNC8Y9ngJGS8?g_st=ac" },
    { id: 12, name: "নবেন্দ্র কৃষ্ণ দেব পার্ক (লাল মন্দির)", link: "https://maps.app.goo.gl/GU1qNujdj7HYc6Fm6?g_st=ac" },
    { id: 13, name: "শোভাবাজার রাজবাড়ি ঠাকুর দালান", link: "https://maps.app.goo.gl/cBKDqq3XZtSLkJiw6" }
];

let route = [];
let currentIndex = 0;

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startJourney(direction) {
    if (direction === 'shyambazar') {
        route = [...pandals]; // 1 to 13
    } else {
        route = [...pandals].reverse(); // 13 to 1
    }
    currentIndex = 0;
    updateUI();
    switchScreen('journey-screen');
}

function updateUI() {
    if (currentIndex >= route.length) {
        switchScreen('complete-screen');
        return;
    }

    const currentPandal = route[currentIndex];
    
    // Update text and links
    document.getElementById('current-stop-number').innerText = `স্টপ ${currentIndex + 1}/${route.length}`;
    document.getElementById('pandal-name').innerText = currentPandal.name;
    document.getElementById('pandal-map-link').href = currentPandal.link;

    // Update upcoming info
    if (currentIndex + 1 < route.length) {
        document.getElementById('progress-info').innerText = `পরবর্তী গন্তব্য: ${route[currentIndex + 1].name}`;
    } else {
        document.getElementById('progress-info').innerText = "এটিই আজকের শেষ গন্তব্য!";
    }
}

function markAsVisited() {
    currentIndex++;
    
    // Add a small delay for animation effect if needed
    const card = document.querySelector('.pandal-card');
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0.5';
    
    setTimeout(() => {
        updateUI();
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
    }, 200);
}

function confirmRestart() {
    if (confirm("আপনি কি নিশ্চিত যে আপনি পরিক্রমা নতুন করে শুরু করতে চান?")) {
        currentIndex = 0;
        route = [];
        switchScreen('home-screen');
    }
}
