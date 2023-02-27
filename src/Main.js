let scooter = require('./Scooter')
let user = require('./User')
let scooterApp = require('./ScooterApp')
const prompt = require('prompt-sync')({sigint: true});


while(true){
    
    const result = prompt('Input something: ');


    if(result === 'q'){
        pass
    }


    if(result === 'New'){
        

        
        newApp = new scooterApp()
        console.log('New App Created')
    
        while(true){
            const result = prompt('Input command: ');

            if(result ==='Create Scooter'){
                const result = prompt('Insert Location: ');
                newApp.createScooter(result)
            }
            
            if(result === 'Print'){
                newApp.print()
            }
        }


    }


    break;
}