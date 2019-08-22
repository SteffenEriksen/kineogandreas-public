import React from "react";

import "./display.css";

export default React.memo(function ImageView(props) {
  return (
    <div className="display-item">
      {props.imageUrl && (
        <>
          <a href={props.imageUrl}>
            <img
              id="myImg"
              src={props.imageUrl}
              alt="img_from_blob"
              className="filteredimage"
            />
          </a>
        </>
      )}
    </div>
  );
});
