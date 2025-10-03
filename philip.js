//bild som visas
let slideIndex = 1;
showSlides(slideIndex);

//bläddra framåt/bakåt
function plusSlides(n) {
  showSlides(slideIndex += n);
}
//hoppa till en specifik bild
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  //Dölj alla bilder först.
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  //ta bort och markera rätt active
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Basketboll-animation (ej på mobiler)
window.addEventListener("scroll", () => {
  const basketball = document.getElementById("basketball");
  const main = document.querySelector("main");
  const mainTop = main.offsetTop;
  const scrollPos = window.scrollY + window.innerHeight;

  // Kolla skärmstorlek
  if (window.innerWidth > 900) {
    if (scrollPos > mainTop + 100 && basketball.style.display !== "block") {
      basketball.style.display = "block";
      basketball.style.animation = "bounce 2s linear infinite"; 

      // stoppa animationen + göm bollen efter 10 sekunder
      setTimeout(() => {
        basketball.style.animation = "none";
        basketball.style.display = "none";
      }, 2000);
    }
  } else {
    // säkerställ att bollen är dold på små skärmar
    basketball.style.display = "none";
    basketball.style.animation = "none";
  }
});

//Animerade skillbars varje gång
const skillBox = document.getElementById("skill-box");
const skillBars = skillBox.querySelectorAll(".skills");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const skillWidth = bar.classList.contains("webb") ? 80 :
                           bar.classList.contains("media") ? 70 :
                           bar.classList.contains("kom") ? 95 : 0;

        // Återställ till 0 först för att trigga animation varje gång
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = skillWidth + "%";
        }, 100); 
      });
    } else {
      // När man lämnar viewport -> återställ till 0
      skillBars.forEach(bar => {
        bar.style.width = "0";
      });
    }
  });
}, { threshold: 0.5 });

skillObserver.observe(skillBox);