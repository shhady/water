import { EVENT_ICONS,EVENTS_TITLES,ICON_FILTER } from '../../services/MyProvider';
import colorfilterGenerator from '../../services/colorFilterGenerator'
import { useMemo } from 'react';


/**
 * A component that renders an icon for the given trigger.
 * @param trigger - The trigger to render an icon for.
 * @param style - The style to apply to the icon.
 * @param white - Whether or not the icon should be white.
 * @param className - The class name to apply to the icon.
 * @returns A React component that renders an icon for the given trigger.
 */
export default function TrigIcon({ trigger, style, white = false, className = '' }) {

  //   console.log(`color ${i} - ${colorfilterGenerator(EVENT_COLORS[`trig${i}`])}`)
  const getFilter = useMemo(() => ICON_FILTER[`trig${trigger}`], [trigger])
  const tempStyle = { width: '25px', height: '25px', margin: "0 10px", ...style }
  if (!white) tempStyle.filter = getFilter
  return (<img className={className} src={EVENT_ICONS[`trig${trigger}`]} style={tempStyle} alt={EVENTS_TITLES[`trig${trigger}`]} />)
}
