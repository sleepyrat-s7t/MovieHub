const postsContainer = document.getElementById("postsContainer");
const searchBox = document.getElementById("searchBox");
let postsData = [];

fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    postsData = data;
    renderPosts(postsData);
  });

function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";

    // Post content
    card.innerHTML = `
      <a href="https://t.co/XQdVH7QtTQ" target="_self">
        <div class="thumb">
          <img src="${post.image || 'https://i.ibb.co/placeholder.jpg'}" alt="${post.title}">
          <div class="badge">${post.category}</div>
        </div>
        <div class="content">
          <div class="title">${post.title}</div>
          <div class="meta">${post.date}</div>
        </div>
      </a>
      <div class="ad-box" id="ad-${post.title.replace(/\s+/g, '-') }"></div>
    `;

    postsContainer.appendChild(card);

    // Insert your native banner ad dynamically
    const adContainer = card.querySelector(".ad-box");
    adContainer.innerHTML = `
      <script async="async" data-cfasync="false" src="https://pl28625077.effectivegatecpm.com/13c610a751fa1554ea56e5008eafae27/invoke.js"></script>
      <div id="container-13c610a751fa1554ea56e5008eafae27"></div>
    `;
  });
}

// SEARCH FUNCTION
searchBox.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const filtered = postsData.filter(p => p.title.toLowerCase().includes(query));
  renderPosts(filtered);
});

// CATEGORY FILTER
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const category = e.target.dataset.category;
    if(category === "All") renderPosts(postsData);
    else renderPosts(postsData.filter(p => p.category === category));
  });
});
