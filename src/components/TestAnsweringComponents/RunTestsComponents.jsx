import React, { useState } from "react";
import '../../Styles/TstAnswerStyles.css';

export default function RunTestsComponent({ isOpen, closeTestsModal, extests, modifyTests, isOutput, isRunning, resetTests }) {
    const [tests, setTests] = useState(extests);
    const [selInd, setSelInd] = useState(0);

    const changeTest = (index, e) => {
        const test = e.target.value;
        let newTests = [...tests];
        newTests[index] = { ...newTests[index], Test: test };
        setTests(newTests);
        modifyTests(newTests);
    }

    const addTestCase = () => {
        let newtest = { 'Test': "", 'ExpectedOpt': "Not available on custom tests" }
        let newTests = [...tests];
        let ind = tests.length;
        newTests.push(newtest)
        setTests(newTests)
        modifyTests(newTests)
        setSelInd(ind)
    }

    const resetTestCases = () => {
        resetTests()
        setTests(extests)
        setSelInd(0)
    }

    const delTestCase = (ind) => {
        console.log(ind)

        if (ind < tests.length && tests.length >1) {
            let newTestArr = [...tests];
            newTestArr.splice(ind, 1)
            setTests(newTestArr)
            modifyTests(newTestArr)
            setSelInd(prevInd => (prevInd >= newTestArr.length ? 0 : prevInd));
            console.log(newTestArr)
            console.log("HIII")
        }
    }

    return (
        <div className={`runTests ${isOpen ? "open" : ""}`}>
            <div className="runTestsTop">
                <div>
                    {isRunning ? <p>Running Tests...</p> : <p>Example Tests</p>}
                </div>
                <div>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => closeTestsModal(!isOpen)}
                        className="material-symbols-outlined">
                        {isOpen ? "close" : "open_in_full"}
                    </span>
                </div>
            </div>

            {isOpen &&
                <div className="runTestsContent">
                    <div className="testCases">
                        {tests.map((item, index) => (
                            <div className="testCase-container" key={index}>
                                <div
                                    className={`testCase ${selInd === index ? "selected" : ""}`}
                                    onClick={() => setSelInd(index)}
                                >
                                    Case {index + 1}
                                </div>
                                <div className="delete-icon" onClick={() => delTestCase(index)}>
                                    <p>x</p>
                                </div>
                            </div>
                        ))}

                        <div className='testCase-add' onClick={addTestCase}>
                            <span className="material-symbols-outlined">add</span>
                        </div>

                        <div style={{marginLeft:"auto",cursor:"pointer"}} onClick={resetTestCases}>
                            <p>Reset TestCases</p>
                            </div>


                    </div>

                    <textarea
                        className="form-control testInput"
                        value={tests[selInd].Test}
                        onChange={(e) => changeTest(selInd, e)}
                        style={{ boxShadow: "none", backgroundColor: "#f7f7f7" }}
                    />

                    {isOutput != null && isOutput[selInd] != null && (
                        <div className="outputSection">
                            <p>Your Output</p>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '7px',
                                    padding: '7px',
                                    backgroundColor: "#f7f7f7",
                                    overflow: 'auto',
                                    minHeight: "5vh"
                                }}
                                dangerouslySetInnerHTML={{ __html: isOutput[selInd] }} />

                            <p>Expected Output</p>
                            <input value={tests[selInd].ExpectedOpt} className="form-control" readOnly style={{ boxShadow: "none", backgroundColor: "#f7f7f7" }} />
                        </div>
                    )}
                </div>
            }
        </div>
    )
}
