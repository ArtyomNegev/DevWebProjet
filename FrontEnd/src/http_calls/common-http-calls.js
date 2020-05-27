import { BASEURL_PORT } from "../constant/constant";

export default function getBaseURL() {
		// return BaseURL to reach backend
		
		console.log('window.location.protocol', window.location.protocol)
		console.log('window.location.hostname', window.location.hostname)
		
		
		var result = window.location.protocol + '//' + window.location.hostname + ':' + BASEURL_PORT + '/'
		
		console.log('getBaseURL', result)
		
		return result
	}
