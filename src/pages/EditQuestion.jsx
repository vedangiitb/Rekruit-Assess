import React, { useState, useEffect } from "react";
import "../Styles/EditQuestions.css" // Import the CSS file for styling
import EditTestDetails from "../components/TestCreationComponents/EditTestDetails";
import { useParams } from "react-router-dom";

export default function EditQuestions({user}) {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id && user) {
            fetchData(id,user);
        }
    }, [id,user]);

    const fetchData = async (id,user) => {
        const response = await fetch(`https://6q3ugd55zc.execute-api.us-east-1.amazonaws.com/dev/get-test?id=${id}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization':user.storage[user.userDataKey.slice(0,-8) + 'idToken']
            }
        })
        const data = await response.json();
        if (data && data.Items && user){
            setData(data.Items[0]);
        }
    }

    if (data){
        return (
            <EditTestDetails edit={true} testData={data} />
        )
    } else{
        return (
            <p>Loading....</p>
        )
    }
    
}
