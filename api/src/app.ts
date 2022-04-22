import * as dotenv from 'dotenv';

import { fetchRoadListJob } from './cronJobs/fetchRoadListJob';
import {
    fetchRoadDataJob1,
    fetchRoadDataJob2,
    fetchRoadDataJob3,
    fetchRoadDataJob4,
    fetchRoadDataJob5,
} from './cronJobs/fetchRoadDataJob';
import server from './server';

dotenv.config();

fetchRoadListJob.start();
fetchRoadDataJob1.start();
fetchRoadDataJob2.start();
fetchRoadDataJob3.start();
fetchRoadDataJob4.start();
fetchRoadDataJob5.start();

const PORT = process.env.API_PORT ?? 8080;
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Listening on Port ${PORT}`);
});
