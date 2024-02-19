import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICourses } from 'app/shared/model/courses.model';
import { getEntities as getCourses } from 'app/entities/courses/courses.reducer';
import { IOrders } from 'app/shared/model/orders.model';
import { TrxType } from 'app/shared/model/enumerations/trx-type.model';
import { getEntity, updateEntity, createEntity, reset } from './orders.reducer';

export const OrdersUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courses = useAppSelector(state => state.courses.entities);
  const ordersEntity = useAppSelector(state => state.orders.entity);
  const loading = useAppSelector(state => state.orders.loading);
  const updating = useAppSelector(state => state.orders.updating);
  const updateSuccess = useAppSelector(state => state.orders.updateSuccess);
  const trxTypeValues = Object.keys(TrxType);

  const handleClose = () => {
    navigate('/orders' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourses({}));
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
    if (values.amount !== undefined && typeof values.amount !== 'number') {
      values.amount = Number(values.amount);
    }
    if (values.userId !== undefined && typeof values.userId !== 'number') {
      values.userId = Number(values.userId);
    }

    const entity = {
      ...ordersEntity,
      ...values,
      courseId: courses.find(it => it.id.toString() === values.courseId.toString()),
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
          trxType: 'BKASH',
          ...ordersEntity,
          courseId: ordersEntity?.courseId?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tkisdApp.orders.home.createOrEditLabel" data-cy="OrdersCreateUpdateHeading">
            <Translate contentKey="tkisdApp.orders.home.createOrEditLabel">Create or edit a Orders</Translate>
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
                  id="orders-id"
                  label={translate('tkisdApp.orders.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('tkisdApp.orders.amount')}
                id="orders-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('tkisdApp.orders.trxType')}
                id="orders-trxType"
                name="trxType"
                data-cy="trxType"
                type="select"
              >
                {trxTypeValues.map(trxType => (
                  <option value={trxType} key={trxType}>
                    {translate('tkisdApp.TrxType.' + trxType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label={translate('tkisdApp.orders.userId')} id="orders-userId" name="userId" data-cy="userId" type="text" />
              <ValidatedField
                id="orders-courseId"
                name="courseId"
                data-cy="courseId"
                label={translate('tkisdApp.orders.courseId')}
                type="select"
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/orders" replace color="info">
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

export default OrdersUpdate;
