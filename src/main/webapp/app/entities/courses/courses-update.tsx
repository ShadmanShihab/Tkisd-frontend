import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ICourses } from 'app/shared/model/courses.model';
import { getEntity, updateEntity, createEntity, reset } from './courses.reducer';

export const CoursesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.category.entities);
  const coursesEntity = useAppSelector(state => state.courses.entity);
  const loading = useAppSelector(state => state.courses.loading);
  const updating = useAppSelector(state => state.courses.updating);
  const updateSuccess = useAppSelector(state => state.courses.updateSuccess);

  const handleClose = () => {
    navigate('/courses' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.price !== undefined && typeof values.price !== 'number') {
      values.price = Number(values.price);
    }
    if (values.numberOfClasses !== undefined && typeof values.numberOfClasses !== 'number') {
      values.numberOfClasses = Number(values.numberOfClasses);
    }
    if (values.totalDuration !== undefined && typeof values.totalDuration !== 'number') {
      values.totalDuration = Number(values.totalDuration);
    }

    const entity = {
      ...coursesEntity,
      ...values,
      categoryId: categories.find(it => it.id.toString() === values.categoryId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...coursesEntity,
          categoryId: coursesEntity?.categoryId?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tkisdApp.courses.home.createOrEditLabel" data-cy="CoursesCreateUpdateHeading">
            <Translate contentKey="tkisdApp.courses.home.createOrEditLabel">Create or edit a Courses</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="courses-id"
                  label={translate('tkisdApp.courses.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('tkisdApp.courses.courseName')}
                id="courses-courseName"
                name="courseName"
                data-cy="courseName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.courses.description')}
                id="courses-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.courses.price')}
                id="courses-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.courses.numberOfClasses')}
                id="courses-numberOfClasses"
                name="numberOfClasses"
                data-cy="numberOfClasses"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.courses.totalDuration')}
                id="courses-totalDuration"
                name="totalDuration"
                data-cy="totalDuration"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="courses-categoryId"
                name="categoryId"
                data-cy="categoryId"
                label={translate('tkisdApp.courses.categoryId')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/courses" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CoursesUpdate;
