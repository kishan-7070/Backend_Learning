function person(name){
    this.name=name
}

person.prototype.greet=function(){
    console.log(`Hello My Name is ${this.name}`);
}

let kishan=new person("kishan");
kishan.greet();