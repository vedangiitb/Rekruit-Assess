import React, { useState } from "react";

export default function InputConstrCompo({ addInpCnstr, removeInpCnstr, cnstrs }) {
    const [inpCnstrVal, setinpCnstrVal] = useState('')
    const [invalid, setInvalid] = useState(false)

    const setValue = (e, func) => {
        func(e.target.value)
    }

    const addNewCnstr = () => {
        if (inpCnstrVal) {
            addInpCnstr(inpCnstrVal)
            setinpCnstrVal('')
            setInvalid(false)
        }
        else {
            setInvalid(true)
        }

    }

    return (
        <div className="card  p-2">
            <div>
                {
                    cnstrs.map((item, index) => (
                        <div className="p-2" style={{ backgroundColor: "#EFEEEE", borderRadius: "10px", marginBottom: "5px",display:"flex",justifyContent:"space-between" }}>
                            <li key={index} style={{ listStyle: "none" }}>
                                {item}
                            </li>
                            <span class="material-symbols-outlined" onClick={() => removeInpCnstr(index)}>delete</span>
                        </div>
                    ))
                }
            </div>
            <div class="input-group mb-3">
                <textarea className="form-control" value={inpCnstrVal} onChange={(e) => setValue(e, setinpCnstrVal)} />
            </div>
            {
                invalid && <p style={{ color: "red" }}>Constraint cannot be empty</p>
            }
            <button className="btn btn-outline-dark col-2" onClick={addNewCnstr}>Add Constraint</button>
        </div>
    )
}