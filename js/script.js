function leltarIdopontFormazasa(datum) {
    return datum.toISOString().slice(0, 16).replace('T', ' ');
}

function leltarElozmenySorLetrehozasa(datum) {
    const sor = document.createElement('tr');
    const datumCella = document.createElement('td');
    datumCella.textContent = datum;

    const tipusCella = document.createElement('td');
    tipusCella.textContent = 'Teljes raktár';

    const eredmenyCella = document.createElement('td');
    const eredmeny = document.createElement('span');
    eredmeny.className = 'text-success';
    eredmeny.textContent = '100% egyezés';
    eredmenyCella.appendChild(eredmeny);

    const reszletekCella = document.createElement('td');
    const reszletekGomb = document.createElement('button');
    reszletekGomb.type = 'button';
    reszletekGomb.className = 'btn btn-sm btn-outline-light';
    reszletekGomb.textContent = 'Megtekintés';
    reszletekGomb.dataset.leltarReszletek = '';
    reszletekGomb.dataset.datum = datum;
    reszletekGomb.dataset.tipus = 'Teljes raktár';
    reszletekGomb.dataset.eredmeny = '100% egyezés';
    reszletekCella.appendChild(reszletekGomb);

    sor.append(datumCella, tipusCella, eredmenyCella, reszletekCella);
    return sor;
}

function leltarInditasa() {
    const eredmenyKartya = document.getElementById('leltarEredmenyKartya');
    const tetelszamElem = document.getElementById('leltarTetelSzam');
    const datumSzovegElem = document.getElementById('leltarDatumSzoveg');
    const elozoLeltarakTorzs = document.getElementById('leltarElozmenyekTorzs');

    const aktualisIdopont = leltarIdopontFormazasa(new Date());
    const termekekSzama = document.querySelectorAll('#keszletTablaTorzs tr').length;

    tetelszamElem.innerText = `${termekekSzama} féle termék`;
    datumSzovegElem.innerText = `Lezárva: ${aktualisIdopont}`;
    eredmenyKartya.classList.remove('d-none');

    const datum = aktualisIdopont.split(' ')[0];
    elozoLeltarakTorzs.prepend(leltarElozmenySorLetrehozasa(datum));

    bootstrap.Toast.getOrCreateInstance(document.getElementById('leltarToast')).show();
}

function leltarReszleteinekMegjelenitese(datum, tipus, eredmeny) {
    document.getElementById('reszletekLeltarDatum').innerText = datum;
    document.getElementById('reszletekLeltarTipus').innerText = tipus;
    document.getElementById('reszletekLeltarEredmeny').innerText = eredmeny;

    const modalElem = document.getElementById('leltarReszletekModal');
    if (modalElem) {
        const modal = new bootstrap.Modal(modalElem);
        modal.show();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('leltarInditasaGomb').addEventListener('click', leltarInditasa);

    document.getElementById('leltarElozmenyekTorzs').addEventListener('click', (event) => {
        const gomb = event.target.closest('[data-leltar-reszletek]');
        if (!gomb) return;

        leltarReszleteinekMegjelenitese(gomb.dataset.datum, gomb.dataset.tipus, gomb.dataset.eredmeny);
    });

    Chart.defaults.color = '#adb5bd';
    Chart.defaults.borderColor = '#2f3542';

    const kategoriaRajzContextus = document.getElementById('kategoriaDiagram').getContext('2d');
    new Chart(kategoriaRajzContextus, {
        type: 'doughnut',
        data: {
            labels: ['Irodabútor', 'Elektronika', 'Periféria', 'Irodaszer', 'Világítás'],
            datasets: [{
                data: [57, 11, 120, 235, 60],
                backgroundColor: ['#0d6efd', '#ffc107', '#198754', '#0dcaf0', '#6f42c1'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    const mozgasRajzContextus = document.getElementById('mozgasDiagram').getContext('2d');
    new Chart(mozgasRajzContextus, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún'],
            datasets: [{
                label: 'Beérkezés (db)',
                data: [120, 200, 150, 80, 300, 220],
                backgroundColor: '#198754'
            }, {
                label: 'Kiadás (db)',
                data: [90, 160, 130, 70, 250, 190],
                backgroundColor: '#dc3545'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    const keszletErtekRajzContextus = document.getElementById('keszletErtekDiagram').getContext('2d');
    new Chart(keszletErtekRajzContextus, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Készletérték (millió Ft)',
                data: [38, 42, 41, 45.8],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    const termekMennyisegRajzContextus = document.getElementById('termekMennyisegDiagram').getContext('2d');
    new Chart(termekMennyisegRajzContextus, {
        type: 'bar',
        data: {
            labels: ['Irodabútor', 'Elektronika', 'Periféria', 'Irodaszer', 'Világítás'],
            datasets: [{
                label: 'Mennyiség (db / csomag)',
                data: [57, 11, 120, 235, 60],
                backgroundColor: '#0d6efd',
                borderColor: '#0b5ed7',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: { color: '#adb5bd' },
                    grid: { color: '#2f3542' }
                },
                y: {
                    ticks: { color: '#adb5bd' },
                    grid: { color: '#2f3542' }
                }
            }
        }
    });

    const kategoriaForgalomRajzContextus = document.getElementById('kategoriaForgalomDiagram').getContext('2d');
    new Chart(kategoriaForgalomRajzContextus, {
        type: 'doughnut',
        data: {
            labels: ['Irodabútor', 'Elektronika', 'Irodaszer', 'Egyéb'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#0d6efd', '#ffc107', '#198754', '#6c757d'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#adb5bd',
                        boxWidth: 12,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
});