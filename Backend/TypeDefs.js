const {gql} = require('apollo-server-express')

const typeDefs = gql`
 type Employee{
     id: ID,
     Name: String,
     Adress: String,
     Email: String,
     Hire_date: String,
     Salary: Int,
     Job_title: String
 }
 type Query{
     getAllEmployees: [Employee],
     getEmployee(id: ID): Employee
 }

 input EmployeeInput{
    Name: String,
    Adress: String,
    Email: String,
    Hire_Date: String,
    Salary: Int,
    Job_Title: String
 }

 type Mutation{
     createEmployee(emp: EmployeeInput): Employee,
     updateEmployee(id: ID, emp: EmployeeInput): Employee,
     deleteEmployee(id: ID): Employee
 }
`;

module.exports = typeDefs