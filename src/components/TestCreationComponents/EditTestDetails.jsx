import { React, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../../Styles/Calendar.css'
import '../../Styles/TstCreationStyles.css'
import TimePicker from 'react-time-picker';
import AddQuestionCompo from "./AddQuestionCompo";

export default function EditTestDetails({ user, edit, testData }) {
    const [testName, setTestName] = useState('');
    const [dateSet, setDateSet] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateError, setDateError] = useState('');
    const [time, setTime] = useState('10:30');
    const [dateTime, setDateTime] = useState('');
    const [questions, setQuestions] = useState([]);
    const [addingQues, setAddingQues] = useState(false);
    const langsAllowed = ['Python', 'JavaScript', 'C++', 'Java'];
    const [expanded, setExpanded] = useState([])
    const [isInvalid, setIsInvalid] = useState(false)
    const [quesId, setQuesId] = useState('')
    const [modifyingQues, setModifyingQues] = useState(false)
    const [selQuesData, setSelQuesData] = useState({})
    const [modfiyInd, setModifInd] = useState(null)

    useEffect(() => {
        if (edit) {
            setData(testData)
        }
    }, [])

    const setData = (data) => {
        if (data && data.name) {
            setTestName(data.name)
        }

        if (data && data.id) {
            setQuesId(data.id)
        }

        if (data && data.dateTime) {
            setDate(data.dateTime)
        }

        setExpanded(new Array(data.questions.length).fill(false))

        if (data && data.questions) {
            setQuestions(data.questions)
        }
    }


    const toggleExpand = (index, expand) => {
        collapseExpModif()
        setExpanded(expanded.map((exp, i) => (i === index ? expand : exp)));
    };

    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    const validateDate = (selectedDate, selectedTime) => {
        if (selectedDate === '') {
            setDateError('Please select a date!');
            return false;
        }
        if (selectedTime === '') {
            setDateError('Please select a time!');
            return false;
        }

        const [hours, minutes] = selectedTime.split(':');
        const newDateTime = new Date(selectedDate);
        const now = new Date();
        newDateTime.setHours(hours, minutes);

        if (newDateTime < now) {
            setDateError('The test date and time cannot be in the past');
            return false;
        } else {
            setDateError('');
            return true;
        }
    };

    const handleDateInput = () => {
        if (validateDate(date, time)) {
            setDateSet(true);
            const [hours, minutes] = time.split(':');
            const newDateTime = new Date(date);
            newDateTime.setHours(hours, minutes);
            setDateTime(newDateTime.toString());
        }
    };

    const saveTest = async () => {
        if (edit) {
            modifyTest()
        } else {
            addNewTest()
        }
    };

    const modifyTest = async () => {
        if (quesId) {
            const response = await fetch(`https://6q3ugd55zc.execute-api.us-east-1.amazonaws.com/dev/update-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                },
                body: JSON.stringify({
                    id: quesId,
                    name: testName,
                    dateTime: date,
                    questions: questions
                })
            })
        }
    }


    const addNewTest = async () => {
        console.log(user)
        if (testName && user) {
            const response = await fetch('https://6q3ugd55zc.execute-api.us-east-1.amazonaws.com/dev/create-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                },
                body: JSON.stringify({
                    name: testName,
                    dateTime: dateTime,
                    questions: questions,
                    owner: 'TestUser',
                }),
            });
            setIsInvalid(false)
            const sessionId = await response.text();
            console.log("Successfully created the codesession");
            console.log("Session ID:", sessionId);
            window.open(`/test-created/${sessionId}`, "_self");
        }
        else {
            setIsInvalid(true)
        }
    }

    const handleInputChange = (e) => {
        setTestName(e.target.value);
    };

    const addQuestion = (ques) => {
        setExpanded([...expanded, false])
        setAddingQues(false);
        console.log(ques);
        setQuestions([...questions, ques]);
    };

    const delQues = (index) => {
        if (index >= 0 && index < questions.length) {
            const newArr = [...questions]
            newArr.splice(index, 1);
            setQuestions(newArr)
        }
    }

    const editQues = (index) => {
        setModifyingQues(true)
        setExpanded(expanded.map((exp, i) => (i === index ? false : exp)));
        setSelQuesData(questions[index])
        setModifInd(index)
    }

    const saveModifyQues = (index, data) => {
        let newQs = [...questions];
        newQs[index] = data;
        setQuestions(newQs);
    }

    const collapseExpModif = () => {
        setModifInd(null);
        setModifyingQues(null);
    }

    return (
        <div>
            {(!dateSet && !edit) && (
                <div>
                    <h3>Select Date and Time</h3>
                    <Calendar
                        onChange={onDateChange}
                        value={date}
                        className="custom-calendar"
                    />
                    <br />
                    <h5>Time</h5>
                    <TimePicker
                        onChange={setTime}
                        value={time}
                        clearIcon={null}
                        className="custom-time-picker"
                    />
                    <br />
                    <br />
                    <button
                        onClick={handleDateInput}
                        className="btn btn-outline-dark"
                    >
                        Set Date
                    </button>
                    {dateError && <p>{dateError}</p>}
                </div>
            )}

            {(dateSet || edit) && (
                <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }} className="col-8">
                    <p>Enter Test Name</p>
                    <input value={testName} onChange={handleInputChange} className="form-control" placeholder="Enter the desired name for the test" />
                    <br />
                    <p>Configure questions (You can do it later too!)</p>
                    <div>
                        {questions.map((item, index) => (
                            <div key={index} className="card p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="col-12" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer" }}>
                                        <h4 className="mb-0">Question {index + 1}</h4>

                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <span class="material-symbols-outlined" onClick={() => editQues(index)}>edit</span>
                                            <span class="material-symbols-outlined" onClick={() => delQues(index)}>delete</span>
                                            {expanded[index] || (modifyingQues && modfiyInd == index) ? <span class="material-symbols-outlined" onClick={() => toggleExpand(index, false)}>  keyboard_arrow_up</span> : <span class="material-symbols-outlined" onClick={() => toggleExpand(index, true)}>keyboard_arrow_down</span>}
                                        </div>

                                    </div>

                                </div>
                                {modifyingQues && modfiyInd == index && <AddQuestionCompo addQuestion={(data) => saveModifyQues(index, data)} isModify={true} quesData={selQuesData} collapse={collapseExpModif} />}
                                {expanded[index] && (
                                    <div className="mt-3">
                                        <h3>{item.QuestionName}</h3>
                                        <p className="mb-2"><strong>Question:</strong> {item.Question}</p>

                                        <p className="mb-2"><strong>Sample Test Cases:</strong></p>
                                        {item.exampleTests.map((tst, testIndex) => (
                                            <div key={testIndex} className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px" }}>
                                                <li style={{ listStyle: "none" }}>
                                                    <p><strong>Sample TestCase #{testIndex + 1}</strong></p>
                                                    <p><strong>Input:</strong> {tst.Test}</p>
                                                    <p><strong>Expected Output:</strong> {tst.ExpectedOpt}</p>
                                                </li>
                                            </div>
                                        ))}

                                        <p className="mb-2"><strong>Example Test Cases:</strong></p>
                                        {item.exampleTestsDisp.map((tst, dispIndex) => (
                                            <div key={dispIndex} className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px" }}>
                                                <li style={{ listStyle: "none" }}>
                                                    <p><strong>Sample TestCase #{dispIndex + 1}</strong></p>
                                                    <p><strong>Input:</strong> {tst.Test}</p>
                                                    <p><strong>Expected Output:</strong> {tst.ExpectedOpt}</p>
                                                    <p><strong>Explanation:</strong> {tst.Explanation}</p>
                                                </li>
                                            </div>
                                        ))}

                                        <p className="mb-2"><strong>Constraints:</strong></p>
                                        <ul className="list-unstyled">
                                            {item.inpCnst.map((constraint, constIndex) => (
                                                <li key={constIndex}>{constraint}</li>
                                            ))}
                                        </ul>

                                        <p className="mb-2"><strong>Allowed Languages:</strong></p>
                                        <ul className="list-unstyled">
                                            {langsAllowed.map((langItem, langIndex) => (
                                                item.allowedLangs[langIndex] && <li key={langIndex}>{langItem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="card p-3">
                        {!addingQues &&
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button className="btn btn-outline-dark col-5" onClick={() => setAddingQues(!addingQues)}>Add Custom Question</button>
                                <p>Or</p>
                                {/* This will open a dialog box that will allow to add questions */}
                                <button className="btn btn-outline-dark col-5">Choose from Questions library</button>
                            </div>
                        }

                        {addingQues && <AddQuestionCompo addQuestion={addQuestion} />}
                        <br />

                        {
                            isInvalid && <p style={{ color: "red" }}>The test name cannot be empty</p>
                        }


                    </div>
                    <br />
                    <button className="btn btn-outline-dark col-2" onClick={saveTest}>Save</button>
                </div>
            )}
        </div>
    );
}