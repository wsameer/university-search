import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ data }) => {
  const placeholderDesc = "This is a placeholder description becuase the university website had none.";
  const characterLimit = 160;

  return (
    data
      ? (
        <span title={data}>
          {data.length > characterLimit
            ? `${data.substring(0, characterLimit)}...`
            : data
          }
        </span>
      )
      : <span title={placeholderDesc}>{placeholderDesc}</span>
  );
};

Description.propTypes = {
  data: PropTypes.string
};

export default Description;