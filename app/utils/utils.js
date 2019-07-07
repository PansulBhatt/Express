const csv = require('csv-parser');
const fs = require('fs');

export const readCsvFile = (fileName = "app/db/data.csv") => {
    /**
     * This function reads the given file and returns back the response through
     * a promise. The reason for returning a promise is to make sure that we can synchronize
     * our JS functions. The function leverages the fs (fileStreaming library) which performs reads
     * line by line.
     */
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
