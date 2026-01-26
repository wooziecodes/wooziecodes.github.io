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

    // Render a featured post (prose style, not card)
    function renderFeaturedPost(post) {
        return `
            <div class="featured-post">
                <h4><a href="blog/${post.slug}/">${post.title}</a></h4>
                <p class="featured-excerpt">${post.excerpt}</p>
                <p class="featured-meta">${formatDate(post.date)} · ${post.readingTime} min read</p>
            </div>
        `;
    }

    // Render a compact post row
    function renderPostRow(post) {
        return `
            <li>
                <a href="blog/${post.slug}/">${post.title}</a>
                <span class="post-meta-inline"> · ${formatDate(post.date)} · ${post.readingTime} min</span>
            </li>
        `;
    }

    // Render posts for a category section
    function renderCategoryPosts(posts, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (posts.length === 0) {
            // Don't show "no posts" for making - Medium posts will fill it
            if (containerId !== 'making-posts') {
                container.innerHTML = '<p class="no-posts">No posts yet.</p>';
            }
            return;
        }

        // Check for featured post
        const featured = posts.find(p => p.featured);
        const regular = posts.filter(p => !p.featured);

        let html = '';

        if (featured) {
            html += renderFeaturedPost(featured);
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

    // Render academic papers - appended under Thinking section
    function renderAcademicPapers(papers) {
        const container = document.getElementById('thinking-posts');
        if (!container || !papers || papers.length === 0) return;

        // Get existing content (blog posts)
        let existingContent = container.innerHTML;

        // Create Academic Papers subsection
        let papersHtml = '<div class="subsection"><h4>Academic Papers</h4><ul class="post-list">';
        papers.forEach(paper => {
            papersHtml += `
                <li>
                    <a href="${paper.url}" target="_blank">${paper.title}</a> (PDF)
                    <span class="paper-description">${paper.description}</span>
                </li>
            `;
        });
        papersHtml += '</ul></div>';

        // Append papers to existing content
        container.innerHTML = existingContent + papersHtml;
    }

    // Medium feed integration - renders under Making section
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
        const container = document.getElementById('making-posts');
        if (!container) return;

        // Get existing content (from making posts)
        let existingContent = container.innerHTML;

        // Create Medium subsection
        let mediumHtml = '<div class="subsection"><h4>From Medium</h4><ul class="post-list">';

        posts.forEach(post => {
            const date = new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            mediumHtml += `
                <li>
                    <a href="${post.link}" target="_blank">${post.title}</a>
                    <span class="post-meta-inline"> · ${date}</span>
                </li>
            `;
        });

        mediumHtml += '</ul></div>';

        // Append Medium posts to existing content
        container.innerHTML = existingContent + mediumHtml;
    }

    async function loadMediumPosts() {
        try {
            const xml = await fetchMediumFeed();
            const posts = parseFeed(xml);
            displayMediumPosts(posts);
        } catch (error) {
            console.error('Error fetching Medium feed:', error);
            const container = document.getElementById('making-posts');
            if (container) {
                container.innerHTML += '<div class="subsection"><h4>From Medium</h4><p class="no-posts">Unable to load Medium posts.</p></div>';
            }
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        loadPosts();
        loadMediumPosts();
    });
})();
