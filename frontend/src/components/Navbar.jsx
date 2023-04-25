import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaGithub } from 'react-icons/fa'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function NavBar() {

    const dispatch = useDispatch()

    const { user } =  useSelector((state) => state.auth)

    const handleLogout = (e) => {
        dispatch(logout())
        dispatch(reset())
    }

    return (
        <MDBNavbar expand='lg' dark bgColor='dark'>
            <MDBContainer fluid >
                <MDBNavbarBrand href='/'>Attendance Automation System (AAS)</MDBNavbarBrand>

                <MDBNavbarItem style={{
                    marginRight: 'auto',
                    display: 'flex',
                    alignItems: 'left'
                }} class>
                    <MDBNavbarLink href='https://www.github.com/AsyncXeNo/AttendanceAutomationSystem' tabIndex={-1} target='_blank' aria-disabled='true' >
                        <i className="fab fa-github" style={{
                            color: 'grey'
                        }}>Source Code</i>
                        
                    </MDBNavbarLink>
                </MDBNavbarItem>

                {/* <MDBNavbarToggler
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler> */}

                {/* <MDBCollapse navbar show={showBasic}> */}

                <div className="ml-auto">

                    <MDBNavbarNav className='mb-2 mb-lg-0'>
                        
                        <MDBNavbarItem>
                            <MDBNavbarLink aria-current='page' href='/'>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink href='/about'>
                                About
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        {user ? 
                        (<MDBNavbarItem>
                            <MDBNavbarLink href='/login' onClick={handleLogout} style={{
                                color: 'red'
                            }}>
                                Logout
                            </MDBNavbarLink>
                        </MDBNavbarItem>) 
                        : 
                        (<MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={{
                                    color: 'white'
                                }}>
                                    Login
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='/login/student'>Student</MDBDropdownItem>
                                    <MDBDropdownItem link href='/login/faculty'>Faculty</MDBDropdownItem>

                                    <MDBDropdownItem link href='/login/admin'>Admin</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>)}


                    </MDBNavbarNav>

                </div>

                {/* <form className='d-flex input-group w-auto'>
                    <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                    <MDBBtn color='primary'>Search</MDBBtn>
                </form> */}

                {/* </MDBCollapse> */}
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavBar