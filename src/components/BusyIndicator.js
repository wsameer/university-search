import React from 'react';
import { Spinner } from 'react-bootstrap';

const BusyIndicator = () => {
  return (
    <div>
      <Spinner animation="grow" />
    </div>
  )
};

export default BusyIndicator;
