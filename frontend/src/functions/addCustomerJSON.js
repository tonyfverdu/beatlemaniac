const fs = require('fs');

function addCustomerJSON (parCustomer) {

    if (typeof parCustomer === 'object') {
        const jsonData = JSON.stringify(parCustomer);
        fs.writeFile('../data/dataOfPrueba.json', jsonData, (error) => {
            if (error) {
                console.error (`Error: ${error}`);
            } else {
                console.log('Customers data crated!!');
            }
        })
    } else {
        console.error ('Error:  The argument of the function "" must be an object!!');
    }
}

export default addCustomerJSON;