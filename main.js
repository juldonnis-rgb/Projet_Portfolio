const btn = document.querySelector('.send-trigger');
const contactForm = document.querySelector('.user-inquiry-form');

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    btn.innerText = 'Envoi en cours...';
    btn.disabled = true; 

    // On récupère les données du formulaire
    const data = new FormData(event.target);

    try {
        const response = await fetch("https://formspree.io/f/xkopyvea", {
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
            
            // On affiche le message de succès HTML s'il existe
            const successMsg = document.querySelector('[data-fs-success]');
            if(successMsg) successMsg.style.display = 'block';

            setTimeout(() => {
                btn.innerText = 'Envoyez';
                btn.disabled = false;
                if(successMsg) successMsg.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Erreur serveur');
        }
    } catch (error) {
        btn.innerText = 'Erreur d\'envoi ❌';
        btn.disabled = false;
        
        const errorMsg = document.querySelector('[data-fs-error]');
        if(errorMsg) errorMsg.style.display = 'block';
        
        alert("Oups ! Un problème est survenu lors de l'envoi.");
    }
});