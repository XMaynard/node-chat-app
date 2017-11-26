//[{
//    id: id,
//    name: name,
//    room: room
//}];
    
    //add user(id, name, room)
    //removeUserid()
    //getUser(id)
    //getUserList(room)
    

class Users {
    constructor () {
        this.users = [];
    }
    
    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id){
        //return user that was removed
       let user = this.getUser(id);
        
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
        
//        let users =this.users.filter((user) => user.id === id);
//        let userRemoved = users.map((user) => user.id);
//        return userRemoved;
        
        
    }
    
    getUser(id) {
        
        return this.users.filter((user) => user.id === id)[0]
        
//        let users = this.users.filter((user)=> user.id === id);
//        let idArray = users.map((user) => user.id);
//        return idArray;
    }
    
    getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        
        return namesArray;
    }
}

module.exports = {Users};



//    class Person {
//    constructor (name, age){
//    this.name = name
//    this.age=age;
//    
//}
//getUserDescription(){
//    return `${this.name} is ${this.age} year(s) old`;
//}        
//}
// 
//let me = new Person('Ojikeme', 55);
//let description = me.getUserDescription();
//console.log(description);
//

