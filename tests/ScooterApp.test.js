const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here


describe('Testing the ScooterApp construction',()=> {

    // Test that the Object is initialized correctly
    test('Test the Stations Object',() => {
        
        
        // Create Expected Values
        expected_loc = {"Texas":[],"NYC":[],"Seattle":[]};
        expected_keys = Object.keys(expected_loc).sort()
        expected_length = expected_keys.length



        // Testing Values
        let testApp = new ScooterApp();
        let testing_keys = Object.keys(testApp.stations).sort()
        let testing_length = testing_keys.length


        // Locations should be same length
        expect(testing_length).toBe(expected_length)




        // check locations AND check Arrays. 
        // Remember to sort, so that they have the same order.

        for(let i = 0 ; i< testing_length; i ++){


            
            // Check that the keys are the same
            expect(expected_keys[i]).toBe(testing_keys[i]);


            
            //check that the arrays are deeply equal to each other
            let expectedArr = expected_loc[expected_keys[i]].sort()
            let testingArr = testApp.stations[testing_keys[i]].sort()


            // check their lengths
            expect(expectedArr.length).toBe(testingArr.length)

            //check each object
            for(let j = 0; j <expectedArr.length;j++){
                expect(expectedArr[j]).toBe(testingArr[j])
            }



        }

    });

});


describe('Testing the ScooterApp Methods',()=> {

    

    describe('Testing Registration',()=>{
        // register user

        test('Throw Error for too young',()=>{
            let newApp = new ScooterApp();
            expect(function() {newApp.registerUser('bill','wow',10)}).toThrow(new Error('Too young to register'))
        })


        test('Throw Error for already registered',()=>{
            let newApp = new ScooterApp();
            newApp.registeredUsers['bill'] = {username:'bill',password:'wow',age:20}
            expect(function() {newApp.registerUser('bill','wow',20)}).toThrow(new Error('Already registered'))
        })

        test('Check to see that user correctly Registered',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            expect('bill' in newApp.registeredUsers).toBe(true)
        })
    });



    describe('Testing Log In',() =>{


        test('Throw Error for no user found',()=>{
            let newApp = new ScooterApp();
            expect(function() {newApp.loginUser('bill','wow')}).toThrow(new Error('Username or password incorrect'))
        })

        test('Throw Error for wrong pw',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            expect(function() {newApp.loginUser('bill','memes')}).toThrow(new Error('Username or password incorrect'))

        })
        test('Throw Error if already logged in',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            expect(function() {newApp.loginUser('bill','wow')}).toThrow(new Error('Already logged in'))

        })

        test('Check for correct Login',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            expect(newApp.registeredUsers['bill'].loggedIn).toBe(true)

        })
    })

    
    // log out
    describe('Testing Log Out',() =>{


        test('Throw Error for no user found',()=>{
            let newApp = new ScooterApp();
            expect(function() {newApp.logoutUser('bill')}).toThrow(new Error('No such user is logged in '))
        })
        test('Throw Error for no user logged In',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            expect(function() {newApp.logoutUser('bill')}).toThrow(new Error('No such user is logged in '))
        })
        test('Correctly Logs Out',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            newApp.logoutUser('bill')
            expect(newApp.registeredUsers['bill'].loggedIn).toBe(false)
        })


    })

    // testing create Scooter
    describe('Testing Create Scooter',() =>{


        test('Throw Error for location not found',()=>{
            let newApp = new ScooterApp();
            expect(function() {newApp.createScooter('wow')}).toThrow(new Error('No Such Station'))
        })
        
        test('Increments Global Serial',()=>{
            let newApp = new ScooterApp();
            newApp.createScooter('NYC')
            expect(newApp.globalScootersSerials).toBe(2)
        })

    })


    // rent scooter
    describe('Testing Renting',() =>{

        test('Throw Error for Not Valid Station',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            expect(function() {newApp.rentScooter('bill','Toledo')}).toThrow(new Error('Not a valid station'))
        })

        test('Throw Error for Not a Valid User',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            newApp.createScooter('NYC')
            expect(function() {newApp.rentScooter('Axl','NYC')}).toThrow(new Error('Not a valid User'))
        })

        test('Throw Error for Not a Logged In User',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.createScooter('NYC')
            expect(function() {newApp.rentScooter('bill','NYC')}).toThrow(new Error('Please log in'))
        })

        test('Throw Error for No Scooters At Station',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            expect(function() {newApp.rentScooter('bill','NYC')}).toThrow(new Error('No scooters at this station'))
        })


        test('Check to see if Scooter removed correctly',()=>{
            let newApp = new ScooterApp();
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            newApp.createScooter('NYC')
            newApp.rentScooter('bill','NYC')
            expect(newApp.stations['NYC'].length).toBe(0)
            expect(1 in newApp.rentedScooters).toBe(true)
        })


    })
    // dock scooter
    describe('Testing Docking',() =>{

        test('Throws error if scooter is already docked',()=>{
            let newApp = new ScooterApp();
            newApp.createScooter('NYC')
            expect(function() {newApp.dockScooter(newApp.stations['NYC'][0]),'NYC'}).toThrow('Scooter is docked already')
        });

        test('Throws error if station does not exist',()=>{
            let newApp = new ScooterApp();
            newApp.createScooter('NYC')
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            newApp.rentScooter('bill','NYC')
            expect(function() {newApp.dockScooter(newApp.rentedScooters[1]),'Wow'}).toThrow('Station does not exist')
        });

        test('Check to see if docked correctly',()=>{
            let newApp = new ScooterApp();
            newApp.createScooter('NYC')
            newApp.registerUser('bill','wow',20)
            newApp.loginUser('bill','wow')
            newApp.rentScooter('bill','NYC')
            newApp.dockScooter(newApp.rentedScooters[1],'NYC')

            // Nothing should be in the rentedScooters
            expect(Object.keys(newApp.rentedScooters).length).toBe(0)
            // Scooter in Location should not have a user
            expect(newApp.stations['NYC'][0].user).toBe(null)
            
        });
    })
})

