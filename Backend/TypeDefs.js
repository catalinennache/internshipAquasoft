const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Project{
    id: ID,
    Project_name: String,
    Start_date: String,
    Planned_end_date: String,
    Description: String,
    Project_code: String
 }
 
 type Employee{
     id: ID,
     Name: String,
     Adress: String,
     Email: String,
     Hire_date: String,
     Salary: Int,
     Job_title: String,
     Project_id: ID,
     Project: Project
 }

 type Query{
     getAllEmployees: [Employee],
     getEmployee(id: ID): Employee,
     getProject(id: ID): Project,
     getAllProjects: [Project]

 }

 input EmployeeInput{
    Name: String,
    Adress: String,
    Email: String,
    Hire_Date: String,
    Salary: Int,
    Job_Title: String,
    Project_id: String
 }

 input ProjectInput{
    Project_name: String,
    Start_date: String,
    Planned_end_date: String,
    Description: String,
    Project_code: String,
 }

 type Mutation{
     createEmployee(emp: EmployeeInput): Employee,
     updateEmployee(id: ID, emp: EmployeeInput): Employee,
     deleteEmployee(id: ID): Employee,
     createProject(proj: ProjectInput): Project,
     updateProject(id: ID, proj: ProjectInput): Project,
     deleteProject(id: ID):Project
 }
`;

module.exports = typeDefs