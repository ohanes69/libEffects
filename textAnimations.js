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
