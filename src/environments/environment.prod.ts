export const environment = {
  production: true,
	getAuthenticateUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/authenticate',
	getProjectSitesUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/site',
	getSiteLocationsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/location',
	// Use _.template(getSiteEventsUrl)({'eventId': 'value of event ID'})
	// getSiteEventsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/event/<%= eventId %>',
	// Append getSiteEventsUrl with eventId
	getSiteEventsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/event/',
	getImageHistoryUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/image-history'
};
