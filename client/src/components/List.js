import React, { Component } from 'react';
import {
  Popover,
  Position,
  Table,
} from 'evergreen-ui';

import Notes from './Notes';
import { debounce, throttle } from '../utils';

const CELL_SIZES = {
  small: 1,
  medium: 3,
  large: 6,
};

const COLUMNS = [
  { name: 'rank', size: 'small' },
  { name: 'winery', size: 'medium', align: 'left' },
  { name: 'wine', size: 'large', align: 'left' },
  { name: 'vintage', size: 'small' },
  { name: 'score', size: 'small' },
  { name: 'color', size: 'small' },
  { name: 'country', size: 'medium', align: 'left' },
  { name: 'region', size: 'medium', align: 'left' },
];

const tableCell = (isHeader, name, size, textAlign = 'center') => {
  const Cell = isHeader ? Table.TextHeaderCell : Table.TextCell;

  return (
    <Cell
      flex={CELL_SIZES[size]}
      textAlign={textAlign}
    >
      {isHeader ? name[0].toUpperCase() + name.slice(1) : name}
    </Cell>
  );
};

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

  debouncedMouseOver = debounce(id => {
    this.setState({ shown: id });
  }, 250);

  throttledScroll = throttle(() => {
    this.setState({ shown: null });
  }, 250);

  handleMouseOver = id => e => {
    this.debouncedMouseOver(id);
  };

  handleMouseLeave = e => {
    this.debouncedMouseOver(null);
  };

  handleScroll = e => {
    this.throttledScroll();
  };

  renderHeaders = () =>
    <Table.Head>
      {COLUMNS.map(({ name, size, align }) => tableCell(true, name, size, align))}
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
        cursor="pointer"
        isHighlighted={this.state.shown === wine.id}
        onMouseOver={this.handleMouseOver(wine.id)}
        onMouseLeave={this.handleMouseLeave}
      >
        {COLUMNS.map(({ name, size, align }) => tableCell(false, wine[name], size, align))}
      </Table.Row>
    </Popover>
  ));

  render() {
    return (
      <Table
        width="100%"
        border="default"
        onScroll={this.handleScroll}
      >
        {this.renderHeaders()}
        <Table.Body height="85vh">
          {this.renderTableRows()}
        </Table.Body>
      </Table>
    );
  }
}

export default List;
