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

// Initialize app on load
window.onload = () => {
    history.replaceState({ screen: 'home-screen' }, '', '#home-screen');
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true // একবারই অ্যানিমেশন হবে
        });
    }
};

// Handle mobile back button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.screen) {
        showScreenWithoutHistory(event.state.screen);
    } else {
        showScreenWithoutHistory('home-screen');
    }
});

function switchScreen(screenId) {
    showScreenWithoutHistory(screenId);
    history.pushState({ screen: screenId }, '', '#' + screenId);
}

function showScreenWithoutHistory(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showList(direction) {
    if (direction === 'shyambazar') {
        route = [...pandals];
    } else {
        route = [...pandals].reverse();
    }
    
    const container = document.getElementById('pandal-list-container');
    container.innerHTML = '';
    
    // Generate list with AOS animation attributes
    route.forEach((pandal, index) => {
        let div = document.createElement('div');
        div.className = 'list-item';
        
        // AOS attributes added here
        div.setAttribute('data-aos', 'fade-up'); 
        div.setAttribute('data-aos-delay', index * 50); 
        
        div.innerText = `${index + 1}. ${pandal.name}`;
        container.appendChild(div);
    });
    
    switchScreen('list-screen');
}

function beginJourneyFlow() {
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
    
    document.getElementById('current-stop-number').innerText = `স্টপ ${currentIndex + 1}/${route.length}`;
    document.getElementById('pandal-name').innerText = currentPandal.name;
    document.getElementById('pandal-map-link').href = currentPandal.link;

    if (currentIndex + 1 < route.length) {
        document.getElementById('progress-info').innerText = `পরবর্তী গন্তব্য: ${route[currentIndex + 1].name}`;
    } else {
        document.getElementById('progress-info').innerText = "এটিই আজকের শেষ গন্তব্য!";
    }
}

function markAsVisited() {
    const card = document.getElementById('pandal-card-anim');
    
    // Exit animation
    card.classList.remove('scale-in', 'card-enter');
    card.classList.add('card-exit');
    
    setTimeout(() => {
        currentIndex++;
        if (currentIndex < route.length) {
            updateUI();
            // Enter animation for next card
            card.classList.remove('card-exit');
            card.classList.add('card-enter');
            
            // Allow browser to render, then remove enter class to settle in center
            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.classList.remove('card-enter');
                }, 50);
            });
        } else {
            updateUI(); // This will trigger the complete screen
        }
    }, 500); // 500ms matches the CSS transition time
}

function confirmRestart() {
    if (confirm("আপনি কি নিশ্চিত যে আপনি পরিক্রমা নতুন করে শুরু করতে চান?")) {
        currentIndex = 0;
        route = [];
        switchScreen('home-screen');
    }
}
