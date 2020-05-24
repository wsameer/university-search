import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const Filters = (props) => {

  const {
    handleFiltersChange,
    selectedCountryCode,
    countryCodes,
    selectedDomain,
    domains
  } = props;

  // to locally store the keyword while the user is typing
  const [keyword, setKeyword] = useState('');

  /**
   * update the keyword while the user is typing
   * @param {object} event The DOM event
   */
  const onInputChange = (event) => setKeyword(event.target.value);

  /**
   * To handle the enter key press event signalling that the 
   * user has completed typing and wants data
   * @param {object} event The DOM event
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      return handleFiltersChange(event)
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
          value={selectedCountryCode}
          onChange={(event) => handleFiltersChange(event)}>
          <option>All</option>
          {countryCodes.map((code, index) => <option key={index}>{code}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} sm={6} md={3} controlId="formGridDomain">
        <Form.Control
          as="select"
          name="domain"
          value={selectedDomain}
          onChange={(event) => handleFiltersChange(event)}>
          <option>All</option>
          {domains.map((domain, index) => <option key={index}>{domain}</option>)}
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
  handleFiltersChange: PropTypes.func.isRequired,
};

export default Filters;
