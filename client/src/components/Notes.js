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
    const {
      wine,
      winery,
      vintage,
      region,
      country,
    } = this.props;

    return (
      <Pane
        width={720}
        padding={majorScale(2)}
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
      >
        <Heading>
          {vintage} {wine}, {winery}
        </Heading>
        <Text color="muted" size={400}>
          {region}, {country}
        </Text>
        <Text dangerouslySetInnerHTML={{ __html: note }} />
      </Pane>
    );
  }
}

export default Notes;
