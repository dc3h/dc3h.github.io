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
import { HtmlTooltip } from "components/Tooltip";


const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
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
    // padding: 25,
    zIndex: 2
  },
  icon: {
    width: 45,
    height: 45,
    color: "white",
    zIndex: 1
  }
}));


type ReactMicProps = {
  isHold: boolean;
  tooltip?: string | React.ReactNode;
  process?: boolean;
  setProcess?: any;
};

export default function ReactMicrophone(
  { isHold, tooltip, process, setProcess } : ReactMicProps
) {
  const [record, setRecord] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const sessionId = useBoundStore(state => state.sessionId);
  const userId = useBoundStore(state => state.userId);
  const chat = useBoundStore(state => state.chat);
  const conversation = useBoundStore(state => state.conversation);
  const jobDescription = useBoundStore(state => state.jobDescription);
  const voice = useBoundStore(state => state.voice);
  const agentType = useBoundStore(state => state.agentType);
  
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
    } else if (voice === '') {
      toast.error('Please choose voice for Interviewer', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (agentType === '') {
      toast.error('Please choose agent type for Interviewer', {
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
        tempFile, sessionId
      );
      if (response == null) {
        toast.error('API Error might due to authentication', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }
      await chat('user', response.transcript);
      const answer = await getChatCompletion(
        conversation, sessionId, jobDescription
      );
      await chat('assistant', answer.text);
      speakText(answer.text, sessionId, voice, setProcess);
    }
    if (sessionId !== '' && !record && tempFile && !process) {
      setProcess(true);
      responseFlow();
      setTempFile(null);
    }
  }, [record, tempFile]);

  const handleOnclick = () => {
    if (record) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <HtmlTooltip title={tooltip} disableInteractive>
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
    </HtmlTooltip>
    );
  }
