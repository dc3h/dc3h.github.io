import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot';
import axios from 'axios';
import { API_SERVER } from 'static/key';
import { Variables } from 'static/variables';
import { toast } from 'react-toastify';

export async function getChatCompletion(conversation, sessionId, jobDescription){
    try {
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
    catch {
        return {text: null}
    }
}


export async function getVoiceTranscription(audioFile, sessionId){
    const url = `${API_SERVER}/voice/speech_transcription`;
    const payload = new FormData();
    payload.append('session_id', sessionId);
    payload.append('audio_file', audioFile.blob, 'audio.wav');

    const response = await axios.post(url, payload);
    return {
        transcript: response.data["transcript"]
    }
}


export async function getTextToSpeech(text, sessionId, voice){
    try {
        const url = `${API_SERVER}/voice/text_to_speech`;
        const payload = {
            "text": text,
            "session_id": sessionId,
            "voice": voice,
        }
        const response = await axios.post(url, payload);
        return {
            audio: response.data['audio']
        };
    } catch {
        return { audio: null }
    }
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

export async function speakText(text, sessionId, voice, setProcess){
    async function local_speech(speechSynUtt){
        // let speechSynUtt = new window.SpeechSynthesisUtterance();
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        speechSynUtt.lang = "en-US";
        speechSynUtt.voice = voices[
            voices.findIndex(audio => audio.name === voice)
        ];
        speechSynUtt.rate = 0.9;
        speechSynUtt.onend = function(event) {
            console.log('Ending voice trigger');
            setProcess(false);
            speechSynUtt = null;
        };
        window.speechSynthesis.speak(speechSynUtt);
        // setProcess(false);
    }
    async function api_speech(){
        const response = await getTextToSpeech(text, sessionId, voice);
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

    try {
        if (Variables.gcpVoices.includes(voice)){
            console.log('Speak API');
            api_speech();
        } else {
            console.log('Speak local');
            let speechSynUtt: SpeechSynthesisUtterance | null = new window.SpeechSynthesisUtterance(text);
            local_speech(speechSynUtt);
            setProcess(false);
            speechSynUtt = null;
        }
    } catch (exception) {
        return;
    }
}