// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee{
    constructor(name,id,email,officeNum){

        super(name,id,email)

        this.officeNumber=officeNum
    }
    getRole(){
        return "Manager"
    }
    getOfficeNum(){
        return this.officeNum
    }
}

module.exports=Manager;