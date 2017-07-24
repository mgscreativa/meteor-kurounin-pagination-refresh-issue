import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonBar = props => (
  <div className="m-r-2">
    {_.map(props.buttonsConfig, (button, index, collection) => {
      let onClick = null;
      let buttonMarginRight = '';

      if (button.onClick && typeof props[button.onClick] === 'function') {
        onClick = props[button.onClick];

        /* switch (button.onClick) {
         case 'deleteSelected':
         onClick = this.deleteSelected;
         break;

         default:
         onClick = null;
         } */
      }

      if (collection.length > index + 1) {
        buttonMarginRight = 'm-r-1';
      }

      const buttonComponent = (
        <button
          key={button.caption}
          type="button"
          className={`btn btn-sm btn-${button.buttonClassType} ${buttonMarginRight}`}
          onClick={onClick}
        >
          <span className={`btn-label-icon left ${button.iconClassName}`} />
          {button.caption}
        </button>
      );

      if (button.route) {
        return <Link key={button.caption} to={button.route}>{buttonComponent}</Link>;
      }

      return buttonComponent;
    })}
  </div>
);

ButtonBar.propTypes = {
  buttonsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string.isRequired,
      route: PropTypes.string,
      buttonClassType: PropTypes.string.isRequired,
      onClick: PropTypes.string,
      iconClassName: PropTypes.string,
    }).isRequired,
  ),
  deleteSelected: PropTypes.func.isRequired,
};

export default ButtonBar;
