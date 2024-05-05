import styled from "styled-components";
import { Fragment, useState } from 'react';
import ReactMicrophone from "components/ReactMic";
import { ActionButton } from "components/ActionButton";
import { useBoundStore } from 'store/store';
import Dropdown from "components/Dropdown";
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { speakText } from "services/voiceService";
import { toast } from 'react-toastify';
import { Variables } from "static/variables";

const ActionLayout = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-around;
    /* align-items: center; */
`

export default function ActionSide({ isLazy, process, setProcess }){
    const synth = window.speechSynthesis;
    const voices_lib = synth.getVoices();
    const voices = voices_lib.filter(obj => obj.lang === "en-US").map(item => item.name);
    const conversation = useBoundStore(state => state.conversation);
    const sessionId = useBoundStore(state => state.sessionId);
    const voice = useBoundStore(state => state.voice);
    const setVoice = useBoundStore(state => state.setVoice);
    const setAgentType = useBoundStore(state => state.setAgentType);

    const handleNonDeveloped = () => {
        toast.warn('This feature is on developing', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        })
    }

    const handleRepeatButtonClick = () => {
        if (process) {
            toast.warn('Interviewer is speaking', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        } else {
            speakText(
                conversation[conversation.length - 1].content, 
                sessionId,
                voice,
                setProcess
            );
        }
    }

    return (
        <>
        <ActionLayout>
            <ReactMicrophone
                isHold={isLazy}
                tooltip={
                    <Fragment>
                        <Typography color="inherit">Micro Control</Typography>
                        {"You could use this button to manage your recording your voice."}
                    </Fragment>
                }
                process={process}
                setProcess={setProcess}
            />
            <ActionButton
                tooltip={
                    <Fragment>
                        <Typography color="inherit">Speaker Control</Typography>
                        {"You could use this to control the speaker of interviewer, such as repeat, pause, stop, ..."}
                    </Fragment>
                }
                IconComponent={
                    process ? SensorOccupiedIcon : ReplayCircleFilledIcon
                }
                onClick={handleRepeatButtonClick}
            />
            <ActionButton
                tooltip={
                    <Fragment>
                        <Typography color="inherit">Typing Control</Typography>
                        {"You could use this button to activate typing conversation instead of speaking"}
                    </Fragment>
                }
                IconComponent={MessageIcon}
                onClick={handleNonDeveloped}
            />
        </ActionLayout>
        <Dropdown
            label="Voices"
            values={
                [
                    ...voices,
                    ...Variables.gcpVoices,
                ]}
            width={"100%"}
            onChange={(voice) => {
                setVoice(voice);
                if (!Variables.gcpVoices.includes(voice)){
                    toast.warn('Free Voice might deal with unstable experience, if possible, just try Premium Voice', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    })
                }
            }}
        />
        <Dropdown
            label="Interviewer"
            values={["Beta Agent", "Advance Agent 👑"]}
            width={"100%"}
            onChange={setAgentType}
        />
        <Dropdown
            label="Difficult Level"
            values={["Intern", "Senior", "Principal"]}
            width={"100%"}
            onChange={handleNonDeveloped}
        />
        </>
    );
}

