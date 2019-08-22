import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";

import Spinner from "reactjs-simple-spinner";
import { postImages } from "../../api/imageApi";

import "./style.css";

const linkStyle = {
  textDecoration: "none",
  color: "black"
  // border: "1px solid #ddd"
};

export default function Upload() {
  const [loading, setLoading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [uploadCount, setUploadCount] = React.useState(0);
  const [uploadCountTotal, setUploadCountTotal] = React.useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setUploadSuccess(0);
    setErrorMsg("");

    const files = document.querySelector("[type=file]").files;

    let totalCount = files.length;
    if (totalCount === 0) {
      setErrorMsg(
        "Ingen bilder lagt til - legg til og trykk 'last opp bilder'"
      );
      setTimeout(() => {
        setErrorMsg("");
      }, 6000);
      setLoading(false);
      return;
    }
    console.log("starting", totalCount);
    setUploadCountTotal(totalCount);

    const uploadImages = files => {
      const data = new FormData();
      for (const file of files) {
        // console.log("file1", file);
        data.append("files", file);
        // console.log("data1", data);
        // return;
      }

      postImages(data).then(res => {
        console.log("images uploaded");
        document.querySelector("[type=file]").value = "";
        setLoading(false);
        setUploadSuccess(totalCount);
        setTimeout(() => {
          setUploadSuccess(0);
        }, 10000);
      });
    };

    const uploadImageRecc = (files, count, totalCount) => {
      if (files.length === 0) return;

      var file = files.pop();
      count++;

      const data = new FormData();
      // console.log("file", file);
      data.append("files", file);
      // console.log("data", data);
      // return;

      postImages(data).then(res => {
        console.log("image uploaded");

        setUploadCount(count);

        if (count === totalCount) {
          document.querySelector("[type=file]").value = "";
          setLoading(false);
          setUploadSuccess(totalCount);
          setUploadCount(0);

          setTimeout(() => {
            setUploadSuccess(0);
          }, 10000);
        } else {
          uploadImageRecc(files, count, totalCount);
        }
      });
    };

    // uploadImages(files);

    var fileList = [];
    for (const file of files) fileList = [...fileList, file];

    var count = 0;
    uploadImageRecc(fileList, count, totalCount);
  };

  return (
    <>
      <div style={{ padding: "20px 0 0 0" }}>
        <Typography variant="h4">Slideshow bilder</Typography>
      </div>

      <div style={{ padding: "20px 0" }}>
        <Typography>
          Her kan det lastes opp bilder som vil vises under bryllupsfesten til
        </Typography>
        <Typography>Kine og Andreas.</Typography>
      </div>

      <div
        style={{
          padding: "10px 0px 15px 0px"
        }}
      >
        <form method="post" onSubmit={handleSubmit}>
          <input type="file" name="files[]" multiple />
          <input type="submit" value="Last opp bilder" name="submit" />
        </form>
      </div>

      {/* <Spinner size="medium" message="Uploading..." /> */}
      <div style={{ height: "60px" }}>
        {loading && !uploadSuccess && (
          <Spinner
            size="medium"
            message={`Laster opp... ${uploadCount} av ${uploadCountTotal}`}
          />
        )}
        {!loading && uploadSuccess == 1 && (
          <Typography>
            Image uploaded <CheckIcon style={{ color: "green" }} />
          </Typography>
        )}
        {!loading && uploadSuccess > 1 && (
          <Typography>
            Images uploaded <CheckIcon style={{ color: "green" }} />
          </Typography>
        )}
        <Typography>{errorMsg}</Typography>
      </div>

      <div style={{ padding: "20px 0" }}>
        <Button variant="outlined" color="primary">
          <Link style={linkStyle} to="/bilder">
            Se alle bilder
          </Link>
        </Button>
      </div>

      <div className="image-wrapper">
        <div className="image" />
      </div>
    </>
  );
}
