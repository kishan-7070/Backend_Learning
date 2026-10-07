const person = {
    name:"kishan",
    greet(){
        console.log(`Hi I am ${this.name}`);
    }
}

person.greet();

const greetFunction = person.greet
greetFunction()

const n=person.greet.bind({name:"Ishwar"});
n()


