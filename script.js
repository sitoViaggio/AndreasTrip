// Funzione per mostrare una sezione specifica e nascondere le altre
function mostraSezione(sezioneID) {
    document.querySelectorAll('.block').forEach(block => block.classList.add('hidden'));
    document.getElementById(sezioneID).classList.remove('hidden');
}

// Funzioni di navigazione
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

// Funzione per il bottone "Ricomincia"
function ricomincia() {
    mostraSezione('intro');
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('totaleCosto').classList.add('hidden');
    document.getElementById('costi').innerHTML = '';
}

// Funzione per aggiornare il riepilogo
function aggiornaRiepilogo() {
    const costiAttivita = {
        rotonda: { descrizione: "Villa La Rotonda", costo: 15 },
        monte: { descrizione: "Santuario di Monte Berico", costo: 6 },
        gioiello: { descrizione: "Museo del Gioiello", costo: 8 },
        musei: { descrizione: "Biglietto Unico Musei", costo: 15 },
        basilica: { descrizione: "Basilica Palladiana", costo: 24 },
        teatro: { descrizione: "Teatro Olimpico", costo: 20 },
        aperitivo1: { descrizione: "Aperitivo in Piazza dei Signori", costo: 25 },
        aperitivo2: { descrizione: "Aperitivo e Passeggiata Parco Querini", costo: 15 }
    };

    let riepilogoHTML = '';
    let totaleAttivita = 0;

    Object.entries(costiAttivita).forEach(([id, dettagli]) => {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            riepilogoHTML += `<li>${dettagli.descrizione}: €${dettagli.costo}</li>`;
            totaleAttivita += dettagli.costo;
        }
    });

    const costoFissoViaggio = 115;
    const costoFissoHotel = 210;

    riepilogoHTML += `
        <h3>Costi Fissi</h3>
        <ul>
            <li>Viaggio: €${costoFissoViaggio}</li>
            <li>Hotel+Pasti: €${costoFissoHotel}</li>
        </ul>
    `;

    document.getElementById('costi').innerHTML = riepilogoHTML || '<p>Nessuna attività selezionata.</p>';
    calcolaTotale(totaleAttivita, costoFissoViaggio, costoFissoHotel);
}

// Funzione per calcolare il totale
function calcolaTotale(attivita, viaggio, hotel) {
    const totale = attivita + viaggio + hotel;
    document.getElementById('totaleCosto').innerHTML = `<h2>Totale: €${totale.toFixed(2)}</h2>`;
    document.getElementById('totaleCosto').classList.remove('hidden');
}

// Listener per aggiornamento automatico
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', aggiornaRiepilogo);
});
