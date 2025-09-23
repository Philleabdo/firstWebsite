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
        const ämne = document.getElementById('meddelande').value.trim();

        if(!namn || !email || !kontakt || !ämne || !meddelande){
            alert("Fyll i alla fält");
            return;
        }

        if (!email.includes("@")){
            alert("E-post måste inehålla @");
            return;
        }

        const ord = meddelande.split(/\s+/).filter(Boolean).length;
        if(ord > 100){
            alert('Meddelandet är för långt (max 100 ord)');
            return;
        }

        const body = "Avsändare: " + namn + " <" + email + ">\n\n" + meddelande;
        const subject = ämne;
        const mailto = "mailto:" + kontakt + "?subject=" + subject + "&body=" + body;

        window.location.href = mailto;
        form.reset();
    });
}