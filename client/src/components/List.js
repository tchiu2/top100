import React, { Component } from 'react';
import {
  Popover,
  Position,
  Table,
} from 'evergreen-ui';

import Notes from './Notes';
import { debounce, throttle } from '../utils';

const cellSizes = {
  small: 1,
  medium: 3,
  large: 6,
};

const TableCell = (isHeader, size, textAlign = 'center') => ({ children, ... props }) => {
  const Cell = isHeader ? Table.TextHeaderCell : Table.TextCell;

  return (
    <Cell
      flex={size}
      textAlign={textAlign}
      {...props}
    >
      {children}
    </Cell>
  );
};

const SmallHeaderCell = TableCell(true, cellSizes.small);
const MediumHeaderCell = TableCell(true, cellSizes.medium, 'left');
const LargeHeaderCell = TableCell(true, cellSizes.large, 'left');
const SmallBodyCell = TableCell(false, cellSizes.small);
const MediumBodyCell = TableCell(false, cellSizes.medium, 'left');
const LargeBodyCell = TableCell(false, cellSizes.large, 'left');

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
    console.log("scroll")
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
      <SmallHeaderCell>Rank</SmallHeaderCell>
      <MediumHeaderCell>Winery</MediumHeaderCell>
      <LargeHeaderCell>Wine</LargeHeaderCell>
      <SmallHeaderCell>Vintage</SmallHeaderCell>
      <SmallHeaderCell>Score</SmallHeaderCell>
      <SmallHeaderCell>Color</SmallHeaderCell>
      <MediumHeaderCell>Country</MediumHeaderCell>
      <MediumHeaderCell>Region</MediumHeaderCell>
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
        <SmallBodyCell>{wine.top100Rank}</SmallBodyCell>
        <MediumBodyCell>{wine.winery}</MediumBodyCell>
        <LargeBodyCell>{wine.wine}</LargeBodyCell>
        <SmallBodyCell>{wine.vintage}</SmallBodyCell>
        <SmallBodyCell>{wine.score}</SmallBodyCell>
        <SmallBodyCell>{wine.color}</SmallBodyCell>
        <MediumBodyCell>{wine.country}</MediumBodyCell>
        <MediumBodyCell>{wine.region}</MediumBodyCell>
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
