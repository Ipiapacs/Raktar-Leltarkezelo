class UIVezerlo {
    switchTab(tabId, event) {
        if (event) event.preventDefault();

        document.querySelectorAll('.content-tab').forEach(el => el.classList.add('d-none'));
        document.getElementById('tab-' + tabId).classList.remove('d-none');

        document.querySelectorAll('.sidebar .nav-link').forEach(el => el.classList.remove('active'));
        if (event && event.currentTarget) event.currentTarget.classList.add('active');

        const titles = {
            'dashboard': 'Vezérlőpult (Dashboard)',
            'keszlet': 'Készletkezelés és Termékek',
            'leltar': 'Leltározási folyamatok',
            'statisztikak': 'Részletes Statisztikák & Jelentések'
        };
        document.getElementById('pageTitle').innerText = titles[tabId];

        const sidebarEl = document.getElementById('sidebarMenu');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(sidebarEl);
        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    }
}