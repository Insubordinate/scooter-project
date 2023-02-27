const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {

  constructor(){
    this.stations = {"Texas":[],"NYC":[],"Seattle":[]};
    this.registeredUsers = {};
    this.rentedScooters = {}
    this.globalScootersSerials = 1;
    this.globalUserId = 1;
  }


  registerUser(username,password,age){
    if (username in this.registeredUsers){
      throw new Error('Already registered')
    }
    if (age < 18){
      throw new Error('Too young to register')
    }
    this.registeredUsers[username] = new User(username,password,age)
  }

  loginUser(username,password){
    if ( (!(username in this.registeredUsers)) || (!(this.registeredUsers[username].password === password) ) ) {
        throw new Error('Username or password incorrect')
    }
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
    if (this.registeredUsers[username].loggedIn!=true) {
      throw new Error ('No such user is logged in ')
    }
    this.registeredUsers[username].loggedIn=false;
    console.log('User has been logged out')
  }

  createScooter(station){
    if(!(station in this.stations)){
      throw new Error ('No Such Station')
    }
    this.stations[station].push(new Scooter(station,this.globalScootersSerials))
    this.globalScootersSerials+=1
  }

  dockScooter(scooter,station){
    if(scooter.station!=null){
      throw new Error('Scooter is docked already')
    }
    if(!(station in this.stations)){
      throw new Error('Station does not exist')
    }
    scooter.dock(station)
    delete this.rentedScooters[scooter.serial]
    this.stations[station].push(scooter)
  }

  rentScooter(username,station){
    if(!(station in this.stations)){
      throw new Error('Not a valid station')
    }
    if(this.stations[station].length === 0){
      throw new Error('No scooters at this station')
    }
    
    if(!(username in this.registeredUsers)){
      throw new Error('Not a valid User')
    }
    if(this.registeredUsers[username].loggedIn!=true){
      throw new Error('Please log in')
    }

    let user = this.registeredUsers[username]
  
    let rentedScooter = this.stations[station].pop()
    rentedScooter.rent(user)
    this.rentedScooters[rentedScooter.serial] = rentedScooter
    console.log('scooter is rented')
  }
  print(){
    console.log(this.registeredUsers);
    console.log(this.stations);
    
    let locations = Object.keys(this.stations);
    locations.forEach((location)=>{
      console.log(`There are ${this.stations[location].length} at ${location}`)
    })
  }
}

module.exports = ScooterApp
