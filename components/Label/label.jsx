import React, {Children, forwardRef} from 'react';
import PropTypes from 'prop-types';
import StyledLabel from './StyledLabel';
import { Spacer } from '../Layout';
import styles from './label.module.css';
import Wrapper from '../Layout/Wrapper';
import { Toggle } from './Toggle';

const classes = {
  inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
  searchBtn: 'h-auto text-white absolute right-2.5 bottom-1.5 bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-gray-300 font-small rounded-lg text-sm px-4 py-2'
}

const Label = ((props) => {
    
    let elementToRender;
    const { type, handleAddTag, removeTag, tags } = props;
    switch (type) {
        case 'select':
        elementToRender = (<Toggle
            values={props.items}
            name={props.name}
            onToggle={props.onChange}/>);
        break;
        default:
        elementToRender = (
            <input
            id={props.name}
            name={props.name}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            htmlFor={props.htmlFor}
            className={!props.className ? styles.input : props.className}
            placeholder={props.name.toUpperCase()}/>
        )
        break;
    }

    return (
        <>
        <label className={styles.label}>{props.name}
        {elementToRender}
        </label>
        <Spacer size={0.5} axis="vertical" />
        </>
    )
});

Label.propTypes = {  
    name: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string
}

export default Label;