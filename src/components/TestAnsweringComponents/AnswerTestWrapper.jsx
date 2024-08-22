import React from "react";
import { useParams } from "react-router-dom";
import AnswerTestPage from "../../pages/AnswerTestPage";

export default function AnswerTestWrapper({user}){
    const {id} = useParams()
    if (user){
        return <AnswerTestPage user={user} id={id}/>
    } else{
        return(<div>
            <p>No Access</p>
        </div>)
    }
}