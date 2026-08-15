const API_URL = "http://localhost:8080";

// load posts function

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

// create post function

const createForm = document.getElementById("create-post");

createForm.addEventListener("submit", async function(event) {
    
    event.preventDefault();

    const post = {
        title: document.getElementById("post-title").value,
        content: document.getElementById("post-content").value
    };

    try {

        const response = await fetch(`${API_URL}/api/post`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(post)
            });

        if (!response.ok) {
            throw new Error(`HTTP ${response.error}`);
        }

        const savedPost = await response.json();

        console.log(savedPost);

        createForm.reset();

        await loadPosts();

        alert("Post created!");

    } catch (error) {

        console.error("Error: ", error);

        alert("Could not connect to the API.");

    }
})