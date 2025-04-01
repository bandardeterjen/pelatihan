document.addEventListener('DOMContentLoaded', () => {
  const userEmailInput = document.getElementById('user-email');
  const generateLinksButton = document.getElementById('generate-links');
  const articleContainer = document.getElementById('article-container');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  // Sample articles data
  const articles = [
    { title: 'Resep Sabun Lengkap', 
     description: 'Tingkatkan keahlian Anda dalam membuat sabun dengan kumpulan resep sabun teruji yang kami tawarkan. Pelajari cara membuat berbagai jenis sabun, dari sabun laundry ekonomis hingga sabun pembersih kamar mandi premium, dengan hanya Rp 99.000', 
     productUrl: 'https://ratakan.com/product/resep-sabun-lengkap-955' },
    { title: 'Mastering Digital Marketing', 
     description: 'Learn how to grow your business online with proven strategies...', 
     productUrl: 'https://ratakan.com/product/digital-marketing-101' },
    { title: 'The Art of Photography', 
     description: 'Explore techniques to capture stunning photos...', 
     productUrl: 'https://ratakan.com/product/photography-course' },
    { title: 'Cooking Like a Pro', 
     description: 'Step-by-step guide to becoming a master chef...', 
     productUrl: 'https://ratakan.com/product/cooking-class' },
    { title: 'Gardening for Beginners', 
     description: 'Start your own garden with these easy tips...', 
     productUrl: 'https://ratakan.com/product/gardening-guide' },
    { title: 'Advanced Yoga Techniques', 
     description: 'Deepen your practice with advanced yoga poses...', 
     productUrl: 'https://ratakan.com/product/yoga-course' },
    { title: 'Writing Your First Novel', 
     description: 'Turn your ideas into a bestselling book...', 
     productUrl: 'https://ratakan.com/product/writing-course' },
  ];

  const itemsPerPage = 5;
  let currentPage = 1;
  let isValidEmail = false;

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
        <a href="#" class="product-link" data-product-url="${article.productUrl}">${isValidEmail ? 'Klik Produk' : 'Dapatkan Produk'}</a>
        <div class="share-buttons">
          <button class="share-whatsapp" data-product-url="${article.productUrl}">Share ke WhatsApp</button>
          <button class="share-facebook facebook" data-product-url="${article.productUrl}">Share ke Facebook</button>
        </div>
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
    attachShareLinkHandlers();

    // Show or hide share buttons based on email validation
    toggleShareButtons();
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

  // Attach share link handlers to dynamically generated buttons
  function attachShareLinkHandlers() {
    const whatsappButtons = document.querySelectorAll('.share-whatsapp');
    const facebookButtons = document.querySelectorAll('.share-facebook');

    whatsappButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productUrl = button.getAttribute('data-product-url');
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
        const referralUrl = `${productUrl}?aff=${encodeURIComponent(userEmail)}`;
        const whatsappUrl = `https://wa.me/?text=Check out prdouk ini: ${encodeURIComponent(referralUrl)}`;
        window.open(whatsappUrl, '_blank');
      });
    });

    facebookButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productUrl = button.getAttribute('data-product-url');
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
        const referralUrl = `${productUrl}?aff=${encodeURIComponent(userEmail)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`;
        window.open(facebookUrl, '_blank');
      });
    });
  }

  // Toggle visibility of share buttons based on email validation
  function toggleShareButtons() {
    const shareButtons = document.querySelectorAll('.share-buttons');
    shareButtons.forEach(buttonGroup => {
      buttonGroup.style.display = isValidEmail ? 'block' : 'none';
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
    isValidEmail = true;
    renderArticles(); // Re-render articles to update button text and show share buttons
    alert('Your referral links have been updated!');
  });

  // Initial render
  renderArticles();
});
