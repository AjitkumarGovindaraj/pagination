import React, { Fragment } from 'react';
import {
  useTable,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex},
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useExpanded,
    usePagination
  );


  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
        <thead style ={{background :'orange'}}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr style={
                        i % 2 === 0
                          ? { background: 'lightgrey' }
                          : { background: '#fff' }
                      } >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
    
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;