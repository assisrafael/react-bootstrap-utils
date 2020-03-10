import React from 'react';
import PropTypes from 'prop-types';

export function Pagination({
  actualPage,
  ariaLabel,
  firstLabel,
  lastLabel,
  lastPage,
  maxPageWindow,
  nextLabel,
  onSelect,
  previousLabel,
}) {
  const pageWindow = Math.min(maxPageWindow, lastPage);
  const centerOfPageWindow = Math.max(Math.floor(pageWindow / 2), 2);
  const lastStartPage = Math.max(lastPage - pageWindow + 1, 1);
  const startPage = Math.max(Math.min(actualPage - centerOfPageWindow, lastStartPage), 1);
  const showPreviousNavigation = startPage > 1;

  const pages = Array.from(
    {
      length: pageWindow,
    },
    (v, i) => startPage + i
  );

  const select = (page) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(page);
  };

  return (
    <nav aria-label={ariaLabel}>
      <ul className="pagination">
        {showPreviousNavigation && (
          <React.Fragment>
            <li className="page-item">
              <a className="page-link" href="" onClick={select(1)} aria-label={firstLabel}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">{firstLabel}</span>
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="" onClick={select(actualPage - 1)} aria-label={previousLabel}>
                <span aria-hidden="true">&lsaquo;</span>
                <span className="sr-only">{previousLabel}</span>
              </a>
            </li>
          </React.Fragment>
        )}

        {pages.map((page) => (
          <li key={`pages-${page}`} className={`page-item${actualPage === page ? ' active' : ''}`}>
            <a className="page-link" href="" onClick={select(page)}>
              {page}
            </a>
          </li>
        ))}

        {startPage < lastStartPage && (
          <React.Fragment>
            <li className="page-item">
              <a className="page-link" href="" onClick={select(actualPage + 1)} aria-label={nextLabel}>
                <span aria-hidden="true">&rsaquo;</span>
                <span className="sr-only">{nextLabel}</span>
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="" onClick={select(lastPage)} aria-label={lastLabel}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">{lastLabel}</span>
              </a>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

Pagination.defaultProps = {
  actualPage: 1,
  ariaLabel: 'Page navigation',
  firstLabel: 'First',
  lastLabel: 'Last',
  maxPageWindow: 5,
  nextLabel: 'Next',
  previousLabel: 'Previous',
};

Pagination.propTypes = {
  actualPage: PropTypes.number,
  ariaLabel: PropTypes.string,
  firstLabel: PropTypes.string,
  lastLabel: PropTypes.string,
  lastPage: PropTypes.number,
  maxPageWindow: PropTypes.number,
  nextLabel: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  previousLabel: PropTypes.string,
};
