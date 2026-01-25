// Blog Index - Handles post rendering and Medium feed integration

(function() {
    'use strict';

    // Fetch and render posts from posts.json
    async function loadPosts() {
        try {
            const response = await fetch('blog/posts.json');
            const data = await response.json();
            renderPosts(data.posts);
            renderAcademicPapers(data.academicPapers);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    // Group posts by category
    function groupByCategory(posts) {
        const groups = {
            thinking: [],
            feeling: [],
            making: []
        };

        posts.forEach(post => {
            if (groups[post.category]) {
                groups[post.category].push(post);
            }
        });

        // Sort each category by date (newest first)
        Object.keys(groups).forEach(category => {
            groups[category].sort((a, b) => new Date(b.date) - new Date(a.date));
        });

        return groups;
    }

    // Format date for display
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    }

    // Render a featured post card
    function renderFeaturedCard(post) {
        return `
            <div class="featured-post">
                <a href="blog/${post.slug}/" class="featured-link">
                    <h4 class="featured-title">${post.title}</h4>
                </a>
                <p class="featured-excerpt">${post.excerpt}</p>
                <div class="featured-meta">
                    <span class="featured-date">${formatDate(post.date)}</span>
                    <span class="featured-reading-time">${post.readingTime} min read</span>
                </div>
            </div>
        `;
    }

    // Render a compact post row
    function renderPostRow(post) {
        return `
            <li class="post-row">
                <a href="blog/${post.slug}/">${post.title}</a>
                <span class="post-meta-inline">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-reading-time">${post.readingTime} min</span>
                </span>
            </li>
        `;
    }

    // Render posts for a category section
    function renderCategoryPosts(posts, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = '<p class="no-posts">No posts yet.</p>';
            return;
        }

        // Check for featured post
        const featured = posts.find(p => p.featured);
        const regular = posts.filter(p => !p.featured);

        let html = '';

        if (featured) {
            html += renderFeaturedCard(featured);
        }

        if (regular.length > 0) {
            html += '<ul class="post-list">';
            regular.forEach(post => {
                html += renderPostRow(post);
            });
            html += '</ul>';
        }

        container.innerHTML = html;
    }

    // Render all posts
    function renderPosts(posts) {
        const groups = groupByCategory(posts);

        renderCategoryPosts(groups.thinking, 'thinking-posts');
        renderCategoryPosts(groups.feeling, 'feeling-posts');
        renderCategoryPosts(groups.making, 'making-posts');
    }

    // Render academic papers
    function renderAcademicPapers(papers) {
        const container = document.getElementById('academic-papers');
        if (!container || !papers || papers.length === 0) return;

        let html = '<ul class="post-list">';
        papers.forEach(paper => {
            html += `
                <li>
                    <a href="${paper.url}" target="_blank">${paper.title} (PDF)</a>
                    <span class="paper-description">${paper.description}</span>
                </li>
            `;
        });
        html += '</ul>';

        container.innerHTML = html;
    }

    // Medium feed integration (preserved from original)
    async function fetchMediumFeed() {
        const parser = new DOMParser();
        const response = await fetch('https://api.allorigins.win/get?url=https://medium.com/feed/@wooz');
        const data = await response.json();
        const xml = parser.parseFromString(data.contents, 'application/xml');
        return xml;
    }

    function parseFeed(xml) {
        const items = xml.querySelectorAll('item');
        const posts = [];
        items.forEach(item => {
            const titleElement = item.querySelector('title');
            const linkElement = item.querySelector('link');
            const pubDateElement = item.querySelector('pubDate');

            const title = titleElement ? titleElement.textContent : 'No title';
            const link = linkElement ? linkElement.textContent : '#';
            const pubDate = pubDateElement ? pubDateElement.textContent : 'No date';

            posts.push({ title, link, pubDate });
        });
        return posts;
    }

    function displayMediumPosts(posts) {
        const blogContainer = document.getElementById('medium-posts');
        if (!blogContainer) return;

        blogContainer.innerHTML = '';
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="${post.link}" target="_blank">${post.title}</a>
                <span class="post-date">${new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            `;
            blogContainer.appendChild(listItem);
        });
    }

    async function loadMediumPosts() {
        try {
            const xml = await fetchMediumFeed();
            const posts = parseFeed(xml);
            displayMediumPosts(posts);
        } catch (error) {
            console.error('Error fetching Medium feed:', error);
            const container = document.getElementById('medium-posts');
            if (container) {
                container.innerHTML = '<li class="error">Unable to load Medium posts.</li>';
            }
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        loadPosts();
        loadMediumPosts();
    });
})();
