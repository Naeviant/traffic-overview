import cron from 'node-cron';
import fs from 'fs';

import fetchRoadData from '../fetchers/fetchRoadData';

/* eslint-disable no-console */

// Update batch 1 of road data - every five minutes
export const fetchRoadDataJob1 = cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 1 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(`${__dirname}/../../data/roads1.json`, 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 1 of Road Data (${cronTime / 1000} Seconds)`);
});
fetchRoadDataJob1.stop();

// Update batch 2 of road data - every five minutes
export const fetchRoadDataJob2 = cron.schedule('1,6,11,16,21,26,31,36,41,46,51,56 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 2 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(`${__dirname}/../../data/roads2.json`, 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 2 of Road Data (${cronTime / 1000} Seconds)`);
});
fetchRoadDataJob2.stop();

// Update batch 3 of road data - every five minutes
export const fetchRoadDataJob3 = cron.schedule('2,7,12,17,22,27,32,37,42,47,52,57 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 3 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(`${__dirname}/../../data/roads3.json`, 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 3 of Road Data (${cronTime / 1000} Seconds)`);
});
fetchRoadDataJob3.stop();

// Update batch 4 of road data - every five minutes
export const fetchRoadDataJob4 = cron.schedule('3,8,13,18,23,28,33,38,43,48,53,58 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 4 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(`${__dirname}/../../data/roads4.json`, 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 4 of Road Data (${cronTime / 1000} Seconds)`);
});
fetchRoadDataJob4.stop();

// Update batch 5 of road data - every five minutes
export const fetchRoadDataJob5 = cron.schedule('4,9,14,19,24,29,34,39,44,49,54,59 * * * *', async () => {
    const cronStart = Date.now();
    console.log('Fetching Batch 5 of Road Data...');

    const roads = JSON.parse(fs.readFileSync(`${__dirname}/../../data/roads5.json`, 'utf8'));
    await fetchRoadData(roads);

    const cronEnd = Date.now();
    const cronTime = cronEnd - cronStart;
    console.log(`Finished Fetching Batch 5 of Road Data (${cronTime / 1000} Seconds)`);
});
fetchRoadDataJob5.stop();
