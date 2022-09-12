import React from 'react';
import PropTypes from 'prop-types';

const classes = {
  outerContainer: "w-full bg-white rounded-lg border border-gray-200 shadow-md mb-2",
  innerContainer: "flex flex-col items-center pb-5 pt-5",
  imgWrapper: "mb-3 w-24 h-24 rounded-full shadow-lg",
  h5Style: "mb-1 text-xl font-medium text-gray-900",
  h3Style: "mb-2 text-xl font-large text-pink-600",
  spanStyle: "text-sm text-gray-500",
}

const Profile = ({props, txt}) => {
    const { img, name, age } = props;
    return (
      <>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
              <img className={classes.imgWrapper} src={img} alt="img" />
              <h5 className={classes.h5Style}>{name}</h5>
              <span className={classes.spanStyle}>{age}</span>
              <h3 className={classes.h3Style}>{txt}</h3>
          </div>
        </div>
      </>
    )
};

Profile.propTypes = {  
    name: PropTypes.string,
    img: PropTypes.string,
    age: PropTypes.string
}

export default Profile;