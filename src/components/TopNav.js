import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar'

const TopNav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Uni Search</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Developed By {': '}
          <a
            href="https://wsameer.github.io/v1/"
            target="_blank"
            rel="noopener noreferrer">
            Sameer Waskar
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopNav
