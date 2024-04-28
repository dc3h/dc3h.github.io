import { useState, useEffect } from "react";
import { ReactMic } from "react-mic";
import { styled } from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";

import DialogContent from "@material-ui/core/DialogContent";
import { red } from "@material-ui/core/colors";
import { speakText } from "services/voiceService";
import { useBoundStore } from 'store/store';
import { getChatCompletion, getVoiceTranscription } from "services/voiceService";
import { toast } from 'react-toastify';

// import "./microphone.css";

const Wrapper = styled.div`
  width: 100%;
  height: 'fit-content';
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
`
const useStyles = makeStyles(theme => ({
  dialog: {
    position: "absolute",
    opacity: 0,
    zIndex: 0
  },
  button: {
    height: 100,
    width: 100,
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "30px",
    padding: "10px",
    boxSizing: "border-box",
    padding: 25,
    zIndex: 2
  },
  icon: {
    width: 45,
    height: 45,
    color: "white",
    zIndex: 1
  }
}));

export default function ReactMicrophone({ isHold }) {
  const [record, setRecord] = useState(false);
  const [process, setProcess] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const sessionId = useBoundStore(state => state.sessionId);
  const userId = useBoundStore(state => state.userId);
  const chat = useBoundStore(state => state.chat);
  const conversation = useBoundStore(state => state.conversation);
  const jobDescription = useBoundStore(state => state.jobDescription);
  
  // setSession(sessionId);

  const startRecording = () => {
    if (process) {
      toast.info('Service on processing', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (userId === '') {
      toast.error('Please login for service', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      setRecord(true);
    }
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = recordedBlob => {
    // console.log("chunk of real-time data is: ", recordedBlob);
    // setTempFile(recordedBlob);
  };

  const onStop = recordedBlob => {
    setTempFile(recordedBlob);
  };

  const classes = useStyles();

  useEffect(() => {
    const responseFlow = async () => {
      const response = await getVoiceTranscription(
        tempFile.blob, sessionId
      );
      console.log(`User: ${response.transcript}`)
      await chat('user', response.transcript);
      const answer = await getChatCompletion(
        conversation, sessionId, jobDescription
      );
      console.log(`User: ${answer.text}`)
      await chat('assistant', answer.text);
      speakText(answer.text, sessionId, false, setProcess);
    }
    if (sessionId !== '' && !record && tempFile && !process) {
      setProcess(true);
      responseFlow();
      setTempFile(null);
    }
  }, [record, tempFile]);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        if (record) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [record]);

  const handleOnclick = () => {
    if (record) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <Wrapper>
      <IconButton
        className={classes.button}
        onClick={!isHold ? handleOnclick : undefined}
        onMouseDown={isHold ? startRecording : undefined}
        onMouseUp={isHold ? stopRecording : undefined}
      >
        {!record ? (
            <MicIcon className={classes.icon} />
          ) : (
            <StopIcon
              style={{ color: red[500] }}
              className={classes.icon}
            />
          )
        }
      </IconButton>
      <DialogContent className={classes.dialog}>
        <ReactMic
          record={record}
          onStop={onStop}
          onData={onData}
          strokeColor="grey"
          borderRadius="30px"
          backgroundColor="#A6F6FF"
          mimeType="audio/wav"
        />
        </DialogContent>
    </Wrapper>
  );
}
