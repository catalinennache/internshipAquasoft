
const employee = require('../models/Employees.model')
const queryResolvers = {}

queryResolvers.getAllEmployees = async () => {return await employee.find()},

queryResolvers.getEmployee = async (parent, args, context, info)=>{ 
    return await employee.findById(args.id)
}

module.exports = queryResolvers;