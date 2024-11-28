import React from 'react';
import './Marker.css';
import {Link} from 'react-router-dom' ;
const Marker = (props) => {
    const { color, name, id } = props;
    return (
        <div>
        <Link to={'/chef/'+id+'/dishes/'}>
        <textarea>
            {name}
        </textarea>
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
      </Link>
      </div>
    );
  };

  export default Marker;