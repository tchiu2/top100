import React, { Component } from 'react';
import {
  majorScale,
  Pane,
  Text,
} from 'evergreen-ui';

class Notes extends Component {
  state = {
    note: '',
  };

  componentDidMount() {
    fetch(`/api/note/${this.props.id}`)
      .then(res => res.json())
      .then(({ note }) => this.setState({ note }));
  }

  render() { 
    const { note } = this.state;

    return (
      <Pane
        width={720}
        display="flex"
        padding={majorScale(2)}
        flexWrap="wrap"
      >
        <Text>
          {note}
        </Text>
      </Pane>
    );
  }
}

export default Notes;
