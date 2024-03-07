import { Buffer } from 'buffer';

export const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    })
}

export const toBase64 = (file) => {
    const base64 = new Buffer(file, 'base64').toString('binary');
    return base64;
}