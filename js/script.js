function formatInventoryTimestamp(date) {
    return date.toISOString().slice(0, 16).replace('T', ' ');
}

function createInventoryHistoryRow(dateOnly) {
    const row = document.createElement('tr');
    const dateCell = document.createElement('td');
    dateCell.textContent = dateOnly;

    const typeCell = document.createElement('td');
    typeCell.textContent = 'Teljes raktár';

    const resultCell = document.createElement('td');
    const result = document.createElement('span');
    result.className = 'text-success';
    result.textContent = '100% egyezés';
    resultCell.appendChild(result);

    const detailsCell = document.createElement('td');
    const detailsButton = document.createElement('button');
    detailsButton.type = 'button';
    detailsButton.className = 'btn btn-sm btn-outline-light';
    detailsButton.textContent = 'Megtekintés';
    detailsButton.dataset.leltarReszletek = '';
    detailsButton.dataset.datum = dateOnly;
    detailsButton.dataset.tipus = 'Teljes raktár';
    detailsButton.dataset.eredmeny = '100% egyezés';
    detailsCell.appendChild(detailsButton);

    row.append(dateCell, typeCell, resultCell, detailsCell);
    return row;
}

function triggerInventory() {   // AI segítség
    const resultCard = document.getElementById('leltarEredmenyKartya');
    const totalCountEl = document.getElementById('leltarTetelSzam');
    const dateTextEl = document.getElementById('leltarDatumSzoveg');
    const historyBody = document.getElementById('leltarElozmenyekTorzs');

    const now = formatInventoryTimestamp(new Date());
    const totalItems = document.querySelectorAll('#keszletTablaTorzs tr').length;

    totalCountEl.innerText = `${totalItems} féle termék`;
    dateTextEl.innerText = `Lezárva: ${now}`;
    resultCard.classList.remove('d-none');

    const dateOnly = now.split(' ')[0];
    historyBody.prepend(createInventoryHistoryRow(dateOnly));

    if (typeof showToast === 'function') {
        showToast('A leltározás sikeresen lezajlott. Eredmények megtekinthetők alul.', 'success');
    }
}

function showInventoryDetails(date, type, result) {
    document.getElementById('reszletekLeltarDatum').innerText = date;
    document.getElementById('reszletekLeltarTipus').innerText = type;
    document.getElementById('reszletekLeltarEredmeny').innerText = result;

    const modalEl = document.getElementById('leltarReszletekModal');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('leltarInditasaGomb').addEventListener('click', triggerInventory);

    document.getElementById('leltarElozmenyekTorzs').addEventListener('click', (event) => {
        const button = event.target.closest('[data-leltar-reszletek]');
        if (!button) return;

        showInventoryDetails(button.dataset.datum, button.dataset.tipus, button.dataset.eredmeny);
    });

    Chart.defaults.color = '#adb5bd';
    Chart.defaults.borderColor = '#2f3542';

    const ctxCategory = document.getElementById('kategoriaDiagram').getContext('2d');
    new Chart(ctxCategory, {
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

    const ctxMovement = document.getElementById('mozgasDiagram').getContext('2d');
    new Chart(ctxMovement, {
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

    const ctxValue = document.getElementById('keszletErtekDiagram').getContext('2d');
    new Chart(ctxValue, {
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

    const ctxTermekek = document.getElementById('termekMennyisegDiagram').getContext('2d');
    new Chart(ctxTermekek, {
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

    const ctxKategoria = document.getElementById('kategoriaForgalomDiagram').getContext('2d');
    new Chart(ctxKategoria, {
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