import axios from 'axios';
import { API_SERVER } from 'static/key';

const speechSynUtt = new window.SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

export async function getChatCompletion(conversation, sessionId, jobDescription){
    const url = `${API_SERVER}/chat/completion`;

    const payload = {
        'messages': conversation,
        'prompt': jobDescription,
        'session_id': sessionId
    }

    const response = await axios.post(url, payload);

    return {
        text: response.data["response"]
    }
}


export async function getVoiceTranscription(blob, sessionId){
    const url = `${API_SERVER}/voice/speech_transcription`;
    const payload = new FormData();
    payload.append('session_id', sessionId);
    payload.append('audio_file', blob, 'audio.wav');

    const response = await axios.post(url, payload);
    return {
        transcript: response.data["transcript"]
    }
}


export async function getTextToSpeech(text, sessionId){
    const url = `${API_SERVER}/voice/text_to_speech`;
    const payload = {
        "text": text,
        "session_id": sessionId
    }
    const response = await axios.post(url, payload);
    return {
        audio: response.data['audio']
    };
}


export async function getLogin(userId){
    const url = `${API_SERVER}/user/login`;
    const payload = {
        "user_id": userId
    }
    const response = await axios.post(url, payload);
    return {
        status: response.data['status']
    }
}

export async function speakText(text, sessionId, isLocal = true, setProcess){
    async function local_speech(){
        const voices = synth.getVoices();
        speechSynUtt.text = text;
        speechSynUtt.lang = "en-US";
        speechSynUtt.voice = voices[0];
        speechSynUtt.rate = 0.8;
        speechSynUtt.onend = function(event) {
            setProcess(false);
        };
        window.speechSynthesis.speak(speechSynUtt);
    }
    async function api_speech(){
        const response = await getTextToSpeech(text, sessionId);
        const audioByteString = atob(response.audio);
        const audioByteArray = new Uint8Array(audioByteString.length);
        for(let i = 0; i < audioByteString.length; i++) {
          audioByteArray[i] = audioByteString.charCodeAt(i);
        }
    
        // Create a Blob object from the byte array
        const audioBlob = new Blob([audioByteArray], { type: 'audio/mp3' });
    
        // Create an audio element and play the Blob audio
        const audio = new Audio();
        audio.src = URL.createObjectURL(audioBlob);
        audio.onended = function() {
            setProcess(false);
        };
        audio.play();
    }

    if (isLocal){
        local_speech();
    } else {
        try {
            api_speech();
        } catch {
            local_speech();
        }
    }
}