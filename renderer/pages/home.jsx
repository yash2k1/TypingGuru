import { appWithTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import KeyVerifying from './KeyVerifying';
import axios from 'axios';
import Typing from './typing';

function Home() {

    const [verify, setVerify] = useState(false);
    const [TypingSection, setTypingSection] = useState(false);
    function getDaysBetweenDates(d0, d1) {

        var msPerDay = 8.64e7;

        // Copy dates so don't mess them up
        var x0 = new Date(d0);
        var x1 = new Date(d1);

        // Set to noon - avoid DST errors
        x0.setHours(12, 0, 0);
        x1.setHours(12, 0, 0);

        // Round to remove daylight saving errors
        return Math.round((x1 - x0) / msPerDay);
    }

    useEffect(() => {
        ///logic for check verify or not
        setVerify(false);
        if (localStorage.getItem("KEY_VERIFCATION")) {
            setVerify(true);
            const value = JSON.parse(localStorage.getItem("KEY_VERIFCATION"));
            ///When it use the intenet access have
            axios.get('https://nonattendingtyping.com/admin/Api/KeyDateVerify.php?verify_code=' + value.Key_code).then(res => {
                if (res.data.valid === true) {

                    const diffDays = getDaysBetweenDates(new Date(), new Date(res.data.End_date));

                    if (diffDays <= 0) {
                        localStorage.removeItem("KEY_VERIFCATION");
                        setVerify(false);
                    }
                } else {
                    localStorage.removeItem("KEY_VERIFCATION");
                    setVerify(false);
                }
            });
            ///When it use then localstoarge work
            const diffDays = getDaysBetweenDates(new Date(), new Date(value.End_date));
            if (diffDays == 0) {
                localStorage.removeItem("KEY_VERIFCATION");
                setVerify(false);
            }
        }
    }, [])

    return (
        (verify === true || true) ?
            (TypingSection === false) ?
                <div className='welcome-page text-center'>
                    <div>
                        <h1 className='welcome-title'>Welcome!</h1>
                        <input type="text" className='exam-name-input' placeholder='Enter your Typing Exam name!' />
                    </div>
                    <p style={{ cursor: 'pointer' }} onClick={() => setTypingSection(true)} className='read_more' >Start </p>

                    <div className="copyright text-white">
                        <p >
                            <a href="mailto:info@nonattending.in" target="_top">info@nonattending.in</a>
                        </p>
                    </div>
                </div>
                :
                <Typing />
            :
            <KeyVerifying setVerify={setVerify} />
    );
}
export default Home;

