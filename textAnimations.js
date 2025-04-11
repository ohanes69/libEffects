// Text Split
document.addEventListener("DOMContentLoaded", function () {
    const text = "Animation fluide";
    const animatedText = document.getElementById("animatedText");
    
    animatedText.innerHTML = text
        .split(" ")
        .map(word => `<span class='inline-block whitespace-nowrap'>${[...word].map(letter => `<span class='letter inline-block'>${letter}</span>`).join("")}&nbsp;</span>`)
        .join(" ");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatedText.classList.add("visible");
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(animatedText);

    document.querySelectorAll(".letter").forEach((letter, index) => {
        letter.style.transitionDelay = `${index * 50}ms`;
    });
});


// Text Blur
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("blurText");
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                textElement.classList.add("visible");
                observer.unobserve(textElement);
            }
        },
        { threshold: 0.3 }
    );
    observer.observe(textElement);
});


// Text Hidden
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("falling-text");
    const text = container.textContent;

    // Supprimer le texte initial
    container.innerHTML = "";

    // Diviser le texte en mots
    const words = text.split(" ");

    // Appliquer l'animation sur chaque mot avec un délai
    words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word;
      wordSpan.classList.add("falling-word");
      wordSpan.style.animationDelay = `${index * 0.1}s`; // Décalage de l'animation pour chaque mot
      container.appendChild(wordSpan);
      container.appendChild(document.createTextNode(" ")); // Ajouter un espace entre les mots
    });
  });


// Text Focus
  document.addEventListener("DOMContentLoaded", () => {
    const sentence = "True Focus";
    const blurAmount = 3;
    const borderColor = "green";
    const glowColor = "rgba(0, 255, 0, 0.6)";
    const animationDuration = 0.5;
    const pauseBetweenAnimations = 1;

    const words = sentence.split(" ");
    const container = document.getElementById("true-focus-container");
    const textContainer = document.getElementById("true-focus-text");
    const focusBox = document.getElementById("focus-box");

    // Créer les mots dynamiquement et les ajouter au DOM
    words.forEach((word, index) => {
      const wordElement = document.createElement("span");
      wordElement.textContent = word;
      wordElement.classList.add("word", "cursor-pointer", "relative", "transition-all");
      wordElement.style.filter = `blur(${blurAmount}px)`;
      wordElement.dataset.index = index;
      wordElement.addEventListener("mouseenter", () => handleMouseEnter(index));
      wordElement.addEventListener("mouseleave", () => handleMouseLeave(index));
      textContainer.appendChild(wordElement);
      textContainer.appendChild(document.createTextNode(" ")); // Espacement entre les mots
    });

    let currentIndex = 0;
    let lastActiveIndex = null;

    // Animation automatique des mots
    setInterval(() => {
      if (currentIndex < words.length) {
        updateFocus(currentIndex);
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    // Fonction pour gérer l'entrée de la souris sur un mot
    function handleMouseEnter(index) {
      lastActiveIndex = currentIndex;
      currentIndex = index;
      updateFocus(index);
    }

    // Fonction pour gérer la sortie de la souris
    function handleMouseLeave() {
      currentIndex = lastActiveIndex;
      updateFocus(currentIndex);
    }

    // Mettre à jour le focus et l'animation du mot actif
    function updateFocus(index) {
      const wordElements = document.querySelectorAll(".word");
      const activeWord = wordElements[index];
      const wordRect = activeWord.getBoundingClientRect();

      // Calculer la position du focus et appliquer les styles
      focusBox.style.left = `${wordRect.left}px`;
      focusBox.style.top = `${wordRect.top}px`;
      focusBox.style.width = `${wordRect.width}px`;
      focusBox.style.height = `${wordRect.height}px`;
      focusBox.style.borderColor = borderColor;
      focusBox.style.animation = `focusAnimation ${animationDuration}s ease`;

      // Appliquer le flou au mot actif
      wordElements.forEach((word, i) => {
        if (i === index) {
          word.style.filter = `blur(0px)`;
          word.classList.add("glow", "focused-text"); // Ajouter padding avec la classe
        } else {
          word.style.filter = `blur(${blurAmount}px)`;
          word.classList.remove("glow", "focused-text");
        }
      });
    }
  });


// Rotating Text
  document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".text-rotate-word");
    let currentIndex = 0;
    
    function rotateText() {
        texts[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % texts.length;
        texts[currentIndex].classList.add("active");
    }
    
    setInterval(rotateText, 2000);
});

// Scrool Speed
document.addEventListener("DOMContentLoaded", function () {
  const scroller = document.querySelector(".scroller");
  let position = 0;
  let speed = 3; // Pour ajuster la vitesse

  function updatePosition() {
      position -= speed;
      if (position < -scroller.scrollWidth / 2) {
          position = 0;
      }
      scroller.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(updatePosition);
  }

  updatePosition();
});


// Count
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-up");

  const animateCountUp = (el) => {
      const from = parseInt(el.getAttribute("data-from") || "0");
      const to = parseInt(el.getAttribute("data-to") || "100");
      const duration = parseFloat(el.getAttribute("data-duration") || "2");
      const direction = el.getAttribute("data-direction") || "up";
      const separator = el.getAttribute("data-separator") || "";

      let start = direction === "down" ? to : from;
      let end = direction === "down" ? from : to;

      let startTime = null;

      const formatNumber = (num) => {
          return separator ? num.toLocaleString("en-US").replace(/,/g, separator) : num;
      };

      const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          const value = Math.floor(start + (end - start) * progress);
          el.textContent = formatNumber(value);

          if (progress < 1) {
              requestAnimationFrame(step);
          }
      };

      requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              animateCountUp(entry.target);
              observer.unobserve(entry.target); // Une seule fois
          }
      });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});



// Click Spark
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("sparkCanvas");
  const ctx = canvas.getContext("2d");
  const sparkContainer = document.getElementById("sparkContainer");
  
  // Pour changer la taille, duration...
  let sparks = [];
  const sparkColor = "#fff";
  const sparkSize = 25;
  const sparkRadius = 130;
  const sparkCount = 18;
  const duration = 1.0;
  const easing = "ease-out";

  const resizeCanvas = () => {
    canvas.width = sparkContainer.clientWidth;
    canvas.height = sparkContainer.clientHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function easeFunc(t) {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  }

  function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks = sparks.filter(spark => {
      const progress = (performance.now() - spark.startTime) / (duration * 1000);
      if (progress >= 1) return false;

      const easedProgress = easeFunc(progress);
      const distance = easedProgress * sparkRadius;
      const size = sparkSize * (1 - easedProgress);

      const x = spark.x + distance * Math.cos(spark.angle);
      const y = spark.y + distance * Math.sin(spark.angle);

      ctx.fillStyle = sparkColor;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });

    requestAnimationFrame(animateSparks);
  }

  function createSparks(x, y) {
    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      });
    }
  }

  sparkContainer.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    createSparks(e.clientX - rect.left, e.clientY - rect.top);
  });

  animateSparks();
});



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
