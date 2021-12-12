import React from 'react'
import { useGoogleLogin } from 'react-google-login'
import { refreshTokenSetup } from './refreshTokenSetup'

const clientID = '743908069450-iboitslmhugr3mevva0m5j59uc268b6t.apps.googleusercontent.com'

export default function LoginGoogle(){
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        refreshTokenSetup(res)
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientID,
        isSignedIn: true,
        accessType: 'offline'
    })
    return(
        <button onClick={signIn} className='button'>
            <img src='icons/google.svg'/>
            <span className='buttonText'>Sign in with Google</span>
        </button>
    )
}