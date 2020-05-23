import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = (props) => {

  const [keyword, setKeyword] = useState('');

  const onInputChange = (event) => setKeyword(event.target.value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      return props.handleFiltersChange(event)
    }
  };

  return (
    <Form.Row>
      <Form.Group as={Col} sm={12} md={6} controlId="formGridSearchName">
        <Form.Control
          type="text"
          name="name"
          placeholder="Search university name"
          value={keyword}
          onChange={(event) => onInputChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
        />
      </Form.Group>

      <Form.Group as={Col} sm={6} md={3} controlId="formGridCountryCode">
        <Form.Control
          as="select"
          name="code"
          value={props.selectedCountryCode}
          onChange={(event) => props.handleFiltersChange(event)}>
          <option>All</option>
          {props.countryCodes.map((code, index) => <option key={index}>{code}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} sm={6} md={3} controlId="formGridDomain">
        <Form.Control
          as="select"
          name="domain"
          value={props.selectedDomain}
          onChange={(event) => props.handleFiltersChange(event)}>
          <option>All</option>
          {props.domains.map((domain, index) => <option key={index}>{domain}</option>)}
        </Form.Control>
      </Form.Group>
    </Form.Row>
  )
};

Filters.propTypes = {
  domains: PropTypes.array.isRequired,
  selectedDomain: PropTypes.string.isRequired,
  countryCodes: PropTypes.array.isRequired,
  selectedCountryCode: PropTypes.string.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  handleFiltersChange: PropTypes.func.isRequired,
};

export default Filters;
