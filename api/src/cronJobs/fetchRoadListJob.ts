import cron from 'node-cron';

import fetchRoadList from '../fetchers/fetchRoadList';

/* eslint-disable no-console, import/prefer-default-export */

// Update list of motorways - every 24 hours at 12pm
export const fetchRoadListJob = cron.schedule('* 12 * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching List of Roads...');

    await fetchRoadList();

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching List of Roads (${cronTime / 1000} Seconds)`);
});
fetchRoadListJob.stop();
