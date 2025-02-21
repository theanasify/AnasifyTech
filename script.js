document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');

  // Fetch posts from JSON files
  fetchPosts().then(posts => {
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  });
});

async function fetchPosts() {
  const response = await fetch('posts/posts.json');
  const data = await response.json();
  return data;
}

function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.className = 'bg-white p-4 rounded-lg shadow-lg';

  postElement.innerHTML = `
    <h2 class="text-xl font-bold">${post.title}</h2>
    <p class="text-gray-700 mt-2">${post.description}</p>
    <a href="${post.link}" class="text-blue-500 hover:underline mt-4 block">Read More</a>
  `;

  return postElement;
}
