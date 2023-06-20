/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/




/**
 * Takes in a city, street, and number and returns the coordinates of the address.       
 * @param {string} city - the city of the address.       
 * @param {string} street - the street of the address.       
 * @param {string} number - the number of the address.       
 * @returns {Promise<{partAddress: string, geometry: google.maps.LatLng, address: string, request: google.maps.GeocoderRequest}>} - a promise that resolves to the address, coordinates, and request.       
* @returnkey geometry: Geocode lat & lng location from Google geocode Api.
* @returnkey address: String human readable address string from Google geocode Api.
* @returnkey partAddress: Object address destructed to City,Street,Number
* @returnkey request: requset Object sent to Google geocode Api .

*/
export async function addressToCord(city, street, number) {
  const geocoder = new window.google.maps.Geocoder()
  const geocoderRequest = { address: (Number(number)) ? street + ' ' + number + ' ' + city : street + ' ' + city }
  const data = await geocoder.geocode(geocoderRequest);
  const partAddress= destructGeocode(data);

  return new Promise((resolve, reject) => {
    if (partAddress) {
      resolve({ partAddress:partAddress, geometry: data.results[0].geometry.location, address: data.results[0].formatted_address, request: geocoderRequest });
    }
    else
      reject({ geometry: data.results[0].geometry.location, address: data.results[0].formatted_address, request: geocoderRequest });
  })
}

/**
 * 
 * @param {float} lat 
 * @param {float} lng 
 * @returns {Promise} Object
 * @returnkey geometry: Geocode lat & lng location from Google geocode Api.
 * @returnkey address: String human readable address string from Google geocode Api.
 * @returnkey partAddress: Object address destructed to City,Street,Number
 * @returnkey request: requset Object sent to Google geocode Api .
 */
export async function CordToAddress(lat, lng) {
  const geocoder = new window.google.maps.Geocoder()
  const geocoderRequest = { location: { lat: parseFloat(lat), lng: parseFloat(lng) } }
  const data = await geocoder.geocode(geocoderRequest);
  const partAddress= destructGeocode(data);

  return new Promise((resolve, reject) => {
    if (partAddress) {
      resolve({ partAddress:partAddress, geometry: data.results[0].geometry.location, address: data.results[0].formatted_address, request: geocoderRequest });
    }
    else
      reject({ geometry: data.results[0].geometry.location, address: data.results[0].formatted_address, request: geocoderRequest });
  })
}

/**
 * Takes in a geocode result and returns a destructured object with the city, street, and number.       
 * @param {object} geocodeResults - the geocode results object       
 * @returns {object} destructured object with the city, street, and number.       
 */
function destructGeocode(geocodeResults) {
  let city, street, number;
  for (const result in geocodeResults.results) {
    if(city && street && number)
      return({city,street,number})
    if (geocodeResults.results[result].types.includes('street_address')) {
      for (const partAddress in geocodeResults.results[result].address_components) {

        if (!city && geocodeResults.results[result].address_components[partAddress].types.includes('locality')) {
          city = geocodeResults.results[result].address_components[partAddress].long_name;
        }
        if (!street && geocodeResults.results[result].address_components[partAddress].types.includes('route')) {
          street = geocodeResults.results[result].address_components[partAddress].long_name;
        }
        if (!number && geocodeResults.results[result].address_components[partAddress].types.includes('street_number')) {
          number = geocodeResults.results[result].address_components[partAddress].long_name;
        }
      }

    }
  }
  if(city && street )
      return({city,street,number:number})  
}





// export async function addressToCord2(city, street, number) {
//
//   const { REACT_APP_MAP_TOKEN } = process.env
//
//   if (city != "" && street != "") {
//     let fullAddress = (Number(number)) ? street + ' ' + number + ',' + city : street + ',' + city
//     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&language=iw&key=${REACT_APP_MAP_TOKEN}`)
//     const data = await response.json()
//     console.log(data)
//
//     return new Promise((resolve, reject) => {
//       if (data?.status === "OK") {
//         resolve({ found: true, geometry: data.results[0].geometry.location, formatted_address: data.results[0].formatted_address })
//       }
//       else
//         reject({ found: false })
//     })
//   }
// }

