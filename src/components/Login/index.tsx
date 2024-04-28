import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { v4 } from 'uuid';
import { useState } from 'react';
import { useBoundStore } from 'store/store';
import styled from 'styled-components';
import { getLogin } from 'services/voiceService';
import { toast } from 'react-toastify';

interface LoginProps {
  status?: boolean;
}

const StyledLoginButton = styled.button<LoginProps>`
  /* width: ${(props) => (props.status ? '80px': '100px')};
  height: ${(props) => (props.status ? '80px': '50px')};
  border-radius: ${(props) => (props.status ? '50%': '30px')}; */
  width: 100px;
  height: 50px;
  border-radius: 30px;
  cursor: pointer;
  color: white;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export function LoginButton(){
  const [openLoginDialog, setLoginDialog] = useState(false);
  const [openSettingDialog, setSettingDialog] = useState(false);
  const userId = useBoundStore(state => state.userId);
  const status = userId !== '' ? true : false;
  return (
    <>
    <StyledLoginButton
      onClick={() => {
        if (status) {
          setSettingDialog(!openSettingDialog)
        } else {
          setLoginDialog(!openLoginDialog);
        }
      }}
      status={status}
    >{status ? 'Setting' : 'Login'}</StyledLoginButton>
    <LoginDialog isOpen={openLoginDialog} setOpen={setLoginDialog} />
    <SettingDialog isOpen={openSettingDialog} setOpen={setSettingDialog} />
    </>
  );
}


export function LoginDialog({ isOpen, setOpen }){
    const [email, setEmail] = useState('');
    // const sessionId = useBoundStore(state => state.sessionId);
    const setSessionId = useBoundStore(state => state.setSessionId);
    const setUserId = useBoundStore(state => state.setUserId);

    const handleInputChange = e => {
        setEmail(e.target.value);
    };

    const handleRequestSubmit = async () => {
      const response = await getLogin(email);
      if (response.status){
        setUserId(email);
        setSessionId(v4());
        toast.info('Login Sucessfully', {
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
        toast.error('Your request Email not supported', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      setOpen(false);
    };

    return (
    <Dialog
        open={isOpen}
        onClose={() => {setOpen(false);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Wanna try our free service ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine your identity, only admin have full access to this application.
            Because of this BETA version, so please contact `ndthinh0201@gmail.com` for authentication. 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Your Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false);}}>Cancel</Button>
          <Button onClick={handleRequestSubmit} autoFocus>
            Request
          </Button>
        </DialogActions>
    </Dialog>
    );
}


export function SettingDialog({ isOpen, setOpen }){
  const setJobDescription = useBoundStore(state => state.setJobDescription);
  const [JD, setJD] = useState('');

  const handleInputChange = e => {
    setJD(e.target.value);
  };

  const handleRequestSubmit = async () => {
    setJobDescription(JD);
    toast.info('Uploaded JD Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setOpen(false);
  };

  return (
  <Dialog
      open={isOpen}
      onClose={() => {setOpen(false);}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Wanna custom your own service ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let our know about your job description in detail. JD must included engough information about your position
            and its requirements.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="jd"
          label="Your JD here"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {setOpen(false);}}>Cancel</Button>
        <Button onClick={handleRequestSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
  </Dialog>
  );
}