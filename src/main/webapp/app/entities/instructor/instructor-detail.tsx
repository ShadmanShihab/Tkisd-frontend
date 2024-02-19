import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './instructor.reducer';

export const InstructorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const instructorEntity = useAppSelector(state => state.instructor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="instructorDetailsHeading">
          <Translate contentKey="tkisdApp.instructor.detail.title">Instructor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="tkisdApp.instructor.id">Id</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.id}</dd>
          <dt>
            <span id="instructorName">
              <Translate contentKey="tkisdApp.instructor.instructorName">Instructor Name</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.instructorName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="tkisdApp.instructor.description">Description</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.description}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="tkisdApp.instructor.address">Address</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.address}</dd>
          <dt>
            <span id="phoneNo">
              <Translate contentKey="tkisdApp.instructor.phoneNo">Phone No</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.phoneNo}</dd>
          <dt>
            <span id="grade">
              <Translate contentKey="tkisdApp.instructor.grade">Grade</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.grade}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="tkisdApp.instructor.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{instructorEntity.userId}</dd>
        </dl>
        <Button tag={Link} to="/instructor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/instructor/${instructorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InstructorDetail;
