// Funzione per mostrare una sezione specifica e nascondere le altre
function mostraSezione(sezioneID) {
    document.querySelectorAll('.block').forEach(block => block.classList.add('hidden'));
    document.getElementById(sezioneID).classList.remove('hidden');
}

// Funzioni per navigare tra le sezioni
function goToIntro() {
    mostraSezione('intro');
}

function goToGiorno1() {
    mostraSezione('giorno1');
}

function goToGiorno2() {
    mostraSezione('giorno2');
}

function goToRiepilogo() {
    mostraSezione('riepilogo');
    aggiornaRiepilogo();
}

// Funzione per il bottone "Ricomincia" che riporta alla pagina principale
function ricomincia() {
    mostraSezione('intro'); // Torna alla pagina iniziale (intro)
    // Se hai bisogno di resettare la selezione dei checkbox, puoi farlo qui
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Se desideri nascondere anche il riepilogo totale, puoi farlo qui:
    document.getElementById('totaleCosto').classList.add('hidden');
    // Puoi anche resettare i contenuti nel riepilogo
    document.getElementById('costi').innerHTML = '';
}

// Funzione per aggiornare il riepilogo e calcolare automaticamente il totale
function aggiornaRiepilogo() {
    const costiAttivita = {
        giorno1: {
            duomo: { descrizione: "Visita Duomo", costo: 32 },
            parco: { descrizione: "Parco divertimenti Leolandia", costo: 30 },
            festa: { descrizione: "Festa al Gattopardo Milano", costo: 20 },
            cinema: { descrizione: "Cinema Centrale Milano", costo: 10 }
        },
        giorno2: {
            basilica: { descrizione: "Visita Basilica Palladiana", costo: 24 },
            teatro: { descrizione: "Visita Teatro Olimpico", costo: 20 },
            aperitivo1: { descrizione: "Aperitivo in Piazza dei Signori", costo: 25 },
            aperitivo2: { descrizione: "Aperitivo e Passeggiata Parco Querini", costo: 15 }
        }
    };

    let riepilogoHTML = '';
    Object.entries(costiAttivita).forEach(([giorno, attivita]) => {
        const attivitaSelezionate = Object.entries(attivita)
            .filter(([id]) => document.getElementById(id).checked)
            .map(([_, dettagli]) => dettagli);

        if (attivitaSelezionate.length > 0) {
            riepilogoHTML += `<h3>${giorno.charAt(0).toUpperCase() + giorno.slice(1)}</h3>`;
            riepilogoHTML += `<ul>${attivitaSelezionate.map(att => `<li>${att.descrizione}: €${att.costo}</li>`).join('')}</ul>`;
        }
    });

    const costoFissoViaggio = 85;
    const costoFissoHotel = 190;

    riepilogoHTML += `
        <h3>Costi Fissi</h3>
        <ul>
            <li>Viaggio: €${costoFissoViaggio}</li>
            <li>Hotel: €${costoFissoHotel}</li>
        </ul>
    `;

    document.getElementById('costi').innerHTML = riepilogoHTML || '<p>Nessuna attività selezionata.</p>';
    calcolaTotale();
}

// Funzione per calcolare il totale dei costi
function calcolaTotale() {
    const costiAttivita = {
        duomo: 32,
        parco: 30,
        festa: 20,
        cinema: 10,
        basilica: 24,
        teatro: 20,
        aperitivo1: 25,
        aperitivo2: 15
    };

    const totaleAttivita = Object.entries(costiAttivita)
        .filter(([id]) => document.getElementById(id).checked)
        .reduce((totale, [_, costo]) => totale + costo, 0);

    const costoFissoViaggio = 85;
    const costoFissoHotel = 190;

    const totale = totaleAttivita + costoFissoViaggio + costoFissoHotel;

    document.getElementById('totaleCosto').innerHTML = `<h2>Totale: €${totale.toFixed(2)}</h2>`;
    document.getElementById('totaleCosto').classList.remove('hidden');
}

// Listener per calcolo automatico
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', aggiornaRiepilogo);
});
