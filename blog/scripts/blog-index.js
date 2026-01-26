// Blog Index - Handles post rendering

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

    // Get post URL (internal or external)
    function getPostUrl(post) {
        if (post.external && post.url) {
            return post.url;
        }
        return `blog/${post.slug}/`;
    }

    // Get link attributes
    function getLinkAttrs(post) {
        if (post.external) {
            return 'target="_blank"';
        }
        return '';
    }

    // Render a featured post (prose style)
    function renderFeaturedPost(post) {
        const url = getPostUrl(post);
        const attrs = getLinkAttrs(post);
        const readingTime = post.readingTime ? ` · ${post.readingTime} min read` : '';

        return `
            <div class="featured-post">
                <h4><a href="${url}" ${attrs}>${post.title}</a></h4>
                ${post.excerpt ? `<p class="featured-excerpt">${post.excerpt}</p>` : ''}
                <p class="featured-meta">${formatDate(post.date)}${readingTime}</p>
            </div>
        `;
    }

    // Render a compact post row
    function renderPostRow(post) {
        const url = getPostUrl(post);
        const attrs = getLinkAttrs(post);
        const readingTime = post.readingTime ? ` · ${post.readingTime} min` : '';

        return `
            <li>
                <a href="${url}" ${attrs}>${post.title}</a>
                <span class="post-meta-inline"> · ${formatDate(post.date)}${readingTime}</span>
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

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        loadPosts();
    });
})();
