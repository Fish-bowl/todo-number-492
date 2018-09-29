import React from 'react';
import { Form, Header, Container, List, Input, Segment, Icon, Card, CardGroup, CardContent, CardMeta, CardHeader, Button, } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
  complete: { 
    textDecoration: 'line-through', 
    color: '#9a0007',
    backgroundColor: '#9a0007'
 }
}

class App extends React.Component {
  state = { name: '', todos: [] }

  componentDidMount() {
    axios.get('/api/todos')
      .then(({ data: todos }) => this.setState({ todos }))
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, todos } = this.state;
    axios.post('/api/todos', { name })
      .then(({ data }) => {
        this.setState({ todos: [data, ...todos], name: '' })
      })
  }

  // editTodo = id => {
  //   axios.put(`/api/todos/${id}`)
  //     .then(({ data }) => {
  //       const todos = this.state.todos
  //     })
  // }

  updateTodo = id => {
    axios.put(`/api/todos/${id}`)
      .then(({ data }) => {
        const todos = this.state.todos.map(todo => {
          if (todo.id === id)
            return data
          return todo
        });

        this.setState({ todos });
      });
  }

  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then( res => {
        const todos = this.state.todos.filter( todo => {
          if (todo.id !== id)
            return todo
        })
        this.setState({ todos })
      })
  }

  render() {
    const { name, todos } = this.state;
    return (
      <Container>
        <Segment 
          textAlign="center" 
          style={{
            backgroundColor: '#29434e'
          }}
        >
          <Header
            style={{
              color: 'white'
            }}
            as="h2" 
            textAlign="center"
            >
            Todo List
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Input
              required
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Form>
          <br />
          <CardGroup
            itemsPerRow='four wide column'
            raised
            stackable
            style= {{

            }}
          >
            
            
              {todos.map(todo =>
              <Card
                inverted
                style={{
                  backgroundColor: '#388e3c',
                }}
              >
              <CardContent
                key={todo.id}
                style={todo.complete ? styles.complete : {}}
                onClick={() => this.updateTodo(todo.id)}
                
              >
                <CardHeader
                  as='h2'
                  style={{
                    color: 'white',
                  }}
                >
                  {todo.name} 
                </CardHeader>
                <CardMeta>
                  <br />
                  <Button 
                      color='#388e3c'
                    icon
                    onClick={() => this.deleteTodo(todo.id)}
                  >
                      <Icon
                        name='trash'
                        

                        style={{
                          color: 'black',
                        }}
                      />
                  </Button>
                  
                </CardMeta>
              </CardContent>
              </Card>
            )}
            
          </CardGroup>
        </Segment>
      </Container>
    );
  }
}

export default App;
