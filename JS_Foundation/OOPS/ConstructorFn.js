function Car(make,model){
    this.make=make;
    this.model=model;
    
}

let newCar= new Car("Swift","Toyota");
// console.log(newCar);

function Animal(species){
    this.species=species;
}

Animal.prototype.sound = function(){
    return `${this.species} makes a sound`
}

let dog = new Animal("dog");
// console.log(dog.sound());

function Drink(name){
    if(!new.target){
        throw new Error("Drink must be called with new Keyword");
    }
    this.name=name;
}

let chai=new Drink("Tea");
// console.log(chai);

function Student(name){
    this.name=name;
}

Student.prototype.sayHello=function () {
    console.log("Hello ",this.name);
}

const s1=new Student("Kishan");
s1.sayHello();
