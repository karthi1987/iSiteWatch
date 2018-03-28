// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    envName: 'dev',
    getAuthenticateUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/authenticate',
    getProjectSitesUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/site',
    getSiteLocationsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/location',
    // Use _.template(getSiteEventsUrl)({'locationId': 'value of location ID'})
    // getSiteEventsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/event/<%= locationId %>',
    // Append getSiteEventsUrl with locationId
    getSiteEventsUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/event/',
    getImageHistoryUrl: 'https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/image-history'
};
