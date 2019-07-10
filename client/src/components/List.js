import React, { Component } from 'react';

class List extends Component {
  state = {
    data: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('/api')
      .then(res => res.json())
      .then(data => this.setState({ data: data.express }));
  };

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  }
}

export default List;
