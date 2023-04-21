import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../constant";
// import ScatterPlot from "../plot/ScatterPlot";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import ScatterPlot from "../plot/ScatterPlot";

const UploadWidget = () => {
  const [data, setData] = React.useState([]);
  const [file, setFile] = useState<any>(null);
  const [loader, setLoader] = useState(true);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios.post(URL + "data/upload", formData).then((response) => {
      setLoader(false);
    });
  };

  useEffect(() => {
    if(!loader){
      fetchData();
    }
  }, [loader])

  const fetchData = () => {
    axios.get(URL + "data").then((response) => {
      const data = response.data;
      console.log(data);
      setData(data);
      setLoader(true);
    });
  }

  return (
    <Paper>
      <h2>Upload Dataset</h2>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        <Button variant="contained" onClick={handleFileSubmit}>
          Submit
        </Button>
      </Stack>
      <ScatterPlot data={data} />
    </Paper>
  );
};

export default UploadWidget;
