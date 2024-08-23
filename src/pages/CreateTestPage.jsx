import React from "react";
import EditTestDetails from "../components/TestCreationComponents/EditTestDetails";


export default function CreateTestPage({user}) {
    return (
        <EditTestDetails user={user} edit={false}/>
    )
}
