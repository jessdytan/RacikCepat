import BerandaPage from './pages/beranda-page.js';
import EksplorasiPage from './pages/eksplorasi-page.js';
import RekomendasiPage from './pages/rekomendasi-page.js';
import ResepPage from './pages/resep-page.js';
import TersimpanPage from './pages/tersimpan-page.js';
import ProfilePage from './pages/profile-page.js';
import LoginPage from './pages/login-page.js';
import RegisterPage from './pages/daftar-page.js';
import PremiumPage from './pages/premium-page.js'; 

const routes = {
  '/': BerandaPage,
  '/eksplorasi': EksplorasiPage,
  '/rekomendasi': RekomendasiPage,
  '/resep': ResepPage,
  '/tersimpan': TersimpanPage,
  '/profil': ProfilePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/premium': PremiumPage, 
};

const renderPage = async () => {
  const hash = window.location.hash.slice(1).toLowerCase() || '/';
  const page = routes[hash] || BerandaPage;
  
  // Close mobile menu when navigating
  if (window.closeMenu) {
    window.closeMenu();
  }
  
  document.getElementById('app').innerHTML = await page.render();
  if (page.afterRender) page.afterRender();
  
  // Update active navigation
  updateActiveNav(hash);
};

// Update active navigation state
const updateActiveNav = (currentPath) => {
  // Remove active class from all nav links
  const allNavLinks = document.querySelectorAll('nav a');
  allNavLinks.forEach(link => link.classList.remove('active'));
  
  // Add active class to current page link
  const activeLinks = document.querySelectorAll(`nav a[href="#${currentPath}"]`);
  activeLinks.forEach(link => link.classList.add('active'));
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);