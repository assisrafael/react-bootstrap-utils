import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'js-var-type';

import { sortData } from '../utils/sort';

import { Table } from './Table';

export function SortableTable({ columnHeaderFormat, docs, defaultSortOption, ..._props }) {
  const [sortOption, setSortOption] = useState(defaultSortOption);

  const sortedDocs = useMemo(() => {
    if (sortOption?.sortBy) {
      return sortData(docs, {
        sortBy: sortOption.sortBy,
        sortOrder: sortOption.sortOrder ?? 'ASC', // default case ASC
      });
    }

    return docs;
  }, [docs, sortOption]);

  const changeSort = useCallback((attribute) => {
    setSortOption((prevState) => {
      const attributeChanged = prevState?.sortBy !== attribute;
      const order = !attributeChanged && prevState?.sortOrder === 'DESC' ? 'ASC' : 'DESC';

      return {
        sortBy: attribute,
        sortOrder: order,
      };
    });
  }, []);

  const defaultHeaderContent = useCallback(
    (label, attribute, column) => {
      /* By default, if isSortable is not set to false,
       * it is assumed the column can be sorted */
      if (column?.isSortable === false) {
        return label;
      }

      const icon =
        sortOption?.sortBy === attribute ? (
          sortOption.sortOrder === 'DESC' ? (
            <i className="bi bi-arrow-up"></i>
          ) : (
            <i className="bi bi-arrow-down"></i> // default case ASC
          )
        ) : (
          <i className="bi bi-arrow-down-up"></i>
        );

      return icon;
    },
    [sortOption?.sortBy, sortOption?.sortOrder]
  );

  const renderHeaderContent = useCallback(
    (label, attribute, column) =>
      isFunction(columnHeaderFormat)
        ? columnHeaderFormat(label, attribute, column, sortOption)
        : defaultHeaderContent(label, attribute, column),
    [columnHeaderFormat, defaultHeaderContent, sortOption]
  );

  const buildSortingHeader = useCallback(
    (label, attribute, column) =>
      /* By default, if isSortable is not set to false,
       * it is assumed the column can be sorted */
      column?.isSortable === false ? (
        renderHeaderContent(label, attribute, column)
      ) : (
        <>
          <a
            href="#"
            className="mr-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeSort(attribute);
            }}
          >
            {renderHeaderContent(label, attribute, column)}
          </a>
          {label}
        </>
      ),
    [changeSort, renderHeaderContent]
  );

  return <Table docs={sortedDocs} columnHeaderFormat={buildSortingHeader} {..._props} />;
}

SortableTable.defaultSortOption = {
  defaultSortOption: {},
};

SortableTable.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object),
  columnHeaderFormat: PropTypes.func,
  defaultSortOption: PropTypes.shape({
    sortBy: PropTypes.string,
    sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
  }),
};
