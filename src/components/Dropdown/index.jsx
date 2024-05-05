import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const CssSelect = styled(Select)({
  '& .MuiSelect-root': {
    color: '#EEF7FF',
  }
});

export default function Dropdown({ label, values, width, onChange }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={{ width: width, marginTop: 5 }}>
      <FormControl fullWidth>
        <InputLabel sx={{color: "white"}} id="demo-simple-select-error-label">{label}</InputLabel>
        <CssSelect
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={value}
          label={label}
          onChange={handleChange}
          sx={{color: "white"}}
        >
            {values.map((value, key) => {
                return (
                    <MenuItem value={value}>{value}</MenuItem>
                )
            })}
        </CssSelect>
      </FormControl>
    </Box>
  );
}
