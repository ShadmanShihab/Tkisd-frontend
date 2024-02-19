import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstructor } from 'app/shared/model/instructor.model';
import { getEntity, updateEntity, createEntity, reset } from './instructor.reducer';

export const InstructorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const instructorEntity = useAppSelector(state => state.instructor.entity);
  const loading = useAppSelector(state => state.instructor.loading);
  const updating = useAppSelector(state => state.instructor.updating);
  const updateSuccess = useAppSelector(state => state.instructor.updateSuccess);

  const handleClose = () => {
    navigate('/instructor');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }
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
    if (values.grade !== undefined && typeof values.grade !== 'number') {
      values.grade = Number(values.grade);
    }
    if (values.userId !== undefined && typeof values.userId !== 'number') {
      values.userId = Number(values.userId);
    }

    const entity = {
      ...instructorEntity,
      ...values,
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
          ...instructorEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tkisdApp.instructor.home.createOrEditLabel" data-cy="InstructorCreateUpdateHeading">
            <Translate contentKey="tkisdApp.instructor.home.createOrEditLabel">Create or edit a Instructor</Translate>
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
                  id="instructor-id"
                  label={translate('tkisdApp.instructor.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('tkisdApp.instructor.instructorName')}
                id="instructor-instructorName"
                name="instructorName"
                data-cy="instructorName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.instructor.description')}
                id="instructor-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('tkisdApp.instructor.address')}
                id="instructor-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField
                label={translate('tkisdApp.instructor.phoneNo')}
                id="instructor-phoneNo"
                name="phoneNo"
                data-cy="phoneNo"
                type="text"
              />
              <ValidatedField
                label={translate('tkisdApp.instructor.grade')}
                id="instructor-grade"
                name="grade"
                data-cy="grade"
                type="text"
              />
              <ValidatedField
                label={translate('tkisdApp.instructor.userId')}
                id="instructor-userId"
                name="userId"
                data-cy="userId"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/instructor" replace color="info">
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

export default InstructorUpdate;
