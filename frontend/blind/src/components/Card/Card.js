import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card as MCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import endPointObj from "../../Config";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import "./Card.css";
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

Card.propTypes = {};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Card(props) {
  const [answersState, setAnswersState] = useState([]);
  const [answer, setAnswer] = useState("");

  const getAnswers = async (id) => {
    let data = await Axios.get(
      endPointObj.url + "api/getAnswerForPost?postId=" + id
    );
    let answers = [];
    data.data.forEach((ele) => {
      answers.push(ele.answer);
    });
    console.log(answers);
    setAnswersState(answers);
  };

  const postAnswer = async (answer, postId) =>{
    try{
      let data = await Axios.post(endPointObj.url + "api/answerPost", {
        answer,
        postId
      })
  
    }
    catch(error){
      console.error(error);
    }
    setAnswer("");
    getAnswers(postId);
  }

  return (
    <MCard
      sx={{ maxWidth: 5000 }}
      onClick={() => {
        getAnswers(props.id);
      }}
      className="card"
    >
    
      <CardContent className="cardContent">
      <div className="card-header">
        <div>
        <Typography variant="h5" component="div">
          <i class="fa-solid fa-user-astronaut"></i>
          &nbsp;
          {props.header}
        </Typography>
        </div>

        {props.userId === props.postedBy && (
          <Tooltip title="Delete">
         
            <div
              variant="contained"
              size="small"
              onClick={() => {
                props.callDelete(props.id);
              }}
            >
              <i class="fa-solid fa-trash-can"></i>
            </div>
            </Tooltip>
         
        )}
        </div>

        <Typography variant="body2" className="card-body">
          {props.body}
        </Typography>

        <Typography variant="body2">
          {answersState.map((ele) => (
            <p className="card-answers">
              <i class="fa-solid fa-user-astronaut"></i> &nbsp;
              {ele}
            </p>
          ))}
        </Typography>
      </CardContent>
      {sessionStorage.getItem("role") !== 'Normal' && <div className="card-answer">
      <div>
      <CardActions>
      
      <TextField
        
        variant="standard"
        className="card-answer-post"
        focused
        placeholder="Type your ans here!!!"
        onChange={(e)=>{setAnswer(e.target.value)}}
        value={answer}
      />
        
      </CardActions>
      </div>
      <div className="card-icon-send">
      <Tooltip title="Send">
      <div>
      <i class="fa-solid fa-paper-plane " onClick={()=>{postAnswer(answer, props.id)}}></i>
      </div>
      </Tooltip>
      </div>
      </div>}
    </MCard>
  );
}

Card.defaultProps = {
  answers: [],
};

export default Card;
