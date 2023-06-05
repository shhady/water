import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





/**
 * A custom switch component that uses the Material UI Switch component.
 * @param checked - Whether the switch is checked.
 * @param toggle - A function that toggles the checked state.
 * @param label - The label of the switch.
 * @param classes - The classes to apply to the switch.
 * @returns A custom switch component.
 */
const MySwitch = withStyles((theme) => ({
  
  formControlLable:{
    
    fontSize:'1rem',
    background:'rgba(250,250,250,.7)',
    borderRadius:'25px',
    padding:'0 10px',
    

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
    border:'1px solid var(--gray)',
    color:'var(--light-gray)',

  },
  track: {
    
    height:20,
    borderRadius: 20 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))

  (({ checked, toggle, label,classes, ...props }) => {

    const [state, setState] = React.useState(checked)

    const handleChange = (e) => {
      setState(prev => !prev);
      toggle(e);
    }

    return (

      <FormControlLabel
        labelPlacement='start'
        checked={state}
        label={label}
        classes={{label: classes.formControlLable}}
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
  })

export default MySwitch