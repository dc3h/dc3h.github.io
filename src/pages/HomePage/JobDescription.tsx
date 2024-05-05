import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useBoundStore } from 'store/store';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#EEF7FF',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
        color: '#EEF7FF'
    },
    '& .MuiOutlinedInput-root': {
        color: "#EEF7FF",
        borderRadius: "20px",
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
            color: '#EEF7FF'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
            color: '#EEF7FF'
        },
    },
  });

export default function JobDescriptionTag(){
    const jobDescription = useBoundStore(state => state.jobDescription);
    const setJobDescription = useBoundStore(state => state.setJobDescription);

    const handleOnChange = (e) => {
        setJobDescription(e.target.value);
    }

    return (
        <CssTextField
            id="outlined-multiline-static"
            label="Job Description"
            multiline
            rows={9}
            color="warning"
            defaultValue={jobDescription}
            sx={{width: "100%", color: "white"}}
            onChange={e => {handleOnChange(e)}}
            focused
        />
    );
}