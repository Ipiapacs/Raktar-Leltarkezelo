class UIVezerlo {
    constructor() {
        this._currentTab = 'attekintes';

        document.querySelectorAll('.nav-link[data-tab]').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.switchTab(link.dataset.tab);
            });
        });
    }

    get aktivFul() {
        return this._currentTab;
    }

    set aktivFul(tabNev) {
        this._currentTab = tabNev;
    }
// AI segítség
    /**
     * @param {string} tabNev
     */

    switchTab(tabNev) {
        this.aktivFul = tabNev;

        const contents = document.querySelectorAll('.tab-content-pane');
        contents.forEach(pane => {
            pane.classList.remove('active');
        });

        const targetContent = document.getElementById(`ful-${this.aktivFul}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        const navLinks = document.querySelectorAll('.nav-link[data-tab]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        const activeLink = document.querySelector(`.nav-link[data-tab="${this.aktivFul}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }
}

const ui = new UIVezerlo();