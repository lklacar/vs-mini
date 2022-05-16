import {invoke} from "@tauri-apps/api";


export async function readFile(filePath) {
    return invoke('read_file', {filePath});
}

export async function writeFile(filePath, content) {
    return invoke('write_file', {filePath, content});
}