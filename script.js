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
    card.innerHTML = `
      <a href="#">
        <div class="thumb">
          <img src="${post.image || 'https://i.ibb.co/placeholder.jpg'}" alt="${post.title}">
          <div class="badge">${post.category}</div>
        </div>
        <div class="content">
          <div class="title">${post.title}</div>
          <div class="meta">${post.date}</div>
        </div>
      </a>
      <div class="ad-box">Native Banner Ad (Inside Post)</div>
    `;
    postsContainer.appendChild(card);
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