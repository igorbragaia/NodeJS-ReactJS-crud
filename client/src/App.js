import React, { Component } from 'react';
import { Container, Menu, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

class App extends Component {
  state = {
      activeItem: "users",
      users: []
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

  fetchUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
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
            hello world 1
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
