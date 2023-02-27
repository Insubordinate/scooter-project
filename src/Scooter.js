class Scooter{
  // scooter code here
  constructor(station,serial){
    this.station = station;
    this.user = null;
    this.serial = serial;
    this.charge = 100;
    this.isBroken = false;
  };

  rent(user){
    if (this.charge <= 20){
      throw new Error('Scooter needs to charge')
    }
    if (this.isBroken === true){
      throw new Error('Scooter needs repair')
    }
    
    this.station = null;
    this.user = user;
  }

  dock(station){
    this.station = station;
    this.user = null;
  }

  recharge(){
    if(this.charge === 100){
      throw new Error('Already charged')
    }
    this.charge = 100;
    console.log('Scooter Charged')
  }

  requestRepair(){
    if(this.isBroken === false){
      throw new Error('Cannot fix what is not broke');
    }
    this.isBroken = false;
    console.log('Repair Completed!')
  }
}


module.exports = Scooter
