import React, { useState, useEffect } from "react";

export default function AllowedLangsCompo({ setAllowedLangs, langs,edit }) {
    const allowedLangList = ['Python', 'JavaScript', 'C++', 'Java'];
    const [isAllowed, setIsAllowed] = useState([true, true, true, true]);

    useEffect(() => {
        if (edit) {
            console.log(langs)
            setIsAllowed(langs)
        }
    }, [langs]);

    const toggleChecked = (index) => {
        const newIsAllowed = [...isAllowed];
        newIsAllowed[index] = !newIsAllowed[index];
        setIsAllowed(newIsAllowed);
        setAllowedLangs(newIsAllowed);
    }

    return (
        <div className="card p-2">
            {allowedLangList.map((element, index) => (
                <div className="form-check" key={index}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={element}
                        checked={isAllowed[index]}
                        onChange={() => toggleChecked(index)}
                    />
                    <label className="form-check-label" htmlFor={`flexCheck${element}`}>
                        {element}
                    </label>
                </div>
            ))}
        </div>
    );
}
