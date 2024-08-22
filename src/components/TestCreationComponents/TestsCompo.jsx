import React, { useState } from "react";
import UploadAndReadTextFile from "./uploadTxt";

export default function TestsCompo({ setinputTests,tstInps,removeTc }) {
    const [inp, setInp] = useState('')
    const [op, setOp] = useState('')
    const [invalidTC, setInvalidTC] = useState(false)
    let tcCount = 0

    const changeInp = (e) => {
        setInp(e.target.value)
    }

    const changeOp = (e) => {
        setOp(e.target.value)
    }

    const addTc = () => {
        tcCount += 1
        if (inp && op) {
            setinputTests({
                "id":tcCount,
                "testcase":inp,
                "expectedOutput":op
            })
            setInp('')
            setOp('')
            setInvalidTC(false)
        }
        else {
            setInvalidTC(true)
        }
    }

    const deleteTestCase = (index) => {
        removeTc(index)
    }
    return (
        <div className="card p-2">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Add Test cases</h5>
            </div>
            <p>Add manually</p>
            <div style={{ display: "flex", gap: "20px" }}>
                <textarea className="form-control" value={inp} onChange={changeInp} />
                <textarea className="form-control" value={op} onChange={changeOp} />
            </div>
            <br />
            <button className="btn btn-primary col-2" onClick={() => addTc()}>Add test case</button>
            {invalidTC && (
                <p style={{ color: "red" }}>
                    Test input and ouptut cannot be empty
                </p>
            )}
            <div style={{ display: 'flex', maxHeight: '150px', overflowY: 'auto' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <br />
                    <p>Inputs</p>
                    <ul style={{ padding: 0 }}>
                        {tstInps.map((input, index) => (
                            <li key={index} style={{ listStyle: "none", padding: '5px 0' }}>
                                {input.testcase}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, paddingTop: "20px" }}>
                    <p>Outputs</p>
                    <ul style={{ padding: 0 }}>
                        {tstInps.map((output, index) => (
                            <li key={index} style={{ listStyle: "none", padding: '5px 0' }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    {output.expectedOutput}
                                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => deleteTestCase(index)}>
                                        delete
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <br />
            <div>
                <p>Or Instead, Upload files</p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <UploadAndReadTextFile inpfunc={setInp} id={0} />
                    <UploadAndReadTextFile inpfunc={setOp} id={1} />
                </div>
                <p>File format supported : .txt</p>
            </div>
            <br />
        </div>
    )
}