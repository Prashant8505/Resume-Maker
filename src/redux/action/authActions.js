import * as authActions from './actions'

export const registerReq = () => {
    return {
        type: authActions.SIGN_UP_REQUEST
    }
}

export const registerFail = (err) => {
    return {
        type: authActions.SIGN_UP_FAILED,
        payload: err
    }
}

export const registerSuc = () => {
    return {
        type: authActions.SIGN_UP_SUCCESS
    }
}

export const removeError = () => {
    return {
        type: authActions.REMOVE_ERROR
    }
}

export const register = (userData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (data) => {
            const res = await firestore.collection('users').doc(data.user.uid).set({
                email: userData.email,
                resumeIds: []
            })

            dispatch(registerSuc())
        }).catch((error) => {
            dispatch(registerFail())
            setTimeout(() => {
                dispatch(removeError())
            }, 2000)
        })
    }
}




//-----------------------------------SIGN-IN----------------------------------------------------//




export const signInReq = () => {
    return {
        type: authActions.SIGN_IN_REQUEST
    }
}

export const signInFail = (err) => {
    return {
        type: authActions.SIGN_IN_FAILED,
        payload: err
    }
}

export const signInSuc = () => {
    return {
        type: authActions.SIGN_IN_SUCCESS
    }
}



export const signin = (userData) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(registerReq())
        const firebase = getFirebase();
        try {
            const res = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
            dispatch(signInSuc())
        } catch (err) {
            dispatch(signInFail(err))
            setTimeout(() => dispatch(removeError()),
                2000)
        }
    }
}

export const signout = (userData) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // dispatch(registerReq())
        const firebase = getFirebase();
        firebase.auth().signOut().then(() =>
            dispatch({ type: authActions.SIGN_OUT_SUCCESS })
        ).catch(err => {
            dispatch({ type: authActions.SIGN_OUT_FAILED, payload: err })
            setTimeout(() => dispatch(removeError()), 2000)
        })
    }
}
