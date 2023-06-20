import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@mui/material/colors';
import { FormGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const MySwitch = withStyles((theme) => ({
  formControlLabel: {
    fontSize: '1rem',
    background: 'rgba(250, 250, 250, 0.7)',
    borderRadius: '25px',
    padding: '0 10px',
  },
  root: {
    width: 42,
    height: 26,
    padding: '4px 2px',
    margin: '4px 0',
  },
  switchBase: {
    padding: '4px 1px',
    '&$checked': {
      transform: 'translateX(18px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: 'var(--green)',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
    border: '1px solid var(--gray)',
    color: 'var(--light-gray)',
  },
  track: {
    height: 20,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ checked, toggle, label, classes, ...props }) => {
  const [state, setState] = React.useState(checked);

  const handleChange = (e) => {
    setState((prev) => !prev);
    toggle(e);
  };

  return (
    <FormControlLabel
      labelPlacement="start"
      checked={state}
      label={label}
      classes={{ label: classes.formControlLabel }}
      control={
        <Switch
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          onChange={handleChange}
          name={label}
          inputProps={{ 'aria-label': label }}
        />
      }
    />
  );
});

function MyForm() {
  return (
    <FormGroup>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Option 1</Typography>
        </Grid>
        <Grid item>
          <MySwitch checked={false} toggle={() => {}} label="" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Option 2</Typography>
        </Grid>
        <Grid item>
          <MySwitch checked={false} toggle={() => {}} label="" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Option 3</Typography>
        </Grid>
        <Grid item>
          <MySwitch checked={false} toggle={() => {}} label="" />
        </Grid>
      </Grid>
    </FormGroup>
  );
}

export default MyForm;