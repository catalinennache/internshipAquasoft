
const employee = require('../models/Employee.model')
const project = require('../models/Project.model')
const mutationResolvers = {}


mutationResolvers.createProject = async (parent, args, context, info) => {
    const proj = new project(args.proj)
    await proj.save();
    return proj;
}

mutationResolvers.updateProject = async (parent, args, context, info) => {
    const id = args.id;
    const data = args.proj;
    return await project.findByIdAndUpdate(id, data)
}

mutationResolvers.deleteProject = async (parent, args, context, info) => {
    const proj = await project.findByIdAndDelete(args.id);
    return proj;
}


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