import {KeyCode, KeyMod} from "monaco-editor";
import {writeFile} from "../service/fileService";

async function saveFile(filePath, content) {
    await writeFile(filePath, content)
}

export default function setupActions(editor, {filePath}, onAction) {
    editor.addAction({
        id: "save-file",
        label: "Save file",
        run: () => {
            saveFile(filePath, editor.getValue());
            onAction("save-file");
        },
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS]
    })
}
