import React, { useState } from "react";

export default function ExampleDispTestCompo({ addExDispTest, removeExDispTest, tests }) {
    const [exDispTst, setExDispTst] = useState('')
    const [exDispOp, setExDispOp] = useState('')
    const [exDispExpl, setExDispExpl] = useState('')
    const [tcinvalid, setTcInvalid] = useState(false)

    const setValue = (e, func) => {
        func(e.target.value)
    }

    const addExDispTst = () => {
        if (validateTest()) {
            addExDispTest({
                'Test': exDispTst,
                'ExpectedOpt': exDispOp,
                'Explaination': exDispExpl
            })
            setExDispExpl('');
            setExDispTst('');
            setExDispOp('');
        }
    }

    const validateTest = () => {
        if (!exDispTst || !exDispOp) {
            setTcInvalid(true)
            return false
        }
        else {
            return true
        }
    }

    return (
        <div className="card  p-2">
            <div>
                {
                    tests.map((tst, index) => (
                        <div className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px" }}>
                            <li key={index} style={{ listStyle: "none" }}>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <p><strong>Example TestCase #{index + 1}</strong></p>
                                    <span class="material-symbols-outlined" onClick={() => removeExDispTest(index)}>delete</span>
                                </div>
                                <p><strong>Input:</strong> {tst.Test}</p>
                                <p><strong>Expected Output:</strong> {tst.ExpectedOpt}</p>
                                <p><strong>Explaination:</strong> {tst.Explaination}</p>

                            </li>
                        </div>
                    ))
                }
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Test Input</span>
                <textarea className="form-control" value={exDispTst} onChange={(e) => setValue(e, setExDispTst)} />
                <span class="input-group-text" id="basic-addon1">Expected Output</span>
                <textarea className="form-control" value={exDispOp} onChange={(e) => setValue(e, setExDispOp)} />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Explaination</span>
                <textarea className="form-control" value={exDispExpl} onChange={(e) => setValue(e, setExDispExpl)} />
            </div>
            {
                tcinvalid && <p style={{ color: "red" }}>Input Test case or expected output cannot be empty</p>
            }

            <button className="btn btn-outline-dark col-2" onClick={addExDispTst}>Add Test</button>
        </div >
    )
}