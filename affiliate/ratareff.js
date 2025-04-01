import articles from './ratapost.js';

document.addEventListener('DOMContentLoaded', () => {
  const userEmailInput = document.getElementById('user-email');
  const generateLinksButton = document.getElementById('generate-links');
  const articleContainer = document.getElementById('article-container');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  const itemsPerPage = 5;
  let currentPage = 1;

  // Function to render articles for the current page
  function renderArticles() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentArticles = articles.slice(start, end);

    // Clear previous articles
    articleContainer.innerHTML = '';

    // Render current articles
    currentArticles.forEach(article => {
      const articleElement = document.createElement('article');
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="#" class="product-link" data-product-url="${article.productUrl}">Get the Product</a>
      `;
      articleContainer.appendChild(articleElement);
    });

    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(articles.length / itemsPerPage)}`;

    // Enable/disable buttons based on current page
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(articles.length / itemsPerPage);

    // Reattach referral link functionality
    attachReferralLinkHandlers();
  }

  // Attach referral link handlers to dynamically generated links
  function attachReferralLinkHandlers() {
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const userEmail = userEmailInput.value.trim();
        if (!userEmail) {
          alert('Please enter your email address.');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
          alert('Please enter a valid email address.');
          return;
        }
        const productUrl = link.getAttribute('data-product-url');
        const referralUrl = `${productUrl}?aff=${encodeURIComponent(userEmail)}`;
        window.open(referralUrl, '_blank');
      });
    });
  }

  // Pagination event listeners
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderArticles();
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(articles.length / itemsPerPage)) {
      currentPage++;
      renderArticles();
    }
  });

  // Generate referral links button
  generateLinksButton.addEventListener('click', () => {
    const userEmail = userEmailInput.value.trim();
    if (!userEmail) {
      alert('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('Your referral links have been updated!');
  });

  // Initial render
  renderArticles();
});
