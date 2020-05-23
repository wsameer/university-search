import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ error, closeError }) => {

  return (
    <Alert variant="danger" onClose={() => closeError()} dismissible>
      <Alert.Heading>[{error.status}]: Oh snap! You got an error!</Alert.Heading>
      <p>{error.message}</p>
    </Alert>
  )
};

ErrorAlert.propTypes = {
  error: PropTypes.object.isRequired,
  closeError: PropTypes.func.isRequired
};

export default ErrorAlert
