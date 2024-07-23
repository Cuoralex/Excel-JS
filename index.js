// class Excel{
//     constructor(excel){
//         this.content=excel
//     }

//     header(){
//         return this.content[0]
//     }

//     rows(){
//         return this.content.slice(1,this.content.length)
//     }
// }


// const excelInput =document.getElementById('excel-input')

// // console.log(excelInput)

// excelInput.addEventListener('change', async function(){
//     const content= await readXlsxFile(excelInput.files[0])

//     // console.log(content)
//     const excel = new Excel(content)
//     console.log(excel.header)
//     console.log(excel.rows)
// })

// console.log('hola')
document.getElementById('inputFile').addEventListener('change', onChangeInput);

function onChangeInput(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const libro = XLSX.read(data, { type: 'array' });
            const nombreHoja = libro.SheetNames[0]; // Número de la primera hoja de Excel
            const hoja = libro.Sheets[nombreHoja]; // Asegúrate de usar `libro.Sheets` en lugar de `libro.sheets`
            const dataJson = XLSX.utils.sheet_to_json(hoja);
            console.log(dataJson);
            displayTable(dataJson);
        };
        reader.readAsArrayBuffer(file);
    } else {
        console.error('No file selected.');
    }
}

function displayTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ""; // Clear any existing content

    if (data.length === 0) {
        tableContainer.innerHTML = "<p>No data available</p>";
        return;
    }

    const table = document.createElement('table');
    table.classList.add('min-w-full', 'bg-white'); // Add Tailwind classes for styling

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        th.classList.add('py-2', 'px-4', 'bg-gray-200', 'border'); // Add Tailwind classes for styling
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            td.classList.add('py-2', 'px-4', 'border'); // Add Tailwind classes for styling
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputFile");
    if (input) {
        input.addEventListener("change", onChangeInput);
    } else {
        console.error('No se encontró el elemento con id "inputFile".');
    }
});
