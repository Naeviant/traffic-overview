import fs from 'fs';

export default function archiveData(roads: string[]) {
    const timestamps = fs.readdirSync(__dirname + `/../../data/roads/historical`);
    for (const timestamp of timestamps) {
        if (parseInt(timestamp) < Date.now() - 86400000) {
            fs.rmSync(__dirname + `/../data/roads/historical/${timestamp}`, { recursive: true, force: true });
        }
    }

    const fetchTime = (Math.floor((Date.now() - 300000) / 60000) * 60000).toString();
    fs.mkdirSync(__dirname + `/../../data/roads/historical/${ fetchTime }`);
    for (const road of roads) {
        if (fs.existsSync(__dirname + `/../../data/roads/${ road }.json`)) {
            fs.copyFileSync(__dirname + `/../../data/roads/${ road }.json`, __dirname + `/../../data/roads/historical/${ fetchTime }/${ road }.json`);
        }
    }
}