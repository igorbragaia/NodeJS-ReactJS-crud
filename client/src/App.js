import React, { Component } from 'react';
import { Container, Menu, Table, Form, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
      activeItem: "users",
      users: [],
      name: "Igor Bragaia",
      email: "igor.bragaia@gmail.com",
  }

  handleItemClick = (e, {name}) => {
    switch (name) {
      case "users":
        this.fetchUsers();
        this.setState({activeItem: name});
        break;
    }
    this.setState({activeItem: name});
  }

  handleSubscribeClick = (event) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email
      })
    };

    fetch('/users', options)
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(() => {
        console.log('failed to fetch users');
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  fetchUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(() => {
        console.log('failed to fetch users');
      });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { passwords, activeItem } = this.state;
    const menu = <div>
                  <Menu tabular>
                    <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
                    <Menu.Item name='subscribe' active={activeItem === 'subscribe'} onClick={this.handleItemClick} />
                  </Menu>
                </div>;

    let content;
    switch (activeItem) {
      case "subscribe":
        content =
          <div>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input name='name' onChange={this.handleChange} placeholder='Igor Bragaia' />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input name='email' onChange={this.handleChange} placeholder='igor.bragaia@gmail.com' />
              </Form.Field>
              <Button onClick={this.handleSubscribeClick}>Submit</Button>
            </Form>
          </div>;
        break;
      case "users":
        const users = this.state.users.map((user) =>
            <Table.Row negative>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
        );
        content =
          <div>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users}
              </Table.Body>
            </Table>
          </div>;
        break;
      default:
        content =
          <div>
          </div>
    };

    return (
      <div>
        <Container>
          {menu}
          {content}
        </Container>
      </div>
    );
  }
}

export default App;
