import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './instructor.reducer';

export const Instructor = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const instructorList = useAppSelector(state => state.instructor.entities);
  const loading = useAppSelector(state => state.instructor.loading);
  const links = useAppSelector(state => state.instructor.links);
  const updateSuccess = useAppSelector(state => state.instructor.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="instructor-heading" data-cy="InstructorHeading">
        <Translate contentKey="tkisdApp.instructor.home.title">Instructors</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="tkisdApp.instructor.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/instructor/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tkisdApp.instructor.home.createLabel">Create new Instructor</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={instructorList ? instructorList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {instructorList && instructorList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="tkisdApp.instructor.id">Id</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('instructorName')}>
                    <Translate contentKey="tkisdApp.instructor.instructorName">Instructor Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('instructorName')} />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    <Translate contentKey="tkisdApp.instructor.description">Description</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                  </th>
                  <th className="hand" onClick={sort('address')}>
                    <Translate contentKey="tkisdApp.instructor.address">Address</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('address')} />
                  </th>
                  <th className="hand" onClick={sort('phoneNo')}>
                    <Translate contentKey="tkisdApp.instructor.phoneNo">Phone No</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('phoneNo')} />
                  </th>
                  <th className="hand" onClick={sort('grade')}>
                    <Translate contentKey="tkisdApp.instructor.grade">Grade</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('grade')} />
                  </th>
                  <th className="hand" onClick={sort('userId')}>
                    <Translate contentKey="tkisdApp.instructor.userId">User Id</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('userId')} />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {instructorList.map((instructor, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/instructor/${instructor.id}`} color="link" size="sm">
                        {instructor.id}
                      </Button>
                    </td>
                    <td>{instructor.instructorName}</td>
                    <td>{instructor.description}</td>
                    <td>{instructor.address}</td>
                    <td>{instructor.phoneNo}</td>
                    <td>{instructor.grade}</td>
                    <td>{instructor.userId}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/instructor/${instructor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/instructor/${instructor.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          onClick={() => (window.location.href = `/instructor/${instructor.id}/delete`)}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="tkisdApp.instructor.home.notFound">No Instructors found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Instructor;
