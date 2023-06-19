import React ,{useState} from 'react'

export default function Fields({parameter, updatedParam, paramsToShow}) {
  const [minValue, setMinValue] = useState(parameter.min_value);
  const [maxValue, setMaxValue] = useState(parameter.max_value);
  const [timeValue, setTimeValue] = useState(timeToNumber(parameter.time_delta));
  const paramToShow = paramsToShow.find( param => param.trigger_id === parameter.trigger_id);
  const showMin = (paramToShow.min_value === 1)? true: false;
  const showMax = (paramToShow.max_value === 1)? true: false;
  const showTime= (paramToShow.time_delta === 1)? true: false;

  function timeToNumber(time) {
    if (time)
      return Number(time.slice(0,2));
  }
  
  return (
      <fieldset className="parameter">
          <header>{parameter.name}</header>
          {showMin && <label htmlFor="min_value">ערך מינימלי ב{parameter.value_type}</label>}
          {showMin && <input type="number" name="min_value" id="min_value" value={minValue} onChange={(e)=> setMinValue((e.target.value==='')? 0: e.target.value)} onBlur={()=> {updatedParam("min", minValue, parameter.parameter_id)}
      }/>}
          {showMax && <label htmlFor="max_value">ערך מקסימלי ב{parameter.value_type}</label>}
          {showMax && <input type="number" name="max_value" id="max_value" value={maxValue} onChange={(e)=> setMaxValue((e.target.value==='')? 0: e.target.value)} onBlur={()=> updatedParam("max", maxValue, parameter.parameter_id)} />}
          {showTime && <label htmlFor="time_delta">ערך בשעות</label> }
          {showTime && <input type="number" name="time_delta" id="time_delta" value={timeValue} onChange={(e)=> setTimeValue((e.target.value==='')? 0: e.target.value)} onBlur={()=> updatedParam("time", timeValue, parameter.parameter_id)}/> }
     </fieldset>                    
  )
}
