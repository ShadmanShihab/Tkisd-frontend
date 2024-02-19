import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './orders.reducer';

export const OrdersDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ordersEntity = useAppSelector(state => state.orders.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ordersDetailsHeading">
          <Translate contentKey="tkisdApp.orders.detail.title">Orders</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="tkisdApp.orders.id">Id</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.id}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="tkisdApp.orders.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.amount}</dd>
          <dt>
            <span id="trxType">
              <Translate contentKey="tkisdApp.orders.trxType">Trx Type</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.trxType}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="tkisdApp.orders.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.userId}</dd>
          <dt>
            <Translate contentKey="tkisdApp.orders.courseId">Course Id</Translate>
          </dt>
          <dd>{ordersEntity.courseId ? ordersEntity.courseId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/orders" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/orders/${ordersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrdersDetail;
