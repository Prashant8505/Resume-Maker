import * as documentAction from '../action/actions'
import { v4 as uuidv4 } from 'uuid';

export const setSkin = (skinCd) => {
    return {
        type: documentAction.SET_SKIN,
        payload: {
            id: uuidv4(),
            skinCd: skinCd
        }
    }
}

export const updateSkin = (skinCd) => {
    return {
        type: documentAction.UPDATE_SKIN,
        payload: {
            skinCd: skinCd
        }
    }
}