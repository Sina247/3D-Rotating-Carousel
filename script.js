const IMAGES = [
  {
    src: 'images/1.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    name: 'استریت‌ور',
    title: 'فیگور استریت‌ور',
    desc: 'پسر با لباس نارنجی و جزئیات دقیق. بافت پارچه واقعی، مناسب کلکسیون و هدیه.',
  },
  {
    src: 'images/2.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    name: 'دختر شاد',
    title: 'فیگور دختر شاد',
    desc: 'دخترک با ژست پرانرژی و لباس سبز. رنگ‌های زنده، چهره‌ای شاد و دوست‌داشتنی.',
  },
  {
    src: 'images/3.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    name: 'پسر پرشور',
    title: 'فیگور پسر پرشور',
    desc: 'پسر با کلاه و لباس پفکی صورتی. حس شادی و انرژی، جزئیات نرم و باکیفیت.',
  },
  {
    src: 'images/4.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    name: 'پسر باحال',
    title: 'فیگور پسر باحال',
    desc: 'پسر با عینک و لباس آبی. طراحی مدرن و باکلاس، آماده نمایش روی قفسه.',
  },
];

IMAGES.forEach(d => { const img = new Image(); img.src = d.src; });

const grainSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.08'/></svg>`;
document.getElementById('grain').style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(grainSvg)}")`;

let activeIndex = 0;
let isAnimating = false;
let isMobile = window.innerWidth < 640;

window.addEventListener('resize', () => { isMobile = window.innerWidth < 640; applyRoles(); });

const carousel = document.getElementById('carousel');
const items = IMAGES.map((d, i) => {
  const el = document.createElement('div');
  el.className = 'carousel-item';
  const img = document.createElement('img');
  img.src = d.src;
  img.draggable = false;
  img.alt = d.name;
  el.appendChild(img);
  carousel.appendChild(el);
  return el;
});

function getRoles() {
  return {
    center: activeIndex,
    left: (activeIndex + 3) % 4,
    right: (activeIndex + 1) % 4,
    back: (activeIndex + 2) % 4,
  };
}

function applyRoles() {
  const { center, left, right, back } = getRoles();
  const sideLeft = isMobile ? '20%' : '30%';
  const sideRight = isMobile ? '80%' : '70%';

  items.forEach((el, i) => {
    let style = {};

    if (i === center) {
      style = {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: '1',
        zIndex: '20',
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0',
      };
    }

    else if (i === left) {
      style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: '0.85',
        zIndex: '10',
        left: sideRight,
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }

    else if (i === right) {
      style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: '0.85',
        zIndex: '10',
        left: sideLeft,
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }

    else {
      style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: '1',
        zIndex: '5',
        left: '50%',
        height: isMobile ? '13%' : '22%',
        bottom: isMobile ? '32%' : '12%',
      };
    }
    Object.assign(el.style, style);
  });

  document.getElementById('app').style.backgroundColor = IMAGES[activeIndex].bg;
  document.getElementById('product-title').textContent = IMAGES[activeIndex].title;
  document.getElementById('product-desc').textContent = IMAGES[activeIndex].desc;
}

function navigate(dir) {
  if (isAnimating) return;
  isAnimating = true;

  if (dir === 'next') {
    activeIndex = (activeIndex + 1) % 4;
  }

  else {
    activeIndex = (activeIndex + 3) % 4;
  }

  applyRoles();
  setTimeout(() => { isAnimating = false; }, 650);
}

document.getElementById('btn-prev').addEventListener('click', () => navigate('prev'));
document.getElementById('btn-next').addEventListener('click', () => navigate('next'));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') navigate('next');
  if (e.key === 'ArrowRight') navigate('prev');
});

applyRoles();
