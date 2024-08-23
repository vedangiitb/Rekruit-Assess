import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from '@codemirror/view';


export default function SubmissionsCompo({ user,subOpt, userId, testId, quesNo }) {
    const [subsData, setSubsData] = useState([])
    const [displayDet, setDisplayDet] = useState('')


    const changeDispQs = (data) => {
        setDisplayDet(data)
    }
    useEffect(() => {
        const getSubmissions = async (userId, testId, quesNo) => {
            const response = await fetch(`https://qldr9qzi2i.execute-api.us-east-1.amazonaws.com/dev/get-sub?id=${userId}&testId=${testId}&ques=${quesNo.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                    }
                })
            const resp = await response.json()
            if (resp && resp.Items) {
                setSubsData(resp.Items)
                console.log(resp.Items)
            }
        }

        if (userId && testId && quesNo) {
            getSubmissions(userId, testId, quesNo)
        }
    }, [userId, testId, quesNo])

    return (
        <div className="m-1 p-2" style={{ overflowY: "auto", maxHeight: "90vh" }}>
            {
                subOpt &&
                <div>
                    <h4>Last Test Execution Results</h4>
                    <div
                        dangerouslySetInnerHTML={{ __html: subOpt }}
                        className="card p-2"
                        style={{ backgroundColor: "#F8F9F8" }}>
                    </div>
                </div>
            }

            <br />

            <div className="card p-2">
                <h5>Previous Submissions</h5>
                {subsData.map((item, index) => (
                    <div className="card p-2 mb-1" style={{ cursor: "pointer", backgroundColor: "#F1F3F1", boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.1)" }} onClick={() => changeDispQs(item)}>
                        <h5 key={index} style={{ color: item.status == "Failed" ? "red" : "green" }}>{item.status}</h5>
                    </div>
                ))}
            </div>

            <br />

            {
                displayDet && <div className="card p-2 m-1" style={{ backgroundColor: "#F7F8F7", boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.1)" }}>
                    <h5 style={{ color: displayDet.status == "Failed" ? "red" : "green" }}>{displayDet.status}</h5>
                    <p>Submission Id: {displayDet.id}</p>
                    <h5>Output:</h5>
                    <div
                        dangerouslySetInnerHTML={{ __html: displayDet.output }}
                        className="card p-3">
                    </div>
                    <h5>Code:</h5>
                    <CodeMirror
                        value={displayDet.code}
                        // height="90vh"
                        theme="dark"
                        extensions={[EditorView.editable.of(false)]}
                    />
                    {/* <p>{}</p> */}
                </div>
            }




        </div>

    )
}
