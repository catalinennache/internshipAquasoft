
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
        let employee_tmp = all_emps[emp_index]
        employee_tmp.Projects = []
        employee_tmp.Total_Projects = 0;

        for(pid_index in employee_tmp.Project_ids){
            let pid = employee_tmp.Project_ids[pid_index];

            emp_project = await project.findById(pid)
            if(emp_project){
                employee_tmp.Projects.push(emp_project);
                employee_tmp.Total_Projects++;
            }
        }
        console.log(employee_tmp.id,employee_tmp.Total_Projects, employee_tmp.Projects)
    }
    return all_emps;
},

queryResolvers.getEmployee = async (parent, args, context, info)=>{ 
    let emp = await employee.findById(args.id);
    emp.Projects = []
    emp.Total_Projects = 0;
    for(pid_index in emp.Project_ids){
        let pid = emp.Project_ids[pid_index];
        const pj = await project.findById(pid)
        if(pj){
            emp.Projects.push(pj);
            emp.Total_Projects++;

        }
    };

    return emp;
}



module.exports = queryResolvers;