const btn = document.querySelector('.send-trigger');
const contactForm = document.querySelector('.user-inquiry-form');

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // On empêche le rechargement

    btn.innerText = 'Envoi en cours...';
    btn.disabled = true; // On évite les doubles clics

    // On récupère les données du formulaire
    const data = new FormData(event.target);

    // On envoie à Formspree
    try {
        const response = await fetch("https://formspree.io/f/xkopyvea", { // <--- METS TON ID ICI
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Succès !
            btn.innerText = 'Message envoyé ! ✅';
            contactForm.reset();
            setTimeout(() => {
                btn.innerText = 'Envoyez';
                btn.disabled = false;
            }, 3000);
        } else {
            // Erreur serveur
            throw new Error('Erreur serveur');
        }
    } catch (error) {
        // Erreur réseau
        btn.innerText = 'Erreur d\'envoi ❌';
        btn.disabled = false;
        alert("Oups ! Un problème est survenu. Vérifie ta connexion.");
    }
});