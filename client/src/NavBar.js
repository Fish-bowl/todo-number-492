import React from 'react'
import {
  Menu, 
  Button,
  Form,
} from 'semantic-ui-react'

export default class NavBar extends React.Component {
  render() {
    return (
      <Menu
        color='violet'
      >
        <Button primary>Home</Button>
        <Menu.Item 
          as='a'
          link='/'
        >
        Todo
        </Menu.Item>
      </Menu>  
    
    )
  }
}
