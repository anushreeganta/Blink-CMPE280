import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Home.css";
import Axios from "axios";
import endPointObj from "../../Config";
import Pagination from "@mui/material/Pagination";

Home.propTypes = {};
let postCopy = [];

function Home(props) {
  const [posts, setPost] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 5;

  let answers = [];

  let userId = sessionStorage.getItem("id");

  const pageClicked = (e, page) => {
    console.log(page);

    console.log(postCopy);
    console.log((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log(
      postCopy.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    );
    setPost(
      postCopy.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    );
    console.log(posts);
  };

  const getPosts = () => {
    return new Promise((resolve, reject) => {
      Axios.get(
        endPointObj.url + "api/getPostsByUserPref?userId=" + userId
      ).then((data) => {
        resolve(data);
        setPageCount(Math.ceil(data.data.length / 5));
      });
    });
  };

  useEffect(() => {
    getPosts().then((res) => {
      //setPost(res.data);
      postCopy = res.data;
      pageClicked(undefined, 1);
    });
  }, []);

  let deleteCallback = (id) => {
    console.log("this is the delete func" + id);

    Axios.delete(endPointObj.url + "api/deletePost", {
      data: {
        postId: id,
      },
    }).then((response) => {
      console.log(response);
      getPosts().then((res) => {
        setPost(res.data);
      });
      //redirectToHome();
    });
  };

  return (
    <div className="home-cards">
      {posts.map((ele) => (
        <div className="home-card">
          <Card
            header={ele.header}
            body={ele.body}
            userId={userId}
            postedBy={ele.userId}
            id={ele._id}
            callDelete={deleteCallback}
          ></Card>
        </div>
      ))}
      <Pagination count={pageCount} variant="outlined" shape="rounded"  onChange={(e, page)=>pageClicked(e, page)} />
    </div>
  );
}

export default Home;
