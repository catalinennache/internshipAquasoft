import axios from "axios";
import CONFIG from "./configuration";

const DataAccessLayer = {
    dispatch: ()=>{throw new Error("Uninitialized!")},
    init:function(dispatch){
        this.dispatch = dispatch
    },
    addEmployee: async function(employee){
        employee.Salary = parseInt(employee.Salary)
        let id = await axios.post(CONFIG.API_URL,{
                query:CONFIG.QUERIES.INSERT_EMPLOYEE,
                variables:{
                    createEmployeeEmp:employee,
                }
            })
        employee.id = id;
        employee.Total_Projects = 0
        this.dispatch({type:"addEmployee",payload:employee})
    },

    deleteEmployee: async function(id){
        await axios.post(CONFIG.API_URL,{
            query:CONFIG.QUERIES.DELETE_EMPLOYEE,
            variables:{
                deleteEmployeeId:id
            }
        })
        console.log(id)
        this.dispatch({type:"deleteEmployee",payload:id})
    },

    updateEmployee: async function(id,edited_emp){
        if(edited_emp.Salary)
            edited_emp.Salary = parseInt(edited_emp.Salary)

        await axios.post(CONFIG.API_URL,{
            query:CONFIG.QUERIES.UPDATE_EMPLOYEE,
            variables:{
                updateEmployeeId:id,
                updateEmployeeEmp:edited_emp,
            }
        })
        edited_emp.id = id;
        console.log("updating emp", edited_emp)
        this.dispatch({type:"updateEmployee",employee:edited_emp,id})

    },

    getEmployee: async function(id){
        return axios.post(CONFIG.API_URL,{
            query:CONFIG.QUERIES.GET_EMPLOYEE,
            headers:{"Content-type":"application/json"},
            variables:{
              getEmployeeId:id
            }
          })
    },

    updateProject: async function(id, edited_project){
        await axios.post(CONFIG.API_URL,{
            query:CONFIG.QUERIES.UPDATE_PROJECT,
            variables:{
                updateProjectId:id,
                updateProject:edited_project,
            }
        })
        edited_project.id = id;
        console.log("updating project", edited_project)
        this.dispatch({type:"updateProject",project:edited_project,id})
    },

    deleteProject: async function(id){
        await axios.post(CONFIG.API_URL,{
            query:CONFIG.QUERIES.DELETE_PROJECT,
            variables:{
                deleteProjectId:id
            }
        });
        this.dispatch({type:"deleteProject",payload:id})
    },

    addProject: async function(project){
     
        let result = await axios.post(CONFIG.API_URL,{
                query:CONFIG.QUERIES.INSERT_PROJECT,
                variables:{
                    createProjectProj:project,
                }
            })
        project.id = result.data.data.createProject.id;
        this.dispatch({type:"addProject",payload:project})
    },

}

export default DataAccessLayer