import Editor from "@monaco-editor/react";
import {useEffect, useState} from "react";
import {getMatches} from "@tauri-apps/api/cli";
import {readFile, writeFile} from "../service/fileService";
import Loader from "../Loader";
import {KeyCode, KeyMod} from "monaco-editor";

async function saveFile(filePath, content) {
    await writeFile(filePath, content)
}

function setupActions(editor, filePath) {
    editor.addAction({
        id: "save",
        label: "Save",
        run: () => saveFile(filePath, editor.getValue()),
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS]
    })
}

function App() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [filePath, setFilePath] = useState(null);

    useEffect(() => {
        async function processCli() {
            setLoading(true);
            const matches = await getMatches();
            const filePath = matches.args.file?.value;
            setFilePath(filePath);
            if (!filePath) {
                alert(`${filePath} does not exist`)
                return;
            }

            const content = await readFile(filePath);
            setContent(content);
            setLoading(false);

        }

        // noinspection JSIgnoredPromiseFromCall
        processCli();
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <Editor
            value={content}
            loading={<Loader/>}
            height="100vh"
            width={"100vw"}
            onMount={editor => setupActions(editor, filePath)}
            theme="vs-dark"
            defaultLanguage="javascript"
        />
    );
}

export default App;
