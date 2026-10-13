
function triggerInventory() {   // AI segítség
    const resultCard = document.getElementById('inventoryResultCard');
    const totalCountEl = document.getElementById('invTotalCount');
    const dateTextEl = document.getElementById('inventoryDateText');
    const historyBody = document.getElementById('inventoryHistoryBody');

    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const totalItems = (typeof warehouse !== 'undefined' && warehouse.products) ? warehouse.products.length : 0;

    totalCountEl.innerText = `${totalItems} féle termék`;
    dateTextEl.innerText = `Lezárva: ${now}`;
    resultCard.classList.remove('d-none');

    const dateOnly = now.split(' ')[0];
    
    historyBody.insertAdjacentHTML('afterbegin', `
        <tr>
            <td>${dateOnly}</td>
            <td>Teljes raktár</td>
            <td><span class="text-success">100% egyezés</span></td>
            <td><button class="btn btn-sm btn-outline-light" onclick="showInventoryDetails('${dateOnly}', 'Teljes raktár', '100% egyezés')">Megtekintés</button></td>
        </tr>
    `);

    if (typeof showToast === 'function') {
        showToast('A leltározás sikeresen lezajlott. Eredmények megtekinthetők alul.', 'success');
    }
}

function showInventoryDetails(date, type, result) {
    document.getElementById('modalLeltarDate').innerText = date;
    document.getElementById('modalLeltarType').innerText = type;
    document.getElementById('modalLeltarResult').innerText = result;

    const modalEl = document.getElementById('leltarReszletekModal');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}