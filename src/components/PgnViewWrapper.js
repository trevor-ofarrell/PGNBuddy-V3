import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import * as uuid from 'uuid';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

import dynamic from 'next/dynamic';

const PgnViewer = dynamic(
  () => import('./PgnViewer'),
  { ssr: false },
);

const useStyles = makeStyles(() => ({
  pagination: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    width: '90%',
    paddingTop: '1em',
    marginLeft: '0em',
    marginRight: 'auto',
    color: 'white',
    fontSize: '1em',
    cursor: 'pointer',
    border: 'none',
  },
  active: {
    outline: 'none',
    border: '1px solid #fafafa',
    borderRadius: '50%',
    padding: '0.5em',
    marginTop: '-0.5em',
  },
  pagelink: {
    padding: '0.5em',
    border: 'none',
    outline: 'none',
  },
  button: {
    color: '#fafafa',
    borderColor: '#fafafa',
    textAlign: 'center',
    margin: '0.25em',
    marginTop: '0.5em',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
  },
}));

const PgnViewWrapper = ({ pgn }) => {
  const classes = useStyles();
  const pgnArray = [];

  const split = pgn.split(/\[Event /);

  if (split) {
    split.shift();
    if (split.length > 1) {
      split.forEach((item) => {
        pgnArray.push(`[Event ${item}`);
      });
    } else {
      pgnArray.push(split);
    }
  }

  const [pagination, setPagination] = useState({
    data: pgnArray.map((value) => (({
      id: `board-${uuid.v4()}`,
      title: 'board',
      body: `${value}`,
    }))),
    offset: 0,
    numberPerPage: 1,
    pageCount: 0,
    currentData: [],
  });

  const handlePageClick = (event) => {
    const { selected } = event;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData:
        prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage),
    }));
  }, [pagination.numberPerPage, pagination.offset]);

  return (
    <>
      {split.length > 1
        ? (
          <div>
            {pagination.currentData && pagination.currentData.map(((item) => (
              <div key={item.id}>
                <PgnViewer>
                  {item.body}
                </PgnViewer>
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={<PostAddIcon />}
                  onClick={
                    () => navigator.clipboard.writeText(item.body)
                  }
                >
                  copy current PGN
                </Button>
              </div>

            )))}
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              pageCount={pagination.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={classes.pagination}
              activeClassName={classes.active}
              pageLinkClassName={classes.pagelink}
              activeLinkClassName={classes.pagelink}
            />
          </div>
        )
        : (
          <PgnViewer>
            {pgn}
          </PgnViewer>
        )}
    </>
  );
};

export default PgnViewWrapper;
