function lettura(){

}
async function fetchAndDisplayCSV() {
      try {
        const response = await fetch('https://petoiupload-five.vercel.app/export-csv', {
          method: 'GET',
          headers: {
            'Accept': 'text/csv'
          },
          mode: 'cors' // IMPORTANTE per dominio esterno
        });

        if (!response.ok) throw new Error('Errore nella fetch: ' + response.status);

        const csvText = await response.text();
        const rows = csvText.trim().split('\n');
        const headers = rows[0].split(',');

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Intestazione
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Dati
        for (let i = 1; i < rows.length; i++) {
          const row = document.createElement('tr');
          const cells = rows[i].split(',');
          cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
          });
          tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        const container = document.getElementById('table-container');
        container.innerHTML = '';
        container.appendChild(table);
      } catch (error) {
        document.getElementById('table-container').textContent = 'Errore nel caricamento dei dati.';
        console.error(error);
      }
    }

    fetchAndDisplayCSV();