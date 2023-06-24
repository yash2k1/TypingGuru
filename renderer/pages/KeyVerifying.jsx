import axios from 'axios';
import React, { useState } from 'react'


function KeyVerifying({setVerify}) {
    const [verifycode, setveriftcode] = useState("");
    const [error, setError] = useState(null);
    const VerifyBtn = () => {

        axios.get('https://nonattendingtyping.com/admin/Api/verifyKey.php?verify_code=' + verifycode).then(res => {
            if (res.data.valid === true) {
                axios.get('https://nonattendingtyping.com/admin/Api/UsablePcs.php?verify_code=' + verifycode+ "&email_address="+res.data.Email_Address).then(response => {
                    if (response.data.valid === true) {
                        localStorage.setItem("KEY_VERIFCATION" , JSON.stringify(res.data));
                        setError(null);
                        setVerify(true);
                    }
                })
            } else if(res.data.valid === "limit") {
                setError("Your Pcs Limit is over..! Upgrade Your Plan..");
            }else if(res.data.valid === "expiry") {
                setError("Your Activation key is Expired..! Upgrade Your Plan..");
            } else{
                setError("Your Activation key is not valid...!");
            }
        })


    }
    return (
        <div className='verify-container'>
            <span>Verification Key </span>
            {error &&
                <div className='error-validation'>{error}</div>
            }
            <input placeholder='verification key' type="text" value={verifycode} onChange={(e) => { setveriftcode(e.target.value) }} />
            <button onClick={() => VerifyBtn()}>Verify</button>
        </div>
    )
}

export default KeyVerifying