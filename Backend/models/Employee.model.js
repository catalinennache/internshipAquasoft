const mongoose = require('mongoose')

const plainSchema = {
    Name:{
        type:String,
        required: true
    },
    Adress:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Hire_Date:{
        type:String,
        required: true
    },
    Salary:{
        type:Number,
        required: true
    },
    Job_Title:{
        type:String,
        required: true
    },
    Project_id:{
        type:String
    }
}
const EmployeeSchema =  new mongoose.Schema(plainSchema)
const Employee = mongoose.model('employee', EmployeeSchema)


module.exports = Employee;