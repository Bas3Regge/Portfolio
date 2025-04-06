function toggleNav() {
    const nav = document.getElementById('sidebar');
    document.body.classList.toggle('nav-collapsed');
    nav.classList.toggle('collapsed');
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  window.addEventListener('scroll', function() {

    const scrollButton = document.querySelector('.scroll-top');

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {

      scrollButton.classList.add('visible');

    } else {

      scrollButton.classList.remove('visible');

    }

  });