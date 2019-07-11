import React, { Component } from 'react';
import {
  majorScale,
  Pane,
  Popover,
  Position,
  Table,
} from 'evergreen-ui';
import _ from 'lodash';

import Notes from './Notes';

class List extends Component {
  state = {
    wines: [],
    shown: null,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('/api/wines')
      .then(res => res.json())
      .then(wines => this.setState({ wines }));
  };

  debouncedMouseOver = _.debounce((e, id) => {
    this.setState({ shown: id });
  }, 300);

  handleMouseOver = id => e => {
    e.persist();
    this.debouncedMouseOver(e, id);
  };

  handleMouseLeave = id => e => {
    if (id !== this.state.shown) {
      this.setState({ shown: null });
    }
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
        isShown={wine.id === this.state.shown}
        key={wine.id}
        trigger="hover"
        position={Position.BOTTOM}
        content={() => (
          <Notes
            id={wine.id}
            winery={wine.winery}
            wine={wine.wine}
            vintage={wine.vintage}
          />
        )}
      >
        <Table.Row
          data-id={wine.id}
          isSelectable
          onMouseOver={this.handleMouseOver(wine.id)}
          onMouseLeave={this.handleMouseLeave(wine.id)}
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
