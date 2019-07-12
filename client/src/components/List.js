import React, { Component } from 'react';
import {
  Menu,
  Popover,
  Position,
  Table,
  TextDropdownButton,
} from 'evergreen-ui';

import Notes from './Notes';
import { debounce, throttle } from '../utils';

const CELL_SIZES = {
  small: 1,
  medium: 3,
  large: 6,
};

const COLUMNS = [
  { index: 1, name: 'rank', size: 'small', sortable: true },
  { index: 2, name: 'winery', size: 'medium', align: 'left' },
  { index: 3, name: 'wine', size: 'large', align: 'left' },
  { index: 4, name: 'vintage', size: 'small' },
  { index: 5, name: 'score', size: 'small', sortable: true },
  { index: 6, name: 'color', size: 'small' },
  { index: 7, name: 'country', size: 'medium', align: 'left' },
  { index: 8, name: 'region', size: 'medium', align: 'left' },
];

const ORDER = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
};

class List extends Component {
  state = {
    wines: [],
    shown: null,
    orderedColumn: 1,
    ordering: ORDER.NONE,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('/api/wines')
      .then(res => res.json())
      .then(wines => this.setState({ wines }));
  };

  sort = wines => {
    const { ordering, orderedColumn } = this.state;

    if (ordering === ORDER.NONE) return wines;

    const key = COLUMNS[orderedColumn - 1].name;

    return wines.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      const sortTable = { true: 1, false: -1 };

      if (ordering === ORDER.ASC) return aVal === bVal ? 0 : sortTable[aVal > bVal];

      return bVal === aVal ? 0 : sortTable[bVal > aVal];
    });
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

  createTableCell = (isHeader, name, size, textAlign = 'center', index, isSortable = true) => {
    const Cell = isHeader ? Table.TextHeaderCell : Table.TextCell;

    return (
      <Cell
        flex={CELL_SIZES[size]}
        textAlign={textAlign}
      >
        {!isHeader
          ? name
          : isSortable
            ? <Popover
                position={Position.BOTTOM_LEFT}
                content={({ close }) => (
                  <Menu>
                    <Menu.OptionsGroup
                      title="Order"
                      options={[
                        { label: 'Ascending', value: ORDER.ASC },
                        { label: 'Descending', value: ORDER.DESC },
                      ]}
                     selected={this.state.orderedColumn === index ? this.state.ordering : null}
                     onChange={value => {
                       this.setState({
                         orderedColumn: index,
                         ordering: value,
                       });

                       close();
                     }}
                    />
                  </Menu>
                )}
              >
                <TextDropdownButton
                >
                  {name[0].toUpperCase() + name.slice(1)}
                </TextDropdownButton>
              </Popover>
            : name[0].toUpperCase() + name.slice(1)
        }
      </Cell>
    );
  };

  renderHeaders = () =>
    <Table.Head>
      {COLUMNS.map(({ name, size, align, index, sortable }) =>
        this.createTableCell(true, name, size, align, index, sortable)
      )}
    </Table.Head>

  renderTableRows = () => this.sort(this.state.wines).map(wine => (
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
        {COLUMNS.map(({ name, size, align }) => this.createTableCell(false, wine[name], size, align))}
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
