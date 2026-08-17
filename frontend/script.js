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
            <h3>${post.title}</h3>

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
            throw new Error(`HTTP ${response.status}`);
        }

        const savedPost = await response.json();

        console.log(savedPost);

        createForm.reset();

        await loadPosts();

        await loadPostDropdown("select-post-update");
        await loadPostDropdown("select-post-delete");

        alert("Post created!");

    } catch (error) {

        console.error("Error: ", error);

        alert(`Error updating post: ${error.message}`);

    }
})

// post Id dropdown

async function loadPostDropdown(selectId) {

    const response = await fetch(`${API_URL}/api/post`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const posts = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML = "";

    posts.forEach(post => {

        const option = document.createElement("option");

        option.value = post.id;

        option.textContent = post.title;

        select.appendChild(option);

    });
}

loadPostDropdown("select-post-update");
loadPostDropdown("select-post-delete");

// update post function

const updateForm = document.getElementById("update-post");

updateForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const postId = Number(document.getElementById("select-post-update").value)

    const post = {
        title: document.getElementById("update-post-title").value,
        content: document.getElementById("update-post-content").value
    };

    try {

        const response = await fetch(`${API_URL}/api/post/${postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post)
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const updatedPost = await response.json();

        console.log(updatedPost);

        updateForm.reset();

        await loadPosts();
        await loadPostDropdown("select-post-update");
        await loadPostDropdown("select-post-delete");

        alert("Post Updated!");

    } catch (error) {

        console.error("Error: ", error);

        alert(`Error updating post: ${error.message}`)

    }
})

// delete post fuction

const deleteForm = document.getElementById("delete-post");

deleteForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const postId = Number(document.getElementById("select-post-delete").value);

    try {

        const response = await fetch(`${API_URL}/api/post/${postId}`, {

            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        deleteForm.reset();

        await loadPosts();
        await loadPostDropdown("select-post-update");
        await loadPostDropdown("select-post-delete");

        alert("Post deleted!");

    } catch (error) {
        console.error("Error: ", error);
        alert(`Error deleting post: ${error.message}`)
    }
})