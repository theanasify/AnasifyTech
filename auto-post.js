const fs = require('fs');
const axios = require('axios');

async function fetchTrendingTopics() {
  try {
    const response = await axios.get('https://api.trends.com/v1/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending topics:', error.message);
    return [];
  }
}

async function generatePost(topic) {
  const post = {
    title: topic.title,
    description: topic.description,
    link: `posts/${topic.title.toLowerCase().replace(/ /g, '-')}.html`
  };

  fs.writeFileSync(`posts/${post.link}`, `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${post.title}</title>
    </head>
    <body>
      <h1>${post.title}</h1>
      <p>${post.description}</p>
    </body>
    </html>
  `);

  return post;
}

async function main() {
  const topics = await fetchTrendingTopics();
  if (topics.length === 0) {
    console.log('No trending topics found.');
    return;
  }

  const posts = await Promise.all(topics.map(topic => generatePost(topic)));
  fs.writeFileSync('posts/posts.json', JSON.stringify(posts, null, 2));
  console.log('Blog posts generated successfully.');
}

main();
