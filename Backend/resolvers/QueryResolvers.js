
const employee = require('../models/Employee.model');
const project = require('../models/Project.model');
const queryResolvers = {}

queryResolvers.getAllProjects = async (parent, args, context, info)=>{ 
    return await project.find();
}


queryResolvers.getProject = async (parent, args, context, info)=>{ 
    return await project.findById(args.id)
}

queryResolvers.getAllEmployees = async () => {
    let all_emps = await employee.find();
    for(emp_index in all_emps){
       emp_project = await queryResolvers.getProject(null,{id:all_emps[emp_index].Project_id},null,null)
       all_emps[emp_index].Project = emp_project;
    }
    return all_emps;
},

queryResolvers.getEmployee = async (parent, args, context, info)=>{ 
    let emp = await employee.findById(args.id);
    emp.Project = await queryResolvers.getProject(null,{id:emp.Project_id},null,null);
    
    return emp;
}



module.exports = queryResolvers;