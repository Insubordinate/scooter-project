const Scooter = require('../src/Scooter')
const User = require('../src/User')


describe('Testing the ScooterApp construction',()=> {

    
    test('Test the Scooter Object',()=>{
        let expectedScooterValues = ['NYC',null,1,100,false].sort()
        let testScooter = new Scooter('NYC',1)
        let testScooterValues = Object.values(testScooter).sort()

        for(i = 0; i<expectedScooterValues.length;i++){

            expect(testScooterValues[i]).toBe(expectedScooterValues[i])
        }
    })

})



describe('Testing the Scooter Methods',()=> {


    describe('Testing the Rental method',()=> {

        test('Handles low charge',()=>{
            let testScooter = new Scooter('NYC',1)
            let user = new User('bill','wow',10)
            testScooter.charge = 10
            expect(function(){testScooter.rent(user)}).toThrow('Scooter needs to charge')
        })



        test('Handles broken scooter',()=>{
            let testScooter = new Scooter('NYC',1)
            let user = new User('bill','wow',10)
            testScooter.isBroken = true;
            expect(function(){testScooter.rent(user)}).toThrow('Scooter needs repair')
        })


        test('Handles Rental Correctly',()=>{
            let testScooter = new Scooter('NYC',1)
            let user = new User('bill','wow',10)
            testScooter.rent(user)
            expect(testScooter.station).toBe(null)
            expect(testScooter.user).toBe(user)
        })
    });





    describe('Testing the dock method',()=> {
        test('Handles Docking',()=>{
            let testScooter = new Scooter('NYC',1)
            let user = new User('bill','wow',10)
            testScooter.dock('NYC')
            expect(testScooter.station).toBe('NYC')
            expect(testScooter.user).toBe(null)
        })
    });


})