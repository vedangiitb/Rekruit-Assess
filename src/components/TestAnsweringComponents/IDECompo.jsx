import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";

export default function IDECompo({ runTests,runFinalTests }) {
    const [lang, setLang] = useState("Python");
    const [code, setCode] = useState("");
    const [compLang, setCompLang] = useState(python());

    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value);
    }, []);


    const handleLangChange = (selectedLang) => {
        setLang(selectedLang);
        switch (selectedLang) {
            case "Python":
                setCompLang(python());
                break;
            case "Javascript":
                setCompLang(javascript());
                break;
            case "Java":
                setCompLang(java());
                break;
            case "C++":
                setCompLang(cpp());
                break;
            default:
                setCompLang(python());
        }
    };

    return (
        <div className="ideCompo" style={{ height: "90vh" }}>
            <div className="topbar" style={{ display: "flex", gap: "2px", padding: "5px", width: "100%" }}>
                <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {lang}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <button className={`dropdown-item ${lang === 'Javascript' ? 'active' : ''}`} onClick={() => handleLangChange('Javascript')}>
                                Javascript
                            </button>
                        </li>
                        <li>
                            <button className={`dropdown-item ${lang === 'Java' ? 'active' : ''}`} onClick={() => handleLangChange('Java')}>
                                Java
                            </button>
                        </li>
                        <li>
                            <button className={`dropdown-item ${lang === 'C++' ? 'active' : ''}`} onClick={() => handleLangChange('C++')}>
                                C++
                            </button>
                        </li>
                        <li>
                            <button className={`dropdown-item ${lang === 'Python' ? 'active' : ''}`} onClick={() => handleLangChange('Python')}>
                                Python
                            </button>
                        </li>
                    </ul>
                </div>

                <button className="btn btn-outline-primary" style={{ display: "flex", alignItems: "center" }} onClick={() => runTests(code, lang)}>
                    <span class="material-symbols-outlined">play_arrow</span>
                    Run
                </button>
                <button className="btn btn-outline-success" style={{ display: "flex", alignItems: "center" }} onClick={()=>runFinalTests(code,lang)}>
                    <span class="material-symbols-outlined">
                        cloud_upload
                    </span>
                    Submit
                </button>

            </div>



            <CodeMirror
                value={code}
                height="90vh"
                theme="dark"
                extensions={[compLang]}
                onChange={onChange}
            />
        </div>
    );
}
