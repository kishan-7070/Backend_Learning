function Person(name,age){
    this.name=name,
    this.age=age
}

let john=new Person("Kishan",20);
// console.log(john.name);

function Animal(type){
    this.type=type;
}

Animal.prototype.speak= function(){
    return `${this.type} makes a sound`;
}

let Dog=new Animal("Dog");
// console.log(Dog.speak());

Array.prototype.hitesh = function(){
    return `New array is ${this}`;
}

let newArray=[1,2,3,4];
// console.log(newArray.hitesh());

let myArray=[1,2,3,4,5,6];
// console.log(myArray.hitesh());

class Vehicle{
    constructor(make,model){
        this.make=make;
        this.model=model;
    }

    start(){
        return `${this.model} is a car from ${this.make}`;
    }
}

class Car extends Vehicle{
    drive(){
        return `Drive Safely with the ${this.model} Car`;
    }
}
let myCar= new Car("Toyota","Corolla");
// console.log(myCar.drive());

//Encapsulation

class BankAccount{
    #balance=0;
    deposit(amount){
        this.#balance+=amount;
        return this.#balance;
    }
    getBalance(){
        return `Total Balance is : ${this.#balance}`;
    }
}
let account = new BankAccount();
//console.log(account.balance);  not getting direct access to it 
 account.deposit(20);
// console.log(account.getBalance());


//Abstraction - hides Complex implementation detail

class Tea{
    start(){
        //complex Process
        return `Starting Coffee making`;
    }

    take(){
        //to much process
        return `Take coffee to the table`;
    }
    PressButton(){
        let msg1= this.start();
        let msg2=this.take();
        return `Your Coffee is ${msg1} + ${msg2}`;
    }
}
let tea=new Tea();
// console.log(tea.start());
// console.log(tea.take());

// console.log(tea.PressButton());  real abstraction


//Polymorphism - can be displayed in many forms

class Bird{
    fly(){
        return `You can fly`;
    }
}

class penguin extends Bird {
    fly(){
        return `Penguin Cant fly`;
    }
}
let bird= new Bird();
let pengui= new penguin();
// console.log(bird.fly());
// console.log(pengui.fly());


// Static Method - method only called  by class itself

class Add{
    static add(a,b){
        return a+b;
    }
}
// let add=new Add();
// console.log(add.add(2,3));

// console.log(Add.add(2,3));


//Getters and Setters

class Employee{
#salary;
    constructor(name,salary){
        if(salary<0){
            throw new console.error("Salary cant be negative");
           
        }
        this.name=name;
        this.#salary=salary;
    }
    get salary(){
        return this.#salary;
    }

    set salary(value){
        if(value<0){
            console.log("Invalid Salary");
        }else {
            this.#salary=value;
        }
    }
}

let emp=new Employee("Kishan",5000);
console.log(emp.salary);
emp.salary=6000;
console.log(emp.salary);