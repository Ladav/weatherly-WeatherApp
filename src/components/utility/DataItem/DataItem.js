import React from 'react';

import classes from './DataItem.css';

const dataItem = (props) => {
    return (
        <div className={classes.DataItem}>
            <p className={classes.Summary}>{props.summary}</p>
            <div className={classes.Icon}>
                <img src={props.srcIcon} alt={props.summary}></img>
            </div>
            <div className={classes.Details}>
                <p className={classes.Temperature}>{(+props.temp).toFixed(2)}°</p>
                <p className={classes.Item}>{props.item}</p>
            </div>
        </div>
    );
};

export default dataItem;