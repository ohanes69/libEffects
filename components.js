// Animated list
const items = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
  ];
  
  let selectedIndex = -1;
  let keyboardNav = false;
  let topGradientOpacity = 0;
  let bottomGradientOpacity = 1;
  
  const listContainer = document.getElementById('list');
  const topGradient = document.getElementById('top-gradient');
  const bottomGradient = document.getElementById('bottom-gradient');
  
  // Create the animated list
  items.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'mb-4 cursor-pointer';
    itemElement.dataset.index = index;
    itemElement.innerHTML = `
      <div class="p-4 bg-blue-200 rounded-lg ${selectedIndex === index ? 'bg-blue-200' : ''}">
        <p class="m-0">${item}</p>
      </div>
    `;
  
    itemElement.addEventListener('mouseenter', () => {
      selectedIndex = index;
      updateList();
    });
  
    itemElement.addEventListener('click', () => {
      selectedIndex = index;
      alert('Item clicked: ' + item);
      updateList();
    });
  
    listContainer.appendChild(itemElement);
  });
  
  // Update the list (highlight selected item)
  function updateList() {
    const items = document.querySelectorAll('[data-index]');
    items.forEach((item, index) => {
      item.querySelector('div').classList.toggle('bg-blue-300', selectedIndex === index);
    });
  }
  
  // Handle scrolling
  listContainer.addEventListener('scroll', (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    topGradientOpacity = Math.min(scrollTop / 50, 1);
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    bottomGradientOpacity = scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1);
  
    topGradient.style.opacity = topGradientOpacity;
    bottomGradient.style.opacity = bottomGradientOpacity;
  });
  
  // Handle keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      keyboardNav = true;
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      keyboardNav = true;
      selectedIndex = Math.max(selectedIndex - 1, 0);
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        alert('Item selected: ' + items[selectedIndex]);
      }
    }
  
    updateList();
  });

  
  // Animate icons

  const icons = [
    { label: "Home", icon: "🏠" },
    { label: "Search", icon: "🔍" },
    { label: "Settings", icon: "⚙️" },
    { label: "Profile", icon: "👤" },
    { label: "Logout", icon: "🚪" },
  ];
  
  const dock = document.getElementById("dock");
  
  icons.forEach(({ label, icon }) => {
    const wrapper = document.createElement("div");
    wrapper.className = "relative flex flex-col items-center justify-end";
  
    const iconBtn = document.createElement("button");
    iconBtn.className =
      "dock-icon w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#060606] border-2 border-neutral-700 text-2xl shadow-md transition-transform duration-200 ease-in-out";
    iconBtn.innerText = icon;
  
    const tooltip = document.createElement("div");
    tooltip.className =
      "dock-label absolute -top-6 left-1/2 -translate-x-1/2 bg-[#060606] border border-neutral-700 text-white text-xs px-2 py-0.5 rounded-md opacity-0 pointer-events-none";
    tooltip.innerText = label;
  
    wrapper.appendChild(tooltip);
    wrapper.appendChild(iconBtn);
    dock.appendChild(wrapper);
  
    iconBtn.addEventListener("mouseenter", () => {
      iconBtn.style.transform = "scale(1.2)";
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translate(-50%, -10px)";
    });
  
    iconBtn.addEventListener("mouseleave", () => {
      iconBtn.style.transform = "scale(1)";
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translate(-50%, 0px)";
    });
  });


  // Animate img | Mansory

  const masonryItems = [
    { id: 1, image: 'IMG_8840.JPG', height: 300 },
    { id: 2, image: 'IMG_8840.JPG', height: 200 },
    { id: 3, image: 'IMG_8839.JPG', height: 250 },
    { id: 4, image: 'IMG_8839.JPG', height: 180 },
    { id: 5, image: 'IMG_8839.JPG', height: 270 },
    { id: 6, image: 'IMG_8840.JPG', height: 220 },
  ];

  const container = document.getElementById('horizontal-masonry');

  masonryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'w-[200px] rounded-lg bg-cover bg-center transition-transform duration-300 hover:scale-110 shadow-md';
    card.style.height = `${item.height}px`;
    card.style.backgroundImage = `url(${item.image})`;
    container.appendChild(card);
  });


  // Carrousel img

    const carousel = document.getElementById('carousel');
        const slideWidth = carousel.offsetWidth;
  
        function scrollToSlide(index) {
          carousel.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
          });
        }

        const buttonCarrousel1 = document.getElementById('buttonCarrousel1');
        const buttonCarrousel2 = document.getElementById('buttonCarrousel2');
        
        buttonCarrousel1.addEventListener('click', () => {
          buttonCarrousel1.classList.replace('bg-white/60', 'bg-white');
          buttonCarrousel2.classList.replace('bg-white', 'bg-white/60');
        });
        
        buttonCarrousel2.addEventListener('click', () => {
          buttonCarrousel2.classList.replace('bg-white/60', 'bg-white');
          buttonCarrousel1.classList.replace('bg-white', 'bg-white/60');
        });

        let currentIndex = 0; // 0 pour la première image, 1 pour la deuxième

  function updateButtons(index) {
    if (index === 0) {
      buttonCarrousel1.classList.replace('bg-white/60', 'bg-white');
      buttonCarrousel2.classList.replace('bg-white', 'bg-white/60');
    } else {
      buttonCarrousel2.classList.replace('bg-white/60', 'bg-white');
      buttonCarrousel1.classList.replace('bg-white', 'bg-white/60');
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % 2;
      updateButtons(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + 2) % 2;
      updateButtons(currentIndex);
    }
  });



  // Card color pointer

      const card = document.getElementById('spotlight-card');
      const overlay = document.getElementById('spotlight-overlay');
      let isFocused = false;
      const spotlightColor = 'rgba(147, 197, 253, 1)';
  
      card.addEventListener('mousemove', (e) => {
        if (isFocused) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
      });
  
      const showOverlay = () => {
        overlay.style.opacity = 0.6;
      };
  
      const hideOverlay = () => {
        overlay.style.opacity = 0;
      };
  
      card.addEventListener('mouseenter', showOverlay);
      card.addEventListener('mouseleave', hideOverlay);
  
      card.addEventListener('focus', () => {
        isFocused = true;
        showOverlay();
      });
  
      card.addEventListener('blur', () => {
        isFocused = false;
        hideOverlay();
      });