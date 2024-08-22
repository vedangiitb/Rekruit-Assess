import React, { useState } from "react";

export default function ExampleTestCompo({ addExTest, tests }) {
    const [exDispTst, setExDispTst] = useState('')
    const [exDispOp, setExDispOp] = useState('')
    const [tcinvalid,setTcInvalid] = useState(false)

    const setValue = (e, func) => {
        func(e.target.value)
    }

    const addExDispTst = () => {
        if (validateTest()){
            addExTest({
                'Test': exDispTst,
                'ExpectedOpt': exDispOp,
            })
            setExDispOp('');
            setExDispTst('');
            setTcInvalid(false)
        }
    }

    const validateTest = ()=>{
        if (!exDispTst || !exDispOp){
            setTcInvalid(true)
            return false
        }
        else{
            return true
        }
    }

    return (
        <div className="card p-2">
            <div>
                {
                    tests.map((tst, index) => (
                        <div className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px" }}>
                            <li key={index} style={{ listStyle: "none" }}>
                                <p><strong>Sample TestCase #{index + 1}</strong></p>
                                <p><strong>Input:</strong> {tst.Test}</p>
                                <p><strong>Expected Output:</strong> {tst.ExpectedOpt}</p>
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

            {
                tcinvalid && <p style={{color:"red"}}>Input Test case or expected output cannot be empty</p>
            }

            <button className="btn btn-outline-dark col-2" onClick={addExDispTst}>Add Test</button>
        </div >
    )
}