import React, { useEffect, useState } from "react";
import ExampleDispTestCompo from "./ExampleDispTestCompo";
import TestsCompo from "./TestsCompo";
import InputConstrCompo from "./InputConstraintCompo";
import AllowedLangsCompo from "./AllowedLangsCompo";
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML } from 'draft-convert';

export default function AddQuestionCompo({ addQuestion, isModify, quesData, collapse }) {
    const [question, setQuestion] = useState('')
    const [exampleTests, setExampleTests] = useState([])
    const [exampleTestsDisp, setExampleTestsDisp] = useState([])
    const [tests, setTests] = useState([])
    const [inpCnst, setInpcnst] = useState([])
    const [allowedLangs, setAllowedLangs] = useState([true, true, true, true])
    const [invalidQues, setInvalidQues] = useState(false)
    const [questionVal, setquestionVal] = useState('')
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);


    useEffect(() => {
        if (isModify && quesData) {
            setQuestionData(quesData)
        }
    }, [])

    const setQuestionData = (data) => {
        setquestionVal(data.QuestionName)
        // setQuestion(data.Question)
        setConvertedContent(data.Question)
        setEditorState(convertToEditorState(data.Question))
        setExampleTests(data.exampleTests)
        setExampleTestsDisp(data.exampleTestsDisp)
        setTests(data.tests)
        setInpcnst(data.inpCnst)
        console.log(data.allowedLangs)
        setAllowedLangs(data.allowedLangs)
    }

    const convertToEditorState = (htmlContent) => {
        const contentState = convertFromHTML(htmlContent);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    };

    const changeQuestionValue = (e) => {
        setQuestion(e.target.value)
    }

    const addExampleTestsDisp = (test) => {
        setExampleTestsDisp([...exampleTestsDisp, test])
    }

    const addTests = (test) => {
        setTests([...tests, test])
    }

    const addInputConstraints = (cnstr) => {
        setInpcnst([...inpCnst, cnstr])
    }

    const changeQuestionValValue = (e) => {
        setquestionVal(e.target.value)
    }

    const removeElement = (indexToRemove, arr, setArr) => {

        console.log(indexToRemove)
        if (indexToRemove >= 0 && indexToRemove < arr.length) {
            const newExTstArray = [...arr];
            newExTstArray.splice(indexToRemove, 1)
            setArr(newExTstArray);

        } else {
            console.error('Invalid index');
        }
    };

    const addQs = () => {
        if (isModify) {
            collapse()
        }
        if (convertedContent && questionVal) {
            addQuestion({
                'QuestionName': questionVal,
                'Question': convertedContent,
                'exampleTests': exampleTests,
                'exampleTestsDisp': exampleTestsDisp,
                'tests': tests,
                'inpCnst': inpCnst,
                'allowedLangs': allowedLangs
            })
            setInvalidQues(false)
        }
        else {
            setInvalidQues(true)
        }
    }

    return (
        <div>
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Add'}  Question Name</p>
            <input value={questionVal} onChange={changeQuestionValValue} class="form-control" />

            <br />

            {/* Question Text */}
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Add'}  Question</p>

            <div className="card mt-2 p-2">
                {/* <textarea value={convertedContent} onChange={changeQuestionValue} class="form-control" /> */}

                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    editorStyle={{ width: "100%", height: "100%", minHeight: "300px" }}
                />

            </div>
            <br />

            {/* Example Tests */}
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Add'} Example Tests</p>
            <ExampleDispTestCompo addExDispTest={addExampleTestsDisp} tests={exampleTestsDisp} removeExDispTest={(index) => removeElement(index, exampleTestsDisp, setExampleTestsDisp)} />

            <br />

            {/* Problem Input Constrains */}
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Add'} input constraints</p>
            <InputConstrCompo addInpCnstr={addInputConstraints} cnstrs={inpCnst} removeInpCnstr={(index) => removeElement(index, inpCnst, setInpcnst)} />

            <br />

            {/* Tests (with expected output) */}
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Add'} Tests</p>
            <TestsCompo setinputTests={addTests} tstInps={tests} removeTc={(index) => removeElement(index, tests, setTests)} />

            <br />

            {/* Allowed languages */}
            <p className="ques-txt-class">{isModify ? 'Modify' : 'Set'}  allowed language</p>

            <AllowedLangsCompo langs={allowedLangs} setAllowedLangs={setAllowedLangs} edit={isModify} />

            <br />

            {
                invalidQues && <p style={{ color: "red" }}>The question cannot be left empty!</p>
            }

            <button className="btn btn-outline-dark" onClick={addQs}>{isModify ? 'Save Changes' : 'Add Question'}</button>

        </div>
    )
}