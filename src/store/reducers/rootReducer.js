import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import countReducer from './countReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}
const countPersist = {
    ...persistCommonConfig,
    key: 'count'
}


const rootReducer = combineReducers({
    count: persistReducer(countPersist, countReducer),
})

export default rootReducer;