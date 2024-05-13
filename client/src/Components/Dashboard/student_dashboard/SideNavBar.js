import React from 'react'
import { Link } from 'react-router-dom'

function SideNavBar() {
  return (
    <div className='col-lg-2 bg-danger'>
        <ul>
            <li>
                <Link to={'/profile'}>Profile</Link><br></br>
                <Link to={'/profile'} >Dashboard</Link>
            </li>
        </ul>
    </div>
  )
}

export default SideNavBar