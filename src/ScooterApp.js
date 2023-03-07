const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {

  constructor() {
    this.stations = {"Texas": [], "NYC": [], "Seattle": []};
    this.registeredUsers = {};
    // what is the use case of rentedScooters? is this part of the extension that we had discussed?
    this.rentedScooters = {};
    this.globalScootersSerials = 1;
    // where is globalUserId used?
    this.globalUserId = 1;
  }

  registerUser(username, password, age) {
    if (username in this.registeredUsers) {
      throw new Error('Already registered')
    }
    if (age < 18) {
      throw new Error('Too young to register')
    }
    this.registeredUsers[username] = new User(username,password,age)
  }

  loginUser(username,password){
    // to consider: usually with OOP related to users, the password attribute might not be directly accessible by other classes, 
    // i.e. you won't be able to call .password in other classes on a user object.
    if ( (!(username in this.registeredUsers)) || (!(this.registeredUsers[username].password === password) ) ) {
        throw new Error('Username or password incorrect')
    }
    // try using the user.login() method in this method, and moving this logic to the User class.
    // if we have multiple classes that need to log in a user, it would be more standardized to keep
    // any of the details of the login functionality in the user's login method
    if(this.registeredUsers[username].loggedIn === true){
      throw new Error('Already logged in')
    } 
    this.registeredUsers[username].loggedIn = true;
    console.log('User has been logged in')
  }

  logoutUser(username){
    if (!(username in this.registeredUsers)) {
      throw new Error ('No such user is logged in ')
    }
    if (!this.registeredUsers[username].loggedIn) {
      throw new Error ('No such user is logged in ')
    }
    this.registeredUsers[username].loggedIn = false;
    console.log('User has been logged out')
  }

  createScooter(station) {
    if(!(station in this.stations)) {
      throw new Error ('No Such Station')
    }
    this.stations[station].push(new Scooter(station, this.globalScootersSerials))
    this.globalScootersSerials += 1
    // make sure to return the created scooter and log to console
  }

  dockScooter(scooter,station) {
    // to consider: which station is this scooter docked at?
    if(scooter.station!=null) {
      throw new Error('Scooter is docked already')
    }
    if(!(station in this.stations)) {
      throw new Error('Station does not exist')
    }
    scooter.dock(station)
    // love the use of array operators here and elsewhere in the app! 
    delete this.rentedScooters[scooter.serial]
    this.stations[station].push(scooter)
  }

  // this method has a scooter as an argument, rather than a station.
  // additionally, the user is passed in to this method, rather than the username.
  // how would this method change with scooter and user args provided,
  // as well as using the scooter.station for a particular station instead?
  rentScooter(username,station) {
    if(!(station in this.stations)) {
      throw new Error('Not a valid station')
    }
    if(this.stations[station].length === 0) {
      throw new Error('No scooters at this station')
    }
    
    // nice login handling here! 
    if(!(username in this.registeredUsers)){
      throw new Error('Not a valid User')
    }
    if(this.registeredUsers[username].loggedIn!=true) {
      throw new Error('Please log in')
    }

    let user = this.registeredUsers[username]
  
    let rentedScooter = this.stations[station].pop()
    rentedScooter.rent(user)
    this.rentedScooters[rentedScooter.serial] = rentedScooter
    console.log('scooter is rented')
  }

  print(){
    // consider further user experience here - what else can be added to this log so that it's as clear as possible what each part is?
    console.log(this.registeredUsers);
    console.log(this.stations);
    
    let locations = Object.keys(this.stations);
    locations.forEach((location) => {
      console.log(`There are ${this.stations[location].length} at ${location}`)
    })
  }
}

module.exports = ScooterApp
