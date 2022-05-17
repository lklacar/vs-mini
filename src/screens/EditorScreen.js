import Editor from "@monaco-editor/react";
import Loader from "../Loader";
import setupActions from "../actions";
import useEditor from "../hooks/useEditor";
import {appWindow} from "@tauri-apps/api/window";
import {useEffect, useState} from "react";


function getLanguageFromFile(filePath) {
    const extension = filePath.split(".")[1];
    return {
        "js": "javascript",
        "ts": "typescript",
        "css": "css",
        "less": "less",
        "saas": "saas",
        "json": "json",
        "html": "html",
        "java": "java"
    }[extension]
}

function EditorScreen() {
    const {content, loading, filePath, errors} = useEditor()
    const [windowTitle, setWindowTitle] = useState(filePath);

    const handleMount = async editor => {
        await setWindowTitle(filePath);
        setupActions(editor, {filePath}, action => {
            if (action === "save-file") {
                setWindowTitle(windowTitle.replace(" *", ""))
            }
        });
    };

    function handleOnChange() {
        if (windowTitle.indexOf("*") === -1) {
            setWindowTitle(`${windowTitle} *`)
        }
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        appWindow.setTitle(windowTitle)
    }, [windowTitle])

    if (errors) {
        return <div className="flex min-h-screen justify-center items-center">{errors.map(error =>
            <p className="text-2xl text-white">{error.message}</p>)}</div>
    }


    return loading ? <Loader/> : (<div>
            <Editor
                onChange={handleOnChange}
                value={content}
                loading={<Loader/>}
                height="100vh"
                width={"100vw"}
                onMount={handleMount}
                theme="vs-dark"
                defaultLanguage={getLanguageFromFile(filePath)}
            />
        </div>
    );


}

export default EditorScreen;
