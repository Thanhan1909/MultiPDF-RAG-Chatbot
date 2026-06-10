import axios from "axios";

const API = axios.create({
    baseURL: `http://${window.location.hostname}:5000`
});

export const askQuestion = async (question) => {
    try {
        const res = await API.post("/chat", { question });
        return res.data;
    } catch (err) {
        console.error("Error in askQuestion:", err);
        throw err;
    }
};

export const uploadPDF = async (file) => {
    const form = new FormData();
    form.append("file", file);

    try {
        const res = await API.post("/upload", form);
        return res.data;
    } catch (err) {
        console.error("Error in uploadPDF:", err);
        throw err;
    }
};