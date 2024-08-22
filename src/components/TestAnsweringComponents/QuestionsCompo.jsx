import React from "react";
import DOMPurify from 'dompurify';

export default function QuestionsCompo({ questionName, question, egTests, inpCnst }) {
    const createMarkup = (content) => {
        return {
            __html: DOMPurify.sanitize(content)
        }
    }

    return (
        <div className="p-2" style={{ height: "93vh", overflowY: "scroll" }}>
            <h2>{questionName}</h2>
            <div dangerouslySetInnerHTML={createMarkup(question)} style={{ marginBottom: '20px' }} />


            {/* <p>{question}</p> */}
            {egTests.map((tst, dispIndex) => (
                <div key={dispIndex} className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px" }}>
                    <li style={{ listStyle: "none" }}>
                        <p><strong>Example: {dispIndex + 1}</strong></p>
                        <p><strong>Input:</strong> {tst.Test}</p>
                        <p><strong>Output:</strong> {tst.ExpectedOpt}</p>
                        <p><strong>Explanation:</strong> {tst.Explaination}</p>
                    </li>
                </div>
            ))}

            <br />

            <p><strong>Input Constraints</strong></p>
            {
                inpCnst.map((cnst, cnstInd) => {
                    return (
                        <li>{cnst}</li>
                    )

                })
            }
        </div>
    )
}