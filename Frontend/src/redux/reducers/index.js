const reducers = {};

reducers.addEmployee = (state, action) =>{
    console.log("reducer activate", state, action)
    let new_employee = action.payload;
    state.employees.push(new_employee)
    return state
}

reducers.updateEmployee = (state, action)=>{
    let id = action.id;
    let emp = action.employee;
    let old_emp = state.employees.find(emp=>emp.id === id);
    Object.keys(old_emp).forEach(key=>old_emp[key] = emp[key] !==undefined? emp[key] : old_emp[key]);
    return state;
}

reducers.updateProject = (state, action)=>{
    let id = action.id;
    let project = action.project;
    let old_project = state.projects.find(pj=>pj.id === id);
    Object.keys(old_project).forEach(key=>old_project[key] = project[key] !==undefined? project[key] : old_project[key]);
    return state;
}

reducers.deleteEmployee = (state, action)=>{
    console.warn(action)
    state.employees = state.employees.filter(emp=>emp.id !== action.payload)
    return state;
    
}

reducers.deleteProject = (state, action)=>{
    state.projects = state.projects.filter(pj=>pj.id !== action.payload)
    return state;
}

reducers.addProject = (state, action) =>{
    let new_project = action.payload;
    console.log("pushing ",new_project)
    state.projects.push(new_project)
    return state
}


reducers.initialize = (state, action)=>{
    return {employees:action.data.employees, projects:action.data.employees}
}


const reducer_wrapper = (state, action) => {try{ return typeof reducers[action.type] == "function"? reducers[action.type](state, action):state;} catch(e){console.warn(e);}}
export default reducer_wrapper;