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
  currentIndex = 0;
  scrollToSlide(currentIndex);
  updateButtons(currentIndex);
});

buttonCarrousel2.addEventListener('click', () => {
  currentIndex = 1;
  scrollToSlide(currentIndex);
  updateButtons(currentIndex);
});

let currentIndex = 0;

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
    scrollToSlide(currentIndex);
    updateButtons(currentIndex);
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + 2) % 2;
    scrollToSlide(currentIndex);
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



      // Glass icon

      const gradientMapping = {
        blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
        purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
        red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
        indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
        orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
        green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
      };
  
      const items3 = [
        { label: "Home", icon: "🏠", color: "blue" },
        { label: "Search", icon: "🔍", color: "purple" },
        { label: "Favorite", icon: "❤️", color: "red" },
        { label: "Profile", icon: "👤", color: "indigo" },
        { label: "Settings", icon: "⚙️", color: "orange" },
        { label: "Check", icon: "✅", color: "green" },
      ];
  
      const container3 = document.getElementById("glass-icons");
  
      items3.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", item.label);
        button.className = `icon-button relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group`;
  
        const backLayer = document.createElement("span");
        backLayer.className = "back-layer absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]";
        backLayer.style.background = gradientMapping[item.color] || item.color;
  
        const frontLayer = document.createElement("span");
        frontLayer.className = "front-layer absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] group-hover:[transform:translateZ(2em)]";
  
        const iconSpan = document.createElement("span");
        iconSpan.className = "m-auto w-[1.5em] h-[1.5em] flex items-center justify-center";
        iconSpan.innerText = item.icon;
  
        frontLayer.appendChild(iconSpan);
  
        const label = document.createElement("span");
        label.className = "absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]";
        label.innerText = item.label;
  
        button.appendChild(backLayer);
        button.appendChild(frontLayer);
        button.appendChild(label);
  
        container3.appendChild(button);
      });



      //

      const slider = document.getElementById("slider");
      const sliderFill = document.getElementById("sliderFill");
      const sliderValue = document.getElementById("sliderValue");
      const leftIcon = document.getElementById("leftIcon");
      const rightIcon = document.getElementById("rightIcon");

      const minValue = 0;
      const maxValue = 100;
      const step = 1;
      let value = 50;

      function updateSlider(val) {
        value = Math.min(maxValue, Math.max(minValue, val));
        const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
        sliderFill.style.width = `${percentage}%`;
        sliderValue.textContent = Math.round(value);
      }

      function handlePointerMove(e) {
        const rect = slider.getBoundingClientRect();
        let newValue =
          ((e.clientX - rect.left) / rect.width) * (maxValue - minValue) +
          minValue;

        newValue = Math.round(newValue / step) * step;
        updateSlider(newValue);
      }

      slider.addEventListener("pointerdown", (e) => {
        handlePointerMove(e);
        const moveListener = (ev) => handlePointerMove(ev);
        const upListener = () => {
          window.removeEventListener("pointermove", moveListener);
          window.removeEventListener("pointerup", upListener);
        };
        window.addEventListener("pointermove", moveListener);
        window.addEventListener("pointerup", upListener);
      });

      leftIcon.addEventListener("click", () => updateSlider(value - step));
      rightIcon.addEventListener("click", () => updateSlider(value + step));



      // Rolling Gallery

      const IMGS = [
        "IMG_8840.JPG",
        "IMG_8839.JPG",
        "IMG_8840.JPG",
        "IMG_8839.JPG",
        "IMG_8840.JPG",
        "IMG_8839.JPG",
        "IMG_8840.JPG",
        "IMG_8839.JPG",
        "IMG_8840.JPG",
        "IMG_8839.JPG",
      ];
      
      const container5 = document.getElementById("gallery-container");
      const cylinder = document.getElementById("cylinder");
      
      let autoplay = true;
      let rotation = 0;
      let isDragging = false;
      let dragStartX = 0;
      let isScreenSm = window.innerWidth <= 640;
      
      function updateSize() {
        isScreenSm = window.innerWidth <= 640;
        draw();
      }
      
      window.addEventListener("resize", updateSize);
      
      function draw() {
        const cylinderWidth = isScreenSm ? 1500 : 2400;
        const faceCount = IMGS.length;
        const faceWidth = (cylinderWidth / faceCount) * 1.5;
        const radius = cylinderWidth / (2 * Math.PI);
      
        cylinder.innerHTML = "";
      
        IMGS.forEach((url, i) => {
          const div = document.createElement("div");
          div.className =
            "group absolute flex items-center justify-center p-[8%] md:p-[6%] [backface-visibility:hidden]";
          div.style.width = `${faceWidth}px`;
          div.style.transform = `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`;
      
          const img = document.createElement("img");
          img.src = url;
          img.alt = "gallery";
          img.className =
            "pointer-events-auto h-[300px] w-[180px] rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[240px] sm:w-[180px]";
      
          // Ajoute les événements sur chaque image
          img.addEventListener("mouseenter", () => {
            autoplay = false;
          });
      
          img.addEventListener("mouseleave", () => {
            autoplay = true;
          });
      
          div.appendChild(img);
          cylinder.appendChild(div);
        });
      
        cylinder.style.width = `${cylinderWidth}px`;
      }
      
      function animate() {
        if (!isDragging && autoplay) {
          rotation -= 0.1;
        }
      
        cylinder.style.transform = `rotateY(${rotation}deg)`;
        requestAnimationFrame(animate);
      }
      
      cylinder.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragStartX = e.clientX;
      });
      
      window.addEventListener("mouseup", () => {
        isDragging = false;
      });
      
      window.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const deltaX = e.clientX - dragStartX;
          rotation += deltaX * 0.05;
          dragStartX = e.clientX;
        }
      });
      
      // Supprime les anciens mouseenter/mouseleave du conteneur
      // Ils ne sont plus nécessaires car on gère ça par image
      
      draw();
      animate();

      