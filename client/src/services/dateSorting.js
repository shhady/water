
//This function Compare between 2 Dates in en-gb format DD/MM/YYYY HH:MM 
//Returns an integer indicating whether the a comes before, after or is equivalent to the b
function dateSorting(a,b) {   
    //handle empty b 
    if(!b) return 1
    //handle empty a
    if(!a) return -1
    let aParts = a.split(" ");    
    let bParts = b.split(" ");
    //if only one side has both Time & Date return the most accurate
    if(aParts.length !== bParts.length )
        return (aParts.length - bParts.length)
    //if only Time was given compare time
    if(aParts.length === 1 && !aParts[0].includes('/') && !bParts[0].includes('/') )    
        return (aParts[0].localeCompare(bParts[0]));
    //both same Date , compare Times
    if (aParts[0] === bParts[0] && aParts.length === 2)
        return (aParts[1].localeCompare(bParts[1]));
    //compare Dates :
    else {
        //split Dates to Year, Month, Day array.
        aParts = aParts[0].split("/");
        bParts = bParts[0].split("/");        
        if (aParts[2] === bParts[2]) //same year
            if (aParts[1] === bParts[1]) //same month 
                return (aParts[0].localeCompare(bParts[0])); //compare Days
            else
                return (aParts[1].localeCompare(bParts[1])); //compare Months 
        else
            return (aParts[2].localeCompare(bParts[2])); //compare Years
    }
}

export default dateSorting