
const QUERIES = {
    INITIAL_DATA:`query getAll{
        getAllEmployees {
          id,
          Name,
          Email
          Adress,
          Hire_Date,
          Salary,
          Job_Title,
          Total_Projects
        }

        getAllProjects {
            id
            Project_code
            Project_name
            Start_date
            Planned_end_date
        }
    }`,

    ALL_EMPLOYEES:`query getEmployees{
    getAllEmployees {
        id,
        Name,
        Adress,
        Hire_date,
        Total_projects
      }
    }`,
    
    GET_EMPLOYEE:`query get($getEmployeeId: ID) {
        getEmployee (id: $getEmployeeId){
          id,
          Name,
          Email
          Adress,
          Hire_Date,
          Salary,
          Job_Title,
          Projects{
            id,
            Project_code
            Project_name
            Start_date
            Planned_end_date
          }
        }
    }`,

    UPDATE_EMPLOYEE:`mutation update($updateEmployeeId: ID, $updateEmployeeEmp: EmployeeInput){
        updateEmployee(id: $updateEmployeeId, emp: $updateEmployeeEmp) {
          Name
        }
    }`,

    UPDATE_PROJECT:`mutation updateP($updateProjectId: ID, $updateProject: ProjectInput){
        updateProject(id:$updateProjectId, proj:$updateProject) {
          id
        }
    }`,

    DELETE_EMPLOYEE:`mutation delete($deleteEmployeeId: ID ){
        deleteEmployee(id: $deleteEmployeeId) {
            Name
        }
    }`,

    DELETE_PROJECT:` mutation deleteP($deleteProjectId: ID ){
        deleteProject(id:$deleteProjectId) {
          id
        }
    }`,
    INSERT_EMPLOYEE:`mutation create($createEmployeeEmp: EmployeeInput) {
      createEmployee(emp: $createEmployeeEmp) {
        id
      }
    }
    `,
    INSERT_PROJECT:`mutation createP($createProjectProj: ProjectInput){
      createProject(proj: $createProjectProj) {
        id
      }
    }`

}



const CONFIG = {

    API_URL : "http://localhost:4000/graphql",
    QUERIES,

}

export default CONFIG
