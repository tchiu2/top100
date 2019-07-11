import React, { Component } from 'react';
import {
  majorScale,
  Heading,
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

  renderHeaders = () =>
    <Table.Head>
      <Table.TextHeaderCell textAlign="right">Rank</Table.TextHeaderCell>
      <Table.TextHeaderCell
        textAlign="right"
        flexBasis={10}
        flexShrink={0}
        flexGrow={1}
      >
        Score
      </Table.TextHeaderCell>
      <Table.TextHeaderCell
        flexBasis={200}
        flexShrink={0}
        flexGrow={1}
      >
        Winery
      </Table.TextHeaderCell>
      <Table.TextHeaderCell
        flexBasis={200}
        flexShrink={0}
        flexGrow={1}
      >
        Wine
      </Table.TextHeaderCell>
      <Table.TextHeaderCell textAlign="left">Vintage</Table.TextHeaderCell>
      <Table.TextHeaderCell textAlign="left">Color</Table.TextHeaderCell>
      <Table.TextHeaderCell textAlign="left">Country</Table.TextHeaderCell>
      <Table.TextHeaderCell textAlign="left">Region</Table.TextHeaderCell>
    </Table.Head>

    renderTableRows = () => this.state.wines.map(wine => (
      <Popover
        isShown={wine.id === this.state.shown}
        key={wine.id}
        trigger="hover"
        position={Position.BOTTOM}
        content={() => <Notes {...wine} />}
      >
        <Table.Row
          data-id={wine.id}
          isSelectable
          onMouseOver={this.handleMouseOver(wine.id)}
          onMouseLeave={this.handleMouseLeave(wine.id)}
        >
          <Table.TextCell textAlign="right">{wine.top100Rank}</Table.TextCell>
          <Table.TextCell
            textAlign="right"
            flexBasis={10}
            flexShrink={0}
            flexGrow={1}
          >
            {wine.score}
          </Table.TextCell>
          <Table.TextCell
            flexBasis={200}
            flexShrink={0}
            flexGrow={1}
            textAlign="left"
          >
            {wine.winery}
          </Table.TextCell>
          <Table.TextCell
            flexBasis={200}
            flexShrink={0}
            flexGrow={1}
            textAlign="left"
          >
            {wine.wine}
          </Table.TextCell>
          <Table.TextCell textAlign="left">{wine.vintage}</Table.TextCell>
          <Table.TextCell textAlign="left">{wine.color}</Table.TextCell>
          <Table.TextCell textAlign="left">{wine.country}</Table.TextCell>
          <Table.TextCell textAlign="left">{wine.region}</Table.TextCell>
        </Table.Row>
      </Popover>
    ));

  render() {
    return (
      <Pane
        margin={majorScale(2)}
      >
        <Heading
          size={900}
          textAlign="left"
          marginBottom={majorScale(2)}
        >
          Wine Spectator's Top 100
        </Heading>
        <Table>
          {this.renderHeaders()}
          <Table.Body height={840}>
            {this.renderTableRows()}
          </Table.Body>
        </Table>
      </Pane>
    );
  }
}

export default List;
