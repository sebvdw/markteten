import fetch from 'node-fetch';

let url = "https://api.openai.com/v1/images/generations ";

export class GenerateImageApi {
    generateImage(description) {
        return fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(process.env.OPENAI_API_KEY)
            },
            body: JSON.stringify(
                {
                    prompt: description,
                    n: 1,
                    size: '256x256'
                }
        )}).then((response) =>  response.json())
    }
}

export default new GenerateImageApi();