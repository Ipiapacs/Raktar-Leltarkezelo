/*AI segítség*/
class RaktarVezerlo {
    constructor() {
        this.keszletTabla = document.getElementById('keszletTablaTorzs');
        this.aktivSor = null;

        this.keszletTabla.addEventListener('click', (event) => {
            const gomb = event.target.closest('button');
            if (!gomb) return;

            this.aktivSor = gomb.closest('tr');
            if (gomb.dataset.bsTarget === '#termekSzerkesztesModal') {
                this.szerkesztoUrlapFeltoltese();
            }
        });

        document.getElementById('ujTermekUrlap').addEventListener('submit', (event) => {
            event.preventDefault();

            this.termekSorHozzaadasa({
                cikkszam: document.getElementById('ujTermekCikkszam').value,
                nev: document.getElementById('ujTermekNev').value,
                kategoria: document.getElementById('ujTermekKategoria').value,
                mennyiseg: document.getElementById('ujTermekMennyiseg').value,
                hely: document.getElementById('ujTermekHelye').value,
                allapot: document.getElementById('ujTermekAllapota').value
            });
            this.modalBezarasa('ujTermekModal');
        });

        document.getElementById('termekSzerkesztesUrlap').addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this.aktivSor) return;

            const termekAdatok = {
                cikkszam: document.getElementById('szerkesztesCikkszam').value,
                nev: document.getElementById('szerkesztesTermekNev').value,
                kategoria: document.getElementById('szerkesztesKategoria').value,
                mennyiseg: document.getElementById('szerkesztesMennyiseg').value,
                hely: document.getElementById('szerkesztesHelye').value,
                allapot: document.getElementById('szerkesztesAllapota').value
            };

            const cellak = this.aktivSor.cells;
            cellak[0].textContent = termekAdatok.cikkszam;
            cellak[1].textContent = termekAdatok.nev;
            cellak[2].textContent = termekAdatok.kategoria;
            cellak[3].textContent = termekAdatok.mennyiseg;
            cellak[4].textContent = termekAdatok.hely;
            this.allapotBeallitasa(cellak[5], termekAdatok.allapot);

            this.modalBezarasa('termekSzerkesztesModal');
        });

        document.getElementById('torlesMegerositeseGomb').addEventListener('click', () => {
            if (this.aktivSor) {
                this.aktivSor.remove();
                this.aktivSor = null;
            }
            this.modalBezarasa('termekTorlesModal');
        });
    }

    szerkesztoUrlapFeltoltese() {
        const cellak = this.aktivSor.cells;
        document.getElementById('szerkesztesCikkszam').value = cellak[0].textContent;
        document.getElementById('szerkesztesTermekNev').value = cellak[1].textContent;
        document.getElementById('szerkesztesKategoria').value = cellak[2].textContent;
        document.getElementById('szerkesztesMennyiseg').value = cellak[3].textContent;
        document.getElementById('szerkesztesHelye').value = cellak[4].textContent;
        document.getElementById('szerkesztesAllapota').value = cellak[5].textContent.trim();
    }

    termekSorHozzaadasa(termek) {
        const sor = document.createElement('tr');
        const ertekek = [
            termek.cikkszam,
            termek.nev,
            termek.kategoria,
            termek.mennyiseg,
            termek.hely
        ];

        ertekek.forEach((ertek) => {
            const cella = document.createElement('td');
            cella.textContent = ertek;
            sor.appendChild(cella);
        });

        const allapotCella = document.createElement('td');
        this.allapotBeallitasa(allapotCella, termek.allapot);
        sor.appendChild(allapotCella);

        const muveletekCella = document.createElement('td');
        muveletekCella.className = 'text-end';
        muveletekCella.append(
            this.muveletGombLetrehozasa('Szerkesztés', 'btn-outline-primary me-1', 'bi-pencil', '#termekSzerkesztesModal'),
            this.muveletGombLetrehozasa('Törlés', 'btn-outline-danger', 'bi-trash', '#termekTorlesModal')
        );
        sor.appendChild(muveletekCella);
        this.keszletTabla.appendChild(sor);
    }

    muveletGombLetrehozasa(felirat, stilusOsztaly, ikonNev, celModal) {
        const gomb = document.createElement('button');
        gomb.type = 'button';
        gomb.className = `btn btn-sm ${stilusOsztaly}`;
        gomb.dataset.bsToggle = 'modal';
        gomb.dataset.bsTarget = celModal;
        gomb.title = felirat;
        gomb.setAttribute('aria-label', felirat);

        const ikon = document.createElement('i');
        ikon.className = `bi ${ikonNev}`;
        gomb.appendChild(ikon);

        return gomb;
    }

    allapotBeallitasa(cella, allapot) {
        const jelveny = document.createElement('span');
        jelveny.className = `badge ${this.allapotJelvenyOsztalyanakLekerdezese(allapot)}`;
        jelveny.textContent = allapot;
        cella.replaceChildren(jelveny);
    }

    allapotJelvenyOsztalyanakLekerdezese(allapot) {
        if (allapot === 'Kevés készlet') return 'bg-warning text-dark';
        if (allapot === 'Kifogyott') return 'bg-danger';
        return 'bg-success';
    }

    modalBezarasa(azonosito) {
        bootstrap.Modal.getInstance(document.getElementById(azonosito))?.hide();
    }
}

new RaktarVezerlo();
