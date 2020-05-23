import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Spinner, Alert } from 'react-bootstrap';
import UniTitle from './UniTitle';
import { RANDOM_IMAGE } from '../constants';

const UniCardWithError = ({ data, errors }) => {
  return (
    <Col sm={4}>
      <Card className="uni-card">
        {data
          ? (
            <>
              <div className="country-code">
                {data.alpha_two_code}
              </div>
              <Card.Img variant="top" src={RANDOM_IMAGE} />
              <Card.Body>
                <Card.Title>
                  <UniTitle title={data.name} />
                </Card.Title>
                <Alert variant="danger">
                  <strong className="d-none d-md-block">
                    [{errors.status}]: {errors.message}
                  </strong>
                  <small className="mb-2">
                    <strong>{data.web_page}</strong>'s server IP address could not be found.
                  </small>
                </Alert>
              </Card.Body>
              <Card.Footer>
                <Card.Link href={data.web_page} target="_blank">Read more</Card.Link>
              </Card.Footer>
            </>
          )
          : <div className="spinner-wrapper"><Spinner animation="grow" /></div>
        }
      </Card>
    </Col>
  )
}

UniCardWithError.propTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default UniCardWithError
