import React, { Component } from 'react';
import {
  majorScale,
  Heading,
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
    const { wine, winery, vintage } = this.props;

    return (
      <Pane
        width={720}
        display="flex"
        padding={majorScale(2)}
        flexWrap="wrap"
      >
        <Heading>
          {winery} - {wine} ({vintage})
        </Heading>
        <Text dangerouslySetInnerHTML={{ __html: note }} />
      </Pane>
    );
  }
}

export default Notes;
