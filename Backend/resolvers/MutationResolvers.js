
const employee = require('../models/Employees.model')
const mutationResolvers = {}

/*
    perfect place for validation functions
*/


mutationResolvers.createEmployee = async (parent, args, context, info) => {
    const emp = new employee(args.emp)
    await emp.save();
    return emp;
}

mutationResolvers.updateEmployee = async (parent, args, context, info) => {
    const id = args.id;
    const data = args.emp;
    return await employee.findByIdAndUpdate(id, data)
}

mutationResolvers.deleteEmployee = async (parent, args, context, info) => {
    const emp = await employee.findByIdAndDelete(args.id);
    return emp;
}




module.exports = mutationResolvers