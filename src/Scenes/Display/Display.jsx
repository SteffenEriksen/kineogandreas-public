import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./display.css";

import { getImages } from "../../api/imageApi";
import ImageView from "./FilteredImageView";

const linkStyle = {
  textDecoration: "none"
};

export default function Slideshow() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    getImages().then(res => {
      setImages(res);
    });
  }, []);

  return (
    <>
      <div style={{ padding: "20px 0 0 0" }}>
        <Typography variant="h4">Slideshow bilder</Typography>
      </div>

      <div className="logo-wrapper">
        <div className="logo" />
      </div>

      <div style={{ padding: "0 0 10px 0" }}>
        <Button variant="outlined" color="primary">
          <Link style={linkStyle} to="/">
            Gå tilbake
          </Link>
        </Button>
      </div>

      {images && (
        <div className="display-container">
          {images.map((imageUrl, idx) => (
            <ImageView key={idx} imageUrl={imageUrl} />
          ))}
        </div>
      )}
    </>
  );
}
