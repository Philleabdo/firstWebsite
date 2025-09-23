const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});

const form = document.getElementById('kontaktForm');
const MAX_ORD = 100;

if(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const namn = document.getElementById('namn').value.trim();
        const email = document.getElementById('email').value.trim();
        const kontakt = document.getElementById('kontaktperson').value;
        const ämne = document.getElementById('ämne').value.trim();
        const meddelande = document.getElementById('meddelande').value.trim();

        if(!namn || !email || !kontakt || !ämne || !meddelande){
            alert("Fyll i alla fält");
            return;
        }

        if (!email.includes("@")){
            alert("E-post måste inehålla @");
            return;
        }

        const ord = meddelande.split(/\s+/).filter(Boolean).length;
        if(ord > MAX_ORD){
            alert('Meddelandet är för långt ( ' + MAX_ORD + ' ord)');
            return;
        }

        const body = "Avsändare: " + namn + " <" + email + ">\n\n" + meddelande;
        const subject = ämne;
        const mailto = "mailto:" + kontakt + "?subject=" + subject + "&body=" + body;

        window.location.href = mailto;
        form.reset();
    });
}





const bilder = [
    "Lebron1.jpg",
    "Lebron4.jpg",
    "Lebron5.jpg"
];

let index = 0;
const slide = document.getElementById("slide");

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % bilder.length;
    console.log("Next klickad, index=", index, "bild =", bilder [index]);
    slide.src = bilder[index];
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + bilder.length) % bilder.length;
    console.log("Prev klickad, index=", index, "bild =", bilder [index]);
    slide.src = bilder[index];
});

window.addEventListener("scroll", () => {
    const skills = document.querySelectorAll(".skill-fill");
    skills.forEach (bar => {
        const barPos = bar.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        if (barPos < winHeight) {
            const percent = bar.getAttribute("data-percent");
            bar.style.width = percent + "%";
        }
    });
});

