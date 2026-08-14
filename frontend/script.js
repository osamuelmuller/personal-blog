const API_URL = "http://localhost:8080";

async function loadPosts() {
    
    const response = await fetch(`${API_URL}/api/post`);

    const posts = await response.json();

    const container = document.getElementById("previous-posts-container");

    container.innerHTML = "";

    posts.forEach(post => {

        const card = document.createElement("div");

        card.className = "post-card";

        card.innerHTML = `
            <h3>${post.name}</h3>

            <p>${post.content}</p>

            <p>${post.date}</p>`;

        container.appendChild(card)
    })
}

loadPosts()

