// Costanti
const COSTI_FISSI = {
    viaggio: 115,
    hotel: 210,
};

const COSTI_ATTIVITA = {
    rotonda: { descrizione: "Villa La Rotonda", costo: 15 },
    monte: { descrizione: "Santuario di Monte Berico", costo: 6 },
    gioiello: { descrizione: "Museo del Gioiello", costo: 8 },
    musei: { descrizione: "Biglietto Unico Musei", costo: 15 }
};

// Navigazione tra le sezioni
function mostraSezione(sezioneID) {
    document.querySelectorAll('.block').forEach(block => block.classList.add('hidden'));
    document.getElementById(sezioneID).classList.remove('hidden');
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

function ricomincia() {
    mostraSezione('intro');
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('totaleCosto').classList.add('hidden');
    document.getElementById('costi').innerHTML = '';
}

// Aggiorna il riepilogo dei costi
function aggiornaRiepilogo() {
    let riepilogoHTML = '';
    let totaleAttivita = 0;

    Object.entries(COSTI_ATTIVITA).forEach(([id, dettagli]) => {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            riepilogoHTML += `<li>${dettagli.descrizione}: €${dettagli.costo}</li>`;
            totaleAttivita += dettagli.costo;
        }
    });

    riepilogoHTML += `
        <h3>Costi Fissi</h3>
        <ul>
            <li>Viaggio: €${COSTI_FISSI.viaggio}</li>
            <li>Hotel+Pasti: €${COSTI_FISSI.hotel}</li>
        </ul>
    `;

    document.getElementById('costi').innerHTML = riepilogoHTML || '<p>Nessuna attività selezionata.</p>';
    calcolaTotale(totaleAttivita);
}

// Calcolo totale
function calcolaTotale(totaleAttivita) {
    const totale = totaleAttivita + COSTI_FISSI.viaggio + COSTI_FISSI.hotel;
    document.getElementById('totaleCosto').innerHTML = `<h2>Totale: €${totale.toFixed(2)}</h2>`;
    document.getElementById('totaleCosto').classList.remove('hidden');
}

// Listener per aggiornamento automatico
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', aggiornaRiepilogo);
});
