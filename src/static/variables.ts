const speechSynUtt = new window.SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
const voices = synth.getVoices();

export const Variables = {
    voices: voices.filter(obj => obj.lang === "en-US").map(item => item.name),
    gcpVoices: [
        'en-US-Neural2-H 👑',
        'en-US-Neural2-G 👑',
        'en-US-Neural2-I 👑',
        'en-US-Neural2-J 👑',
    ]
}
