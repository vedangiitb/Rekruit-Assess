import React, { useEffect, useState } from "react";
import QuestionsCompo from "../components/TestAnsweringComponents/QuestionsCompo";
import SubmissionsCompo from "../components/TestAnsweringComponents/SubmissionsCompo";
import IDECompo from "../components/TestAnsweringComponents/IDECompo";
import { useParams } from "react-router-dom";
import '../Styles/SideBar.css'
import RunTestsComponent from "../components/TestAnsweringComponents/RunTestsComponents";

export default function AnswerTestPage({ user, id }) {
    const [isQues, setIsQues] = useState(true)
    const [data, setData] = useState({})
    const [items, setItems] = useState([])
    const [quesName, setQuesName] = useState('')
    const [question, setQuestion] = useState('')
    const [egTests, setEgTests] = useState([])
    const [initTests, setInitTest] = useState([])
    const [egTestsDisp, setEgTestsDisp] = useState([])
    const [tests, setTests] = useState([])
    const [inpCnst, setInpcnst] = useState([])
    const [allowedLangs, setAllowedLangs] = useState([])
    const [runTests, setRunTests] = useState(false)
    const [isOutput, setIsOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false)
    const [subOpt, setSubOpt] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetchAndSaveserverData()
        }
    }, [])

    const fetchAndSaveserverData = async () => {
        const response = await fetch(`https://6q3ugd55zc.execute-api.us-east-1.amazonaws.com/dev/get-test?id=${id}`)
        const data = await response.json()
        setData(data.Items[0])
        if (data.Items && data.Items[0].questions) {
            setItems(data.Items[0].questions)
            changeQuestionTxt(data.Items[0].questions[0])
        }
        console.log(data.Items[0])
        console.log(items)
    }

    const changeState = (state) => {
        if (state === 'prob') {
            setIsQues(true)
        } else {
            setIsQues(false)
        }
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const changeQuestionTxt = (item) => {
        setIsOpen(!isOpen)
        if (!item) {
            console.log("null question")
            return
        }
        // resetDisp()

        if (item.QuestionName && item.QuestionName != quesName) {
            setQuesName(item.QuestionName)
        }

        if (item.Question && item.Question != question) {
            console.log(item.Question)
            setQuestion(item.Question)
        }

        if (item.exampleTests && item.exampleTests != egTests) {
            setEgTests(item.exampleTestsDisp)
            setInitTest(item.exampleTestsDisp)
        }

        if (item.exampleTestsDisp && item.exampleTestsDisp != egTestsDisp) {
            setEgTestsDisp(item.exampleTestsDisp)
        }

        if (item.tests && item.tests != tests) {
            setTests(item.tests)
        }

        if (item.inpCnst && item.inpCnst != inpCnst) {
            setInpcnst(item.inpCnst)
        }

        if (item.allowedLangs && item.allowedLangs != allowedLangs) {
            setAllowedLangs(item.allowedLangs)
        }
    }

    const runExTests = async (code, lang) => {

        let outputs = [];
        setRunTests(true)
        setIsRunning(true)
        for (let test of egTests) {
            try {
                const response = await fetch('https://3bt5y0d6be.execute-api.us-east-1.amazonaws.com/dev/run-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: code,
                        tests: [{
                            "id": "1",
                            "testcase": test.Test,
                        }],
                        language: lang
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to send code to server');
                }

                const result = await response.json();
                const { errors } = result;

                if (errors) {
                    const formattedOutput = errors.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
                    const errorForm = `Error: ${formattedOutput.slice(98)}`;
                    outputs.push(errorForm)

                } else {
                    let formattedOutput = result.output.replace(/\x1B\[[0-9;]*[JKmsu]/g, '').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
                    outputs.push(formattedOutput)
                }
                console.log(result)


            } catch (error) {
                console.error('Error sending code to server:', error);
            }
        }

        setIsOutput(outputs)
        setIsRunning(false)

    };

    const runFinalTests = async (code, lang) => {
        const response = await fetch('https://3bt5y0d6be.execute-api.us-east-1.amazonaws.com/dev/run-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tests: tests || [], code: code, language: lang }),
        });
        const { errors, output } = await response.json();
        if (errors) {
            const formattedOutput = errors.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
            setSubOpt(formattedOutput)
            await fetch('https://qldr9qzi2i.execute-api.us-east-1.amazonaws.com/dev/create-sub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.username, testId: id, code: code, status: 'Failed', quesNo: '1', output: formattedOutput })
            })
        }
        else {
            let formattedOutput = ''
            if (output) {
                formattedOutput = output.replace(/\x1B\[[0-9;]*[JKmsu]/g, '').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
            }
            else {
                formattedOutput = output
            }
            setSubOpt(formattedOutput)

            const status = formattedOutput
            console.log(formattedOutput)

            await fetch('https://qldr9qzi2i.execute-api.us-east-1.amazonaws.com/dev/create-sub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.username, testId: id, code: code, status: status || 'Failed', quesNo: '1', output: formattedOutput })
            })
        }
        setIsQues(false)
    };

    const resetTests = () => {
        setEgTests(initTests)
    }

    return (
        <div style={{ height: "100vh" }}>
            {data.questions && <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>

                    <div style={{ width: "4%", position: "relative" }}>
                        <div onClick={() => toggleSidebar()} className="toggle-button">
                            <span className="material-symbols-outlined">menu</span>
                        </div>

                        <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
                            <span className="material-symbols-outlined toggle-button-close" onClick={() => toggleSidebar()}>close</span>
                            <ul className="sidebar-list">
                                {items.map((item, index) => (
                                    <li key={index} className="sidebar-item" onClick={() => changeQuestionTxt(item)}>
                                        {index + 1}: {item.QuestionName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>



                    <div style={{ width: "48%", height: "100vh" }} className="card">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" style={{ cursor: "pointer" }}>
                                <a className={isQues ? "nav-link active" : "nav-link"} style={{ color: "black" }} onClick={() => changeState('prob')}>Problem</a>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}>
                                <a className={isQues ? "nav-link" : "nav-link active"} style={{ color: "black" }} onClick={() => changeState('sub')}>Submissions</a>
                            </li>
                        </ul>

                        <div>

                            {isQues && <QuestionsCompo questionName={quesName} question={question} egTests={egTestsDisp} inpCnst={inpCnst} />}

                            {!isQues && <SubmissionsCompo subOpt={subOpt} userId={user.username} testId={id} quesNo={1} />}

                        </div>


                    </div>


                    <div style={{ width: "48%" }} className="card">

                        <IDECompo runTests={runExTests} runFinalTests={runFinalTests} />

                        <RunTestsComponent isOpen={runTests} closeTestsModal={setRunTests} extests={egTestsDisp} modifyTests={(tests) => setEgTests(tests)} isOutput={isOutput} isRunning={isRunning} resetTests={resetTests} />

                    </div>


                </div>



            </div>}
        </div>

    )
}