import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Spinner } from 'react-bootstrap';
import Description from './Description';
import UniTitle from './UniTitle';
import UniCardWithError from './UniCardWithError';

const UniCard = ({ data }) => {
  // const api = 'https://uni-search-backend.herokuapp.com/api/universities';
  const api = 'http://localhost:8000/api/university/';
  const randomImage = "https://picsum.photos/300/200/";

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [ogData, setOgData] = useState();

  /**
   * GET all unique domains (only end)
   */
  async function getOpenGraphData(parameter) {
    const response = await fetch(`${api}${encodeURIComponent(parameter)}`);
    if (response.status === 200) {
      response
        .json()
        .then(res => {
          console.log(res);
          setErrors(null);
          setOgData(res.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setErrors({ status: 400, message: err });
          setOgData(null);
        });

    } else {
      console.log(response);
      setLoading(false);
      setErrors({ status: response.status, message: response.statusText });
      setOgData(null);
    }
  }

  useEffect(() => {
    setLoading(true);
    getOpenGraphData(data.web_page);
    return () => {
      setOgData(null);
      setLoading(false);
      setErrors(null);
    }
  }, [data])

  if (errors) {
    return (
      <UniCardWithError
        errors={errors}
        data={data}
      />
    );
  }

  return (
    <Col sm={4}>
      <Card className="uni-card">
        {ogData
          ? (
            <>
              <div className="country-code">
                {data.alpha_two_code}
              </div>
              {ogData.ogImage
                ? <Card.Img variant="top" src={ogData.ogImage} />
                : <Card.Img variant="top" src={randomImage} />
              }
              <Card.Body>
                <Card.Title>
                  <UniTitle title={ogData.ogTitle || data.name} />
                </Card.Title>
                <Card.Subtitle className="mb-2 mt-2 text-muted">
                  <Description data={ogData.ogDescription} />
                </Card.Subtitle>
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
  );
};

UniCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default UniCard;
