const User = require('../src/User')

// double check consistency of indentation size across test and class files
describe('Testing the User construction',()=> {

    
    test('Test the User Object',()=>{
        newUser = new User('Bill','Wow',20)
        expect(newUser.username).toBe('Bill')
        expect(newUser.password).toBe('Wow')
        expect(newUser.age).toBe(20)
        expect(newUser.loggedIn).toBe(false)
    })

})

describe('Testing the User methods',()=> {

    
    describe('Testing the login Method',()=>{
        test('Wrong password gives error',()=>{
            newUser = new User('Bill','Wow',20)
            expect(function() {newUser.login('ecksdee')}).toThrow('Incorrect password')
        })

        test('Correct password succeeds',()=>{
            newUser = new User('Bill','Wow',20)
            newUser.login('Wow')
            expect(newUser.loggedIn).toBe(true)
        })
    })

    describe('Testing the logout Method',()=>{
        test('Logging out works',()=>{
            newUser = new User('Bill','Wow',20)
            newUser.login('Wow')
            newUser.logout()
            expect(newUser.loggedIn).toBe(false)
        })
    })
})