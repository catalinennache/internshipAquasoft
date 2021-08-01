
import {NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap'

const NAVI_COMPONENT = function(){

    return (<div className="nav-container">
    <Nav variant="pills" >
      <Nav.Item>
        <NavLink exact to='/employees' activeClassName="active" className="nav-link">Employees</NavLink>
      </Nav.Item>
      <Nav.Item>
          <NavLink exact to='/projects' activeClassName="active" className="nav-link">Projects</NavLink>
      </Nav.Item>
     </Nav>
    </div>
  )
}
export default NAVI_COMPONENT