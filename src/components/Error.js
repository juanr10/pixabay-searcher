import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name: Error.
 * @description: Display an error message.
 * @param: Message to display.
 * @return: Formatted message view.
 */
const Error = ({message}) => {
    return (
    <p className="text-center text-uppercase font-weight-bold alert alert-warning">{message}</p>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;