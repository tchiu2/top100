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
    tasterInitials: '',
  };

  componentDidMount() {
    fetch(`/api/note/${this.props.id}`)
      .then(res => res.json())
      .then(({ note, tasterInitials }) => this.setState({ note, tasterInitials }));
  }

  render() { 
    const { note, tasterInitials } = this.state;
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
        <Text dangerouslySetInnerHTML={{ __html: `${note} <i>-${tasterInitials}</i>` }} />
      </Pane>
    );
  }
}

export default Notes;
