// Sample Blog Post Data
const allBlogPosts = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        image: "images/javascript.jpg",
        description: "A beginner's guide to the fundamentals of JavaScript, including variables, data types, and functions.",
        date: "2023-10-26",
        category: "Tech"
    },
    {
        id: 2,
        title: "My Trip to the Himalayas",
        image:"images/himalaya.avif",
        description: "An adventurous journey through the majestic Himalayas, with stunning photos and travel tips.",
        date: "2023-10-20",
        category: "Travel"
    },
    {
        id: 3,
        title: "10 Essential CSS Grid Properties",
        image: "images/css.jpg",
        description: "Mastering CSS Grid with a look at ten of the most useful properties for modern layouts.",
        date: "2023-10-25",
        category: "Tech"
    },
    {
        id: 4,
        title: "Cooking Authentic Italian Pasta",
        image: "images/pasta.jpg",
        description: "A step-by-step recipe for making delicious and authentic Italian pasta from scratch.",
        date: "2023-10-18",
        category: "Food"
    },
    {
        id: 5,
        title: "Exploring the City of Tokyo",
        image: "images/tokyo.jpg",
        description: "A guide to the best spots in Tokyo, from the vibrant streets of Shibuya to the serene temples.",
        date: "2023-10-15",
        category: "Travel"
    },
    {
        id: 6,
        title: "Responsive Web Design Principles",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop",
        description: "Learn how to build websites that look great on any device using modern responsive techniques.",
        date: "2023-10-10",
        category: "Tech"
    },
    {
        id: 7,
        title: "Delicious Vegan Desserts",
        image: "images/vegan.jpg",
        description: "A collection of easy and delicious vegan dessert recipes that anyone can make.",
        date: "2023-10-05",
        category: "Food"
    },
    {
        id: 8,
        title: "The Future of AI in Web Development",
        image: "images/ai.jpg",
        description: "An overview of how artificial intelligence is changing the landscape of web development.",
        date: "2023-10-01",
        category: "Tech"
    }
];

// DOM Elements
const blogPostsContainer = document.getElementById('blog-posts-container');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const paginationContainer = document.getElementById('pagination');

// State variables
let currentCategory = 'All';
let searchQuery = '';
let currentPage = 1;
const postsPerPage = 4;

// Functions
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-post-card';
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
            <h3>${post.title}</h3>
            <p class="post-meta">${post.date} | ${post.category}</p>
            <p>${post.description}</p>
        </div>
    `;
    return card;
}

function renderPosts() {
    blogPostsContainer.innerHTML = '';
    
    const filteredByCategory = allBlogPosts.filter(post => {
        return currentCategory === 'All' || post.category === currentCategory;
    });
    
    const filteredBySearch = filteredByCategory.filter(post => {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
    if (filteredBySearch.length === 0) {
        blogPostsContainer.innerHTML = '<p style="text-align: center; color: #888; font-style: italic;">No posts found matching your criteria.</p>';
        paginationContainer.innerHTML = '';
        return;
    }
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredBySearch.slice(startIndex, endIndex);
    
    paginatedPosts.forEach(post => {
        blogPostsContainer.appendChild(createPostCard(post));
    });
    
    renderPagination(filteredBySearch.length);
}

function renderCategories() {
    const categories = ['All', ...new Set(allBlogPosts.map(post => post.category))];
    categoryFilters.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `filter-btn ${category === currentCategory ? 'active' : ''}`;
        button.textContent = category;
        button.addEventListener('click', () => {
            currentCategory = category;
            currentPage = 1;
            renderPosts();
        });
        categoryFilters.appendChild(button);
    });
}

function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    paginationContainer.innerHTML = '';
    
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                renderPosts();
            });
            paginationContainer.appendChild(button);
        }
    }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    currentPage = 1;
    renderPosts();
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderPosts();
});