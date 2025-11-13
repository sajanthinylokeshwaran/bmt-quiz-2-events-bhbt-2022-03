Const events =[
// --- Day 3: Nov 22, 2025 ---
    {
        title: "UI/UX Design Fundamentals for Developers",
        type: "Workshop",
        date: "2025-11-22T09:00:00",
        description: "A practical workshop on visual hierarchy, color theory, and typography that every developer should know.",
        image: "image.jpeg"
    },
    {
        title: "From Monolith to Serverless",
        type: "Talk",
        date: "2025-11-22T10:00:00",
        description: "A case study on migrating a large-scale legacy application to a modern serverless architecture.",
        image: "image.jpeg"
    },
    {
        title: "State of Web Assembly in 2025",
        type: "Talk",
        date: "2025-11-22T11:30:00",
        description: "Discover how WebAssembly is enabling near-native performance for web applications.",
        image: "image.jpeg"
    },
    {
        title: "Data Visualization with D3.js",
        type: "Workshop",
        date: "2025-11-22T13:30:00",
        description: "Learn to create stunning, interactive data visualizations for the web from scratch.",
        image: "image.jpeg"
    },
    {
        title: "Closing Panel: Ask Me Anything with Speakers",
        type: "Panel",
        date: "2025-11-22T16:00:00",
        description: "An open Q&A session with a panel of the conference's top speakers. No topic is off-limits!",
        image: "image.jpeg"
    },

    // --- Bonus / Past Events for testing ---
    
        title: "Pre-Conference Hackathon",
        type: "Social",
        date: "2025-11-19T09:00:00",
        description: "A 24-hour coding challenge with prizes for the most innovative projects. Kicks off before the main event.",
        image: "image.jpeg"
    },
    {
        title: "API Design Best Practices",
        type: "Talk",
        date: "2025-11-21T15:00:00",
        description: "Learn how to design, document, and maintain clean, consistent, and easy-to-use RESTful APIs.",
        image: "image.jpeg"
    },
    {
        title: "DevOps Culture and Tooling",
        type: "Talk",
        date: "2025-11-20T15:30:00",
        description: "An introduction to the principles of DevOps and the tools that enable continuous integration and deployment.",
        image: "image.jpeg"
    },
    {
        title: "Mobile-First Design in Practice",
        type: "Workshop",
        date: "2025-11-20T13:00:00",
        description: "A hands-on session focusing on practical techniques for designing and building mobile-first responsive websites.",
        image: "image.jpeg"
    },
    {
        title: "Closing Ceremony & Awards",
        type: "Social",
        date: "2025-11-22T17:30:00",
        description: "Join us as we celebrate the best of the conference and announce the hackathon winners.",
        image: "image.jpeg"
    }
];
const buttons = document.querySelectorAll('button[data-filter]');
const cards = document.querySelectorAll('.event-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.filter;

    cards.forEach(card => {
      card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
    });
  });
});
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.body.dataset.theme = prefersDark ? 'dark' : 'light';
document.querySelector('#theme-toggle').addEventListener('click', () => {
  const current = document.body.dataset.theme;
  document.body.dataset.theme = current === 'light' ? 'dark' : 'light';
});
const saved = localStorage.getItem('theme');
if (saved) document.body.dataset.theme = saved;

document.querySelector('#theme-toggle').addEventListener('click', () => {
  const current = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = current;
  localStorage.setItem('theme', current);
});
function addToCalendar(event) {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const date = new Date(event.date).toISOString().replace(/[-:]/g, '').split('.')[0];
  const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${date}/${date}`;
  window.open(link);
}
setInterval(() => {
  document.querySelectorAll('.countdown').forEach(el => {
    const target = new Date(el.dataset.date).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = "Event has ended";
    } else {
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }
  });
}, 1000);
const search = document.querySelector('#search');
search.addEventListener('input', () => {
  const term = search.value.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const match = text.includes(term);
    card.style.display = match ? 'block' : 'none';
    card.innerHTML = card.innerHTML.replace(/<mark>|<\/mark>/g, '');
    if (match && term) {
      card.innerHTML = card.innerHTML.replace(new RegExp(term, 'gi'), m => `<mark>${m}</mark>`);
    }
  });
});
const visible = document.querySelectorAll('.event-card:not([style*="display: none"])').length;
document.getElementById('results-count').textContent = `Now showing ${visible} events.`;
self.addEventListener('install', e => {
  e.waitUntil(caches.open('site-cache').then(cache => {
    return cache.addAll(['/', '/index.html', '/style.css', '/app.js', '/images/']);
  }));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
