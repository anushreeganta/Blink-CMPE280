import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import "./Post.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Select from "react-select";
import Axios from "axios";
import endPointObj from "../../Config";
import Alert from "@mui/material/Alert";
import LocalizedStrings from 'react-localization';
import strings from "../../localization";

Post.propTypes = {};

function Post(props) {

  let local = new LocalizedStrings(strings);

  const selectInputRef = useRef();

  const optionsTags = [
    { value: "Tag1", label: "Tag1" },
    { value: "Tag2", label: "Tag2" },
  ];

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [userTags, setUserTags] = useState([]);
  const [tags, setTags] = useState(optionsTags);
  const [alert, setAlert] = useState("");



  const createPost = async (userId, postHeader, postBody, postTags) => {

    console.log(userId, postHeader, postBody, postTags);

    let res = await Axios.post(endPointObj.url + "api/createPost", {
      userId,
      postHeader,
      postBody,
      postTags
    })
    setAlert(res.data.message)
    console.log(selectInputRef.current.clearValue())
    setHeader("")
    setBody("")

    // setTimeout(()=>{
    //   setAlert("")
    // }, 2000)

  }

  const getTags = async () => {
    let data = await Axios.get(endPointObj.url + "api/getTags");
    let tagArr = [];
    data.data.forEach((ele) => {
      tagArr.push({ value: ele.tagName, label: ele.tagName });
    });

    setTags(tagArr);
  };


  useEffect(() => {
    getTags();
  }, []);


  return (
    <div className="post-background">
      <div className="post-layout">
        <h1>{local.createPost}</h1>
        <Select
          className="register-select-user"
          options={tags}
          isMulti="true"
          ref={selectInputRef}
          onChange={(e) => {
            setUserTags([...userTags, ...e.map((ele) => ele.value)]);
          }}
        />
        <TextField label={local.title} color="primary" value={header} focused onChange={(e) => setHeader(e.target.value)} />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          className="post-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="post-create">
          <Button variant="contained" className="post-button" onClick={() => createPost(sessionStorage.getItem("id"), header, body, userTags)}>
            {local.createPost}
          </Button>
        </div>
        {alert.length !== 0 && (
          <div className="login-div-error">
            <Alert severity="success" className="login-error">
              {alert}
            </Alert>
          </div>
        )}
      </div>
    </div>


  );
}

export default Post;
