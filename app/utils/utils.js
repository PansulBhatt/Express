const csv = require('csv-parser');  
const fs = require('fs');

export const readCsvFile = (fileName="app/db/data.csv") => {
    const rowData = [];
    return new Promise(resolve => {
        fs.createReadStream(fileName)  
        .pipe(csv())
        .on('data', (row) => {
            rowData.push(row);
        })
        .on('end', (resp) => {
            console.log('CSV file successfully processed');
            resolve(rowData);
        });
    })
}
