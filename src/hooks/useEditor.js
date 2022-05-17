import {getMatches} from "@tauri-apps/api/cli";
import {readFile} from "../service/fileService";
import {useEffect, useState} from "react";
import {exit} from "@tauri-apps/api/process";

export default function useEditor() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [filePath, setFilePath] = useState(null);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        async function processCli() {
            setLoading(true);
            const matches = await getMatches();
            const filePath = matches.args.file?.value;
            setFilePath(filePath);
            if (!filePath) {
                setErrors([{
                    message: "You must open an existing file"
                }]);
                setLoading(false);
                return;
            }

            const content = await readFile(filePath);
            setContent(content);
            setLoading(false);
        }

        // noinspection JSIgnoredPromiseFromCall
        processCli();
    }, [])

    return {
        content, loading, filePath, errors
    }
}