import { useSelector, connect } from "react-redux"
import $ from 'jquery'
import dataTables from 'datatables.net-bs5'
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {Modal, Button} from 'react-bootstrap'
import DataAccessLayer from "../DataAccessLayer";


const ProjectsComponent = function(props){
    if(props.dispatch){
        DataAccessLayer.init(props.dispatch)
    }
    const modal_mv = {
        id:undefined,
        Project_code:undefined,
        Project_name:undefined,
        Start_date:undefined,
        Planned_end_date:undefined
    }
    const projects = useSelector((state)=>{return state.projects});
    const data = useLocation().state;
    const [state,setState] = useState({project:modal_mv,showaddpopup:false,showeditpopup:false});
    var project = state.project

    useEffect(()=>{
        $.DataTables = dataTables;
        let table = $('#proj-table').DataTable({})
        if(data && table){
            table.search(data.highlight).draw();
        }
    },[]);

    const showProject = async (project)=>{
        console.log("showing project")
        setState({project,showeditpopup:true,showaddpopup:false})
    }

    const addProject = async ()=>{
        let infos = $('.new-employee-info input').map((idx,element)=>{
            let res = {}
            res[$(element).attr("name")] = $(element).val()
            return res
        })
          console.log(infos)
          let new_project = Object.assign({}, ...infos);
          try{
             await DataAccessLayer.addProject(new_project);
             setState({...state,showaddpopup:false})
          }catch(e){
            alert(e)
            console.log(props)
          }
    }

    const saveChanges = async ()=>{
      let infos = $('.info-edit input').map((idx,element)=>{
      let res = {}
      res[$(element).attr("name")] = $(element).val() || project[$(element).attr("name")]
        return res
      })
      console.log(infos)
      let edited_project = Object.assign({}, ...infos);
      await DataAccessLayer.updateProject($('.info-edit').attr("id"), edited_project)
      window.location.reload()
    }

    const deleteProject = async (id)=>{
        await DataAccessLayer.deleteProject(id);
        setState({...state,showeditpopup:false})
    }
   

    return (<> 
    <div className="projects-wrapper">
    <h1 className="table-title">AQUA Projects</h1>
        <div style={{margin:"0 auto",width:"max-content"}}>
        <table id="proj-table">
            <thead>  
            <tr>
                {['Name', 'Code', 'Start Date', 'End Date', 'Details'].map(col=><th key={col}>{col}</th>)}
            </tr>
            </thead>
            <tbody>
                {projects.map(pj=>
                <tr id={pj.id} key={pj.id}>
                    <td>{pj.Project_name}</td>
                    <td>{pj.Project_code}</td>
                    <td>{pj.Start_date?new Date(pj.Start_date).toISOString().substr(0, 10):"-"}</td>
                    <td>{pj.Planned_end_date?new Date(pj.Planned_end_date).toISOString().substr(0, 10):"-"}</td>
                    <td><span className="btn btn-outline-primary info-btn" onClick={()=>{showProject(pj)}}><i className="fas fa-info"></i></span></td>
                </tr>)}
            </tbody>
        </table>

        <button className="btn btn-outline-primary add-project" onClick={()=>{setState({...state,showaddpopup:true})}}>Add Project</button>
        </div>
    </div>
    
    <Modal show={state.showeditpopup}>
        <Modal.Header>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="info info-edit" id={project.id}>
               <div>
                <label>Name</label>
                <input type="text" name="Project_name" placeholder={project.Project_name}/>
               </div>
               <div>
                <label>Code</label>
                <input type="text" name="Project_code" placeholder={project.Project_code}/>
               </div>
       
               <div>
                <label>Start Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Start_date"  defaultValue={(project.Start_date?new Date(project.Start_date):new Date()).toISOString().substr(0, 10)}/>
               </div>
               <div>
                <label>Planned End Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Planned_end_date"  defaultValue={(project.Planned_end_date?new Date(project.Planned_end_date):new Date()).toISOString().substr(0, 10)}/>
               </div>
        
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setState({...state,showeditpopup:false}); window.location.reload()}}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{deleteProject(project.id);}}>
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
                <input type="text" name="Project_name" />
               </div>
               <div>
                <label>Code</label>
                <input type="text" name="Project_code" />
               </div>
       
               <div>
                <label>Hire Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Start_date"/>
               </div>
               <div>
                <label>Hire Date</label>
                <input style={{minWidth:"185px"}} type="date" name="Planned_end_date" />
               </div>
        
            
            </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setState({...state,showaddpopup:false})}}>
            Close
          </Button>
          <Button variant="primary" onClick={addProject}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>


    
     </>)
}
export default connect() (ProjectsComponent)
