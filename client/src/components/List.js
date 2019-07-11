import React, { Component } from 'react';
import {
  majorScale,
  Pane,
  Popover,
  Position,
  Table,
} from 'evergreen-ui';

import Notes from './Notes';

class List extends Component {
  state = {
    wines: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('/api/wines')
      .then(res => res.json())
      .then(wines => this.setState({ wines }));
  };

  render() {
    const headers = (
      <Table.Head>
        <Table.TextHeaderCell>Rank</Table.TextHeaderCell>
        <Table.TextHeaderCell>Score</Table.TextHeaderCell>
        <Table.TextHeaderCell>Winery</Table.TextHeaderCell>
        <Table.TextHeaderCell>Wine</Table.TextHeaderCell>
        <Table.TextHeaderCell>Vintage</Table.TextHeaderCell>
        <Table.TextHeaderCell>Color</Table.TextHeaderCell>
        <Table.TextHeaderCell>Country</Table.TextHeaderCell>
        <Table.TextHeaderCell>Region</Table.TextHeaderCell>
      </Table.Head>
    );
    const rows = this.state.wines.map(wine => (
      <Popover
        key={wine.id}
        trigger="hover"
        position={Position.BOTTOM}
        content={() => <Notes id={wine.id} />}
      >
        {({ isShown, toggle, getRef }) => (
        <Table.Row
          onMouseOver={() => !isShown && toggle()}
          onMouseLeave={() => isShown && toggle()}
          isSelectable
          innerRef={ref => getRef(ref)}
        >
          <Table.TextCell>{wine.top100Rank}</Table.TextCell>
          <Table.TextCell>{wine.score}</Table.TextCell>
          <Table.TextCell>{wine.winery}</Table.TextCell>
          <Table.TextCell>{wine.wine}</Table.TextCell>
          <Table.TextCell>{wine.vintage}</Table.TextCell>
          <Table.TextCell>{wine.color}</Table.TextCell>
          <Table.TextCell>{wine.country}</Table.TextCell>
          <Table.TextCell>{wine.region}</Table.TextCell>
        </Table.Row>
        )}
      </Popover>
    ));

    return (
      <Pane
        margin={majorScale(2)}
      >
        <Table>
          {headers}
          <Table.Body height={640}>
            {rows}
          </Table.Body>
        </Table>
      </Pane>
    );
  }
}

export default List;
