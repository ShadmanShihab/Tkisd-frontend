import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './courses.reducer';

export const CoursesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const coursesEntity = useAppSelector(state => state.courses.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="coursesDetailsHeading">
          <Translate contentKey="tkisdApp.courses.detail.title">Courses</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="tkisdApp.courses.id">Id</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.id}</dd>
          <dt>
            <span id="courseName">
              <Translate contentKey="tkisdApp.courses.courseName">Course Name</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.courseName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="tkisdApp.courses.description">Description</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.description}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="tkisdApp.courses.price">Price</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.price}</dd>
          <dt>
            <span id="numberOfClasses">
              <Translate contentKey="tkisdApp.courses.numberOfClasses">Number Of Classes</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.numberOfClasses}</dd>
          <dt>
            <span id="totalDuration">
              <Translate contentKey="tkisdApp.courses.totalDuration">Total Duration</Translate>
            </span>
          </dt>
          <dd>{coursesEntity.totalDuration}</dd>
          <dt>
            <Translate contentKey="tkisdApp.courses.categoryId">Category Id</Translate>
          </dt>
          <dd>{coursesEntity.categoryId ? coursesEntity.categoryId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/courses" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/courses/${coursesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CoursesDetail;
