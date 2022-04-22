import { configureStore } from '@reduxjs/toolkit';
import road from './state/road';
import roads from './state/roads';
import showCCTV from './state/showCCTV';
import showDistances from './state/showDistances';
import showIncidents from './state/showIncidents';
import showRoadworks from './state/showRoadworks';
import showSidebar from './state/showSidebar';
import showSpeeds from './state/showSpeeds';
import showVMS from './state/showVMS';

export default configureStore({
    reducer: {
        road,
        roads,
        showCCTV,
        showDistances,
        showIncidents,
        showRoadworks,
        showSpeeds,
        showSidebar,
        showVMS,
    },
});
