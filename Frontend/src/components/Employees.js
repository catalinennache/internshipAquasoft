
import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import dataTables from 'datatables.net-bs5'
import { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap'
import DataAccessLayer from "../DataAccessLayer";
import { useHistory } from "react-router";



const EmployeesComponent = function(props){
    if(props.dispatch){
      DataAccessLayer.init(props.dispatch)
    }
    const history = useHistory();

    const [employees, projects] = useSelector((store)=>{return [store.employees, store.projects]});
    const modal_mv = {
        id:undefined,
        Name:undefined,
        Email:undefined,
        Adress:undefined,
        Salary:undefined,
        Job_Title:undefined,
        Hire_Date:undefined,
        Project_Ids:[]
    }
    const [state, setState] = useState({employee:modal_mv, addProjectDisabled:true, showpopup:false, showaddpopup:false, autocomplete_results:[]})

    const showEmployee = async (id) => {
      console.log("showing emp",id);
      let result = await DataAccessLayer.getEmployee(id) 
      console.log(this, result); console.log(result.data)
      setState({...state,employee:result.data.data.getEmployee,showpopup:true})
    }

    const autoComplete = (event) =>{
      let value = event.target.value.toLowerCase();
      let acr = projects.filter(prj=>{return (prj.Project_name.toLowerCase().indexOf(value)>-1  || prj.Project_code.toLowerCase().indexOf(value) > -1)})
                .filter(acr=>{return emp.Projects.map(pj=>pj.Project_code).indexOf(acr.Project_code)===-1}) || []

      setState({...state, autocomplete_results:acr, addProjectDisabled:true});
      $('#insert-input').removeAttr("project_id")
      $('#insert-input').removeAttr("project_name")
    }

    const selectProj = (event)=>{
       let project_name = $(event.target).attr("name");
       let project_id = $(event.target).attr("id");
       
       $('#insert-input').val(project_name)
       $('#insert-input').attr("project_id",project_id)
       $('#insert-input').attr("project_name",project_name)
       setState({...state,autocomplete_results:[], addProjectDisabled:false})
    }

    const addEmployee = async (event)=>{
      let infos = $('.new-employee-info input').map((idx,element)=>{
        let res = {}
        res[$(element).attr("name")] = $(element).val()
        return res
      })
      console.log(infos)
      let new_employee = Object.assign({}, ...infos);
      try{
         await DataAccessLayer.addEmployee(new_employee);
         setState({...state,showaddpopup:false})
         window.location.reload()
      }catch(e){
        alert(e)
        console.log(props)
      }
    }

    const deleteEmployee = async (id)=>{
      try{
        await DataAccessLayer.deleteEmployee(emp.id)
        setState({...state,showpopup:false})
      }catch(e){
        alert(e)
        console.log(props)
      }
    }

    const saveChanges = async () => {
      let infos = $('.info-edit input').map((idx,element)=>{
      let res = {}
      res[$(element).attr("name")] = $(element).val() || emp[$(element).attr("name")]
        return res
      })
      console.log(infos)
      let edited_employee = Object.assign({}, ...infos);
      await DataAccessLayer.updateEmployee($('.info-edit').attr("id"), edited_employee)
      window.location.reload()
    }

    const addProjectToEmployee = async (event)=>{
      let pid = $('#insert-input').attr("project_id")
      console.log(emp)
      emp.Projects.push(projects.find(pj=>pj.id === pid))
      console.log(emp.Projects, projects)
      await DataAccessLayer.updateEmployee(emp.id, {Project_ids:emp.Projects.map(p=>p.id)})
      setState({...state,employee:emp})
      autoComplete({target:{value:""}})
    }

    const unassignProject = async (ev) => {
      let pid = $(ev.target).closest("tr").attr("id")
      let pindex = emp.Projects.map(p=>p.id).indexOf(pid)
      emp.Projects.splice(pindex,1)
      
      await DataAccessLayer.updateEmployee(emp.id, {Project_ids:emp.Projects.map(p=>p.id)})
      setState({...state,employee:emp})
    }

    useEffect(()=>{
        $.DataTables = dataTables;
        $('#emp-table').DataTable({})
    },[])


    console.log(state)
    var emp = state.employee

    return (<> 
    <div className="employees-wrapper">
    <h1 className="table-title">AQUA Employees</h1>
      <div style={{margin:"0 auto",width:"max-content"}}>
        <table id="emp-table">
            <thead>  
            <tr>
                {['Name', 'Email', 'Adress', 'Hire Date', 'Salary', 'Job Title', 'Total Projects', 'Edit/Details'].map(col=><th key={col}>{col}</th>)}
            </tr>
            </thead>
            <tbody>
                {employees.map(emp=>
                <tr key={emp.id}>
                    <td>{emp.Name}</td>
                    <td>{emp.Email}</td>
                    <td>{emp.Adress}</td>
                    <td>{new Date(emp.Hire_Date).toLocaleDateString("en-GB")}</td>
                    <td>{emp.Salary}</td>
                    <td>{emp.Job_Title}</td>
                    <td>{emp.Total_Projects}</td>
                    <td><span className="btn btn-outline-primary info-btn"  onClick={()=>{showEmployee(emp.id)}}><i className="fas fa-info"></i></span></td>
                </tr>)}
            </tbody>
        </table>
        <button className="btn btn-outline-primary add-employee" onClick={()=>{setState({...state,showaddpopup:true})}}>Add Employee</button>
        </div>
    </div>
    
    <Modal show={state.showpopup}>
        <Modal.Header>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="info info-edit" id={emp.id}>
               <div>
                <label>Name</label>
                <input type="text" name="Name" placeholder={emp.Name}/>
               </div>
               <div>
                <label>Email</label>
                <input type="text" name="Email" placeholder={emp.Email}/>
               </div>
               <div>
                <label>Address</label>
                <input type="text" name="Adress" placeholder={emp.Adress}/>
               </div>
               <div>
                <label>Hire Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Hire_Date" onChange={()=>{}} value={(emp.Hire_Date?new Date(emp.Hire_Date):new Date()).toISOString().substr(0, 10)}/>
               </div>
               <div>
                <label>Salary</label>
                <input type="number" min="1" step="1" name="Salary" placeholder={emp.Salary}/>
               </div>
               <div>
                <label>Job Title</label>
                <input type="text" name="Job_Title" placeholder={emp.Job_Title}/>
               </div>
            </div>

            <div className="modal-projects">
              <h4>Employee's Projects</h4>
                <table id="modal-table">
                  <thead><tr>
                {['Name', 'Code',  'Options'].map(col=><th key={col}>{col}</th>)}
                </tr></thead>
                <tbody>
                  {(emp.Projects || []).map(project=>{
                      return (<tr id={project.id} key={project.id}>
                         <td>{project.Project_name}</td>
                         <td>{project.Project_code}</td>
                         <td className="modal-table-controls"><button className="btn btn-primary" onClick={(ev)=>{unassignProject(ev)}}>Unassign</button> <button className="btn btn-primary" onClick={()=>{history.push("/projects",{highlight:project.Project_code})}}>Go to</button></td>
                       </tr>)
                  })}
                </tbody>
                </table>
            </div>

            <div className="add-projects">
              
                  <div className="insert">
                    <input id="insert-input" onKeyUp={(event)=>{autoComplete(event)}} />
                    <ul className="autocomplete">
                       {state.autocomplete_results.map((acr)=>{
                         return <li key={acr.Project_code} onClick={(ev)=>{selectProj(ev)}} name={acr.Project_name} id={acr.id}>{acr.Project_name} - {acr.Project_code}</li>
                       })}
                    </ul>
                  </div>
                  <button  className="btn btn-primary add_proj" disabled={state.addProjectDisabled} style={{fontSize:"12px"}} onClick={(e)=>{console.log("adding");addProjectToEmployee(e)}}>Add Project</button>
            </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setState({...state,showpopup:false}); window.location.reload()}}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{deleteEmployee(emp.id);}}>
            Delete
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={state.showaddpopup} onHide={console.log}>
        <Modal.Header>
          <Modal.Title>New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="info new-employee-info">
               <div>
                <label>Name</label>
                <input type="text" name="Name" />
               </div>
               <div>
                <label>Email</label>
                <input type="text" name="Email" />
               </div>
               <div>
                <label>Address</label>
                <input type="text" name="Adress"/>
               </div>
               <div>
                <label>Hire Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Hire_Date" />
               </div>
               <div>
                <label>Salary</label>
                <input type="number" min="1" step="1" name="Salary" />
               </div>
               <div>
                <label>Job Title</label>
                <input type="text" name="Job_Title"/>
               </div>
            </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setState({...state,showaddpopup:false})}}>
            Close
          </Button>
          <Button variant="primary" onClick={addEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>


     </>)
}


export default connect() (EmployeesComponent)