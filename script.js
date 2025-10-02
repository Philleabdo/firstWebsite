const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if(hamburger && mobileMenu){
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    });
}
const form = document.getElementById('kontaktForm');
const MAX_ORD = 100;

if(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const namn = document.getElementById('namn').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefon = document.getElementById('telefon').value.trim();
        const kontakt = document.getElementById('kontaktperson').value;
        const ämne = document.getElementById('ämne').value.trim();
        const meddelande = document.getElementById('meddelande').value.trim();

        if(!namn || !email || !kontakt || !ämne || !meddelande){
            alert("Fyll i alla fält");
            return;
        }

        if (!email.includes("@")){
            alert("E-post måste innehålla @");
            return;
        }

        if (telefon && !/^[0-9]+$/.test(telefon)) {
            alert("Telefonnummer får bara innehålla siffror");
            return;
        }

        const ord = meddelande.split(/\s+/).filter(Boolean).length;
        if(ord > MAX_ORD){
            alert('Meddelandet är för långt (max ' + MAX_ORD + ' ord)');
            return;
        }

        let body = "Avsändare: " + namn + " <" + email + ">";
        if(telefon) body += "\nTelefon: " + telefon;
        body += "\n\n" + meddelande;

        const subject = ämne;
        const mailto = "mailto:" + kontakt + "?subject=" + subject + "&body=" + body;

        window.location.href = mailto;
        form.reset();
    });
}

const bilderGalleri = [
    "jackma1.png",
    "jackma2.webp",
    "jackma3.webp"
];

let indexGalleri = 0;
const slideGalleri = document.getElementById("slide-galleri");

const nextGalleri = document.getElementById("next-galleri");
const prevGalleri = document.getElementById("prev-galleri");

if(slideGalleri && nextGalleri && prevGalleri){

    slideGalleri.src = bilderGalleri[indexGalleri];

    nextGalleri.addEventListener("click", () => {
        indexGalleri = (indexGalleri + 1) % bilderGalleri.length;
        console.log("Prev-galleri klickad, index=", indexGalleri, "bild=", bilderGalleri[indexGalleri])
        slideGalleri.src = bilderGalleri[indexGalleri];
    });

    prevGalleri.addEventListener("click", () => {
        indexGalleri = (indexGalleri - 1 + bilderGalleri.length) % bilderGalleri.length;
        console.log("Prev-galleri klickad, index=", indexGalleri, "bild =", bilderGalleri [indexGalleri]);
        slideGalleri.src = bilderGalleri[indexGalleri];
    });
}

const bilder = [
    "Lebron1.jpg",
    "Lebron4.jpg",
    "Lebron5.jpg"
];

let index = 0;
const slide = document.getElementById("slide");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

if(slide && nextBtn && prevBtn){
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % bilder.length;
        console.log("Next klickad, index=", index, "bild=", bilder [index]);
        slide.src = bilder[index];
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + bilder.length) % bilder.length;
        console.log("Prev klickad, index=", index, "bild =", bilder [index]);
        slide.src = bilder[index];
    });
}

window.addEventListener("scroll", () => {
  const skills = document.querySelectorAll(".skill-fill");

  skills.forEach(bar => {
    const barPos = bar.getBoundingClientRect().top;
    const winHeight = window.innerHeight;

    if (barPos < winHeight && !bar.dataset.animated) {
      const percent = parseInt(bar.getAttribute("data-percent"));
      bar.style.width = percent + "%";

      // 🔹 Procenttext
      let start = 0;
      const textEl = bar.querySelector(".percent-text");
      if (textEl) {
        const interval = setInterval(() => {
          if (start >= percent) {
            clearInterval(interval);
          } else {
            start++;
            textEl.textContent = start + "%";
          }
        }, 20);
      }

      bar.dataset.animated = "true"; // hindrar att den körs flera gånger
    }

    // Om du vill att den ska resetas när man scrollar bort den:
    if (barPos >= winHeight) {
      bar.style.width = "0%";
      const textEl = bar.querySelector(".percent-text");
      if (textEl) textEl.textContent = "0%";
      bar.dataset.animated = ""; // tillåter att den körs igen
    }
  });
});


window.addEventListener("scroll", () => {
    const skills = document.querySelectorAll(".fyllnad");
    skills.forEach (bar => {
        const barPos = bar.getBoundingClientRect().top;
        const winHeight = window.innerHeight;

        if (barPos < winHeight && !bar.dataset.animated) {
            const percent = bar.getAttribute("data-fyllnad");
            bar.style.width = percent + "%";
            bar.dataset.animated = "true";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('proj-list');
    const qEl = document.getElementById('proj-q');
    const sortEl = document.getElementById('proj-sort');
    if(!list) return;

    let items = [];

    axios.get('./data.json').then(({data}) => {
        items = data.projects || [];
        view();
    }).catch(() => {
        list.innerHTML = '<li>Kunde inte läsa projects.json</li>';
    });

    function view(){
        const q = (qEl?.value || '').toLowerCase().trim();

        let v = items.filter(p =>
        (p.title + p.customer + (p.category || '')).toLowerCase().includes(q)
        );

    switch (sortEl?.value) {
        case 'date-asc': v.sort((a,b)=> a.date.localeCompare(b.date)); break;
        case 'date-desc': v.sort((a,b)=> b.date.localeCompare(a.date)); break;
        case 'title-asc': v.sort((a,b)=> a.title.localeCompare(b.title)); break;
        case 'title-desc': v.sort((a,b)=> b.title.localeCompare(a.title)); break;
        default:           v.sort((a,b)=> b.date.localeCompare(a.date));
    }

    list.innerHTML = v.map(p => `
        <li class="proj-item">
            <h3>${p.title}</h3>
            <p><strong>Kund:</strong> ${p.customer} · <strong>Datum:</strong> ${p.date}</p>
            <p>${p.description}</p>
        </li>
        `).join('');
    }
    qEl?.addEventListener('input', view);
    sortEl?.addEventListener('change', view);
    });





