const historyBody = document.getElementById('inventoryHistoryBody');
if (historyBody && !historyBody.dataset.initialized) {
    const btn = historyBody.querySelector('button');
    if (btn) {
        btn.setAttribute('onclick', "ui.showInventoryDetails('2026-09-30', 'Teljes raktár', '98.4% egyezés')");
    }
    historyBody.dataset.initialized = "true";
}