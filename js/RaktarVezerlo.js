/*AI segítség*/
class RaktarVezerlo {
    constructor() {
        this.table = document.getElementById('inventoryTableBody');
        this.activeRow = null;

        this.table.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            this.activeRow = btn.closest('tr');

            if (btn.dataset.bsTarget === '#editProductModal') {
                const cells = this.activeRow.children;
                document.getElementById('editProductSku').value = cells[0].innerText;
                document.getElementById('editProductName').value = cells[1].innerText;
                document.getElementById('editProductCategory').value = cells[2].innerText;
                document.getElementById('editProductQuantity').value = cells[3].innerText;
                document.getElementById('editProductLocation').value = cells[4].innerText;
                document.getElementById('editProductStatus').value = cells[5].innerText.trim();
            }
        });
        document.getElementById('addProductForm').onclick = (e) => {
            if (e.target.type !== 'submit') return;
            e.preventDefault();
            this.addRow(
                document.getElementById('productSku').value,
                document.getElementById('productName').value,
                document.getElementById('productCategory').value,
                document.getElementById('productQuantity').value,
                document.getElementById('productLocation').value,
                document.getElementById('productStatus').value
            );
            this.close('addProductModal');
        };

        document.getElementById('editProductForm').onsubmit = (e) => {
            e.preventDefault();
            const cells = this.activeRow.children;
            const status = document.getElementById('editProductStatus').value;

            cells[0].innerText = document.getElementById('editProductSku').value;
            cells[1].innerText = document.getElementById('editProductName').value;
            cells[2].innerText = document.getElementById('editProductCategory').value;
            cells[3].innerText = document.getElementById('editProductQuantity').value;
            cells[4].innerText = document.getElementById('editProductLocation').value;
            cells[5].innerHTML = `<span class="badge ${this.getBadge(status)}">${status}</span>`;

            this.close('editProductModal');
        };


        document.getElementById('confirmDeleteBtn').onclick = () => {
            if (this.activeRow) this.activeRow.remove();
            this.close('deleteProductModal');
        };
    }

    addRow(sku, name, cat, qty, loc, status) {
        this.table.innerHTML += `
            <tr>
                <td>${sku}</td>
                <td>${name}</td>
                <td>${cat}</td>
                <td>${qty}</td>
                <td>${loc}</td>
                <td><span class="badge ${this.getBadge(status)}">${status}</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#editProductModal"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteProductModal"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
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
