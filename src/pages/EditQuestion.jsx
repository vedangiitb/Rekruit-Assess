import React, { useState, useEffect } from "react";
import "../Styles/EditQuestions.css" // Import the CSS file for styling
import EditTestDetails from "../components/TestCreationComponents/EditTestDetails";
import { useParams } from "react-router-dom";

export default function EditQuestions() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, []);

    const fetchData = async (id) => {
        const response = await fetch(`https://6q3ugd55zc.execute-api.us-east-1.amazonaws.com/dev/get-test?id=${id}`)
        const data = await response.json();
        setData(data.Items[0]);
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
