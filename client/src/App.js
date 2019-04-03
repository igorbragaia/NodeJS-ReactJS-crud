import React, { Component } from 'react';
import { Container, Menu, Table, Form, Button, Icon, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteUserClick = this.handleDeleteUserClick.bind(this);
  }

  state = {
      activeItem: "getUsers",
      users: [],
      name: "Igor Bragaia",
      email: "igor.bragaia@gmail.com",
      loading: false,
  }

  handleItemClick = (e, {name}) => {
    switch (name) {
      case "getUsers":
        this.fetchUsers();
        this.setState({activeItem: name});
        break;
    }
    this.setState({activeItem: name});
  }

  handleDeleteUserClick = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      })
    };

    fetch('/users/:id', options)
      .then(res => res.text())
      .then(res => this.fetchUsers())
      .catch(() => {
        console.log('failed to fetch users');
      });
  }

  handleSubscribeClick = (event) => {
    this.setState({loading: true});

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
      .then(res => this.fetchUsers())
      .catch(() => {
        console.log('failed to fetch users');
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  fetchUsers = () => {
    if(!this.state.loading)
      this.setState({loading: true});
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users, loading: false, activeItem: "getUsers" })
      })
      .catch(() => {
        console.log('failed to fetch users')
        this.setState({ loading: false })
      });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { passwords, activeItem } = this.state;
    const menu = <div>
                  <Menu tabular>
                    <Menu.Item name='getUsers' active={activeItem === 'getUsers'} onClick={this.handleItemClick} />
                    <Menu.Item name='createUser' active={activeItem === 'createUser'} onClick={this.handleItemClick} />
                  </Menu>
                </div>;

    let content;
    if(this.state.loading){
        content =
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>
    } else {
        switch (activeItem) {
          case "createUser":
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
              <Button onClick={this.handleSubscribeClick}>Subscribe</Button>
            </Form>
          </div>;
          break;
          case "getUsers":
          const users = this.state.users.map((user) =>
          <Table.Row>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell><Button circular icon='remove user' onClick={() => this.handleDeleteUserClick(user.id)}/></Table.Cell>
          </Table.Row>
        );
        content =
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
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
      }
    }
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
