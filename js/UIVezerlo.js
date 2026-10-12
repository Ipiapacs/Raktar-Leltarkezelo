class UIVezerlo {
    constructor() {
        this.currentTab = 'dashboard';
    }

    /**
     * @param {string} tabName
     * @param {Event} event
     */
    switchTab(tabName, event) {
        if (event) {
            event.preventDefault();
        }

        this.currentTab = tabName;

        const contents = document.querySelectorAll('.tab-content-pane');
        contents.forEach(pane => {
            pane.classList.remove('active');
            pane.style.display = 'none';
        });

        const targetContent = document.getElementById(`tab-${tabName}`);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active');
        }

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.html?.forEach
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    }
}

const ui = new UIVezerlo();