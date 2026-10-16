/*AI segítség*/
class RaktarVezerlo {
    constructor() {
        this.table = document.getElementById('keszletTablaTorzs');
        this.activeRow = null;

        this.table.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;

            this.activeRow = button.closest('tr');
            if (button.dataset.bsTarget === '#termekSzerkesztesModal') {
                this.populateEditForm();
            }
        });

        document.getElementById('ujTermekUrlap').addEventListener('submit', (event) => {
            event.preventDefault();

            this.addRow({
                sku: document.getElementById('ujTermekCikkszam').value,
                name: document.getElementById('ujTermekNev').value,
                category: document.getElementById('ujTermekKategoria').value,
                quantity: document.getElementById('ujTermekMennyiseg').value,
                location: document.getElementById('ujTermekHelye').value,
                status: document.getElementById('ujTermekAllapota').value
            });
            this.close('ujTermekModal');
        });

        document.getElementById('termekSzerkesztesUrlap').addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this.activeRow) return;

            const values = {
                sku: document.getElementById('szerkesztesCikkszam').value,
                name: document.getElementById('szerkesztesTermekNev').value,
                category: document.getElementById('szerkesztesKategoria').value,
                quantity: document.getElementById('szerkesztesMennyiseg').value,
                location: document.getElementById('szerkesztesHelye').value,
                status: document.getElementById('szerkesztesAllapota').value
            };

            const cells = this.activeRow.cells;
            cells[0].textContent = values.sku;
            cells[1].textContent = values.name;
            cells[2].textContent = values.category;
            cells[3].textContent = values.quantity;
            cells[4].textContent = values.location;
            this.setStatus(cells[5], values.status);

            this.close('termekSzerkesztesModal');
        });

        document.getElementById('torlesMegerositeseGomb').addEventListener('click', () => {
            if (this.activeRow) {
                this.activeRow.remove();
                this.activeRow = null;
            }
            this.close('termekTorlesModal');
        });
    }

    populateEditForm() {
        const cells = this.activeRow.cells;
        document.getElementById('szerkesztesCikkszam').value = cells[0].textContent;
        document.getElementById('szerkesztesTermekNev').value = cells[1].textContent;
        document.getElementById('szerkesztesKategoria').value = cells[2].textContent;
        document.getElementById('szerkesztesMennyiseg').value = cells[3].textContent;
        document.getElementById('szerkesztesHelye').value = cells[4].textContent;
        document.getElementById('szerkesztesAllapota').value = cells[5].textContent.trim();
    }

    addRow(product) {
        const row = document.createElement('tr');
        const values = [
            product.sku,
            product.name,
            product.category,
            product.quantity,
            product.location
        ];

        values.forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement('td');
        this.setStatus(statusCell, product.status);
        row.appendChild(statusCell);

        const actionsCell = document.createElement('td');
        actionsCell.className = 'text-end';
        actionsCell.append(
            this.createActionButton('Szerkesztés', 'btn-outline-primary me-1', 'bi-pencil', '#termekSzerkesztesModal'),
            this.createActionButton('Törlés', 'btn-outline-danger', 'bi-trash', '#termekTorlesModal')
        );
        row.appendChild(actionsCell);
        this.table.appendChild(row);
    }

    createActionButton(label, variant, iconName, target) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `btn btn-sm ${variant}`;
        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = target;
        button.title = label;
        button.setAttribute('aria-label', label);

        const icon = document.createElement('i');
        icon.className = `bi ${iconName}`;
        button.appendChild(icon);

        return button;
    }

    setStatus(cell, status) {
        const badge = document.createElement('span');
        badge.className = `badge ${this.getBadge(status)}`;
        badge.textContent = status;
        cell.replaceChildren(badge);
    }

    getBadge(status) {
        if (status === 'Kevés készlet') return 'bg-warning text-dark';
        if (status === 'Kifogyott') return 'bg-danger';
        return 'bg-success';
    }

    close(id) {
        bootstrap.Modal.getInstance(document.getElementById(id))?.hide();
    }
}

new RaktarVezerlo();
