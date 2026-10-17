class UIVezerlo {
    constructor() {
        this._aktivFul = 'attekintes';

        document.querySelectorAll('.nav-link[data-tab]').forEach((hivatkozas) => {
            hivatkozas.addEventListener('click', (event) => {
                event.preventDefault();
                this.fulValtasa(hivatkozas.dataset.tab);
            });
        });
    }

    get aktivFul() {
        return this._aktivFul;
    }

    set aktivFul(tabNev) {
        this._aktivFul = tabNev;
    }

    /**
     * @param {string} tabNev
     */
    fulValtasa(tabNev) {
        this.aktivFul = tabNev;

        const fulTartalmak = document.querySelectorAll('.tab-content-pane');
        fulTartalmak.forEach((fulTartalom) => {
            fulTartalom.classList.remove('active');
        });

        const celTartalom = document.getElementById(`ful-${this.aktivFul}`);
        if (celTartalom) {
            celTartalom.classList.add('active');
        }

        const navigaciosHivatkozasok = document.querySelectorAll('.nav-link[data-tab]');
        navigaciosHivatkozasok.forEach((hivatkozas) => {
            hivatkozas.classList.remove('active');
            hivatkozas.removeAttribute('aria-current');
        });

        const aktivHivatkozas = document.querySelector(`.nav-link[data-tab="${this.aktivFul}"]`);
        if (aktivHivatkozas) {
            aktivHivatkozas.classList.add('active');
            aktivHivatkozas.setAttribute('aria-current', 'page');
        }
    }
}

const feluletVezerlo = new UIVezerlo();