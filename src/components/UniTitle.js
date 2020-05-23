import React from 'react'
import PropTypes from 'prop-types'

const UniTitle = ({ title }) => {
  const characterLimit = 80;

  return (
    <span title={title}>
      {title.length > characterLimit
        ? `${title.substring(0, characterLimit)}...`
        : title
      }
    </span>
  )
}

UniTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default UniTitle
