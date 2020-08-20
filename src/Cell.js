import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CellShape from './CellShape';

const getSelection = (selections, i, j) => {
  const selection = selections.find(item => {
    const { start, end } = item;
    const posX = j >= start.j && j <= end.j;
    const negX = j <= start.j && j >= end.j;
    const posY = i >= start.i && i <= end.i;
    const negY = i <= start.i && i >= end.i;

    return (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY);
  });
  return selection;
};

export default class Cell extends PureComponent {
  render() {
    const {
      cell,
      row,
      col,
      attributesRenderer,
      className,
      style,
      selected,
      selections,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      onContextMenu,
    } = this.props;

    const { colSpan, rowSpan } = cell;
    const attributes = attributesRenderer
      ? attributesRenderer(cell, row, col)
      : {};

    let styles = style;
    if (selections && selections.length > 0) {
      const otherSelection = getSelection(selections, row, col);
      if (!selected && otherSelection && otherSelection.color) {
        const RGB = otherSelection.color;
        const A = '0.15';
        const RGBA =
          'rgba(' +
          parseInt(RGB.substring(1, 3), 16) +
          ',' +
          parseInt(RGB.substring(3, 5), 16) +
          ',' +
          parseInt(RGB.substring(5, 7), 16) +
          ',' +
          A +
          ')';

        styles = {
          ...styles,
          border: '1px double ' + otherSelection.color,
          boxShadow: 'inset 0 -100px 0 ' + RGBA,
        };
      }
    }

    return (
      <td
        className={className}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={styles}
        {...attributes}
      >
        {this.props.children}
      </td>
    );
  }
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Cell.defaultProps = {
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: () => {},
};
