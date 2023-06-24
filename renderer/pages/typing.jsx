import React, { use } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, LanguageSwitcher } from 'next-export-i18n';
import CustomModal from '../components/modal';
import FirstEnglishTopics from '../../i18n/translations.en-easy.json';



export default function Typing() {
    // const paragraphs = [
    //     "Far from the truth, an ajar reminder without catamarans is truly a foundation of smarmy semicircles. An alike board without harps is truly a satin of fated pans. A hubcap sees a parent as a painful beautician. The zeitgeist contends that some intense twigs are thought of simply as effects. A cross is a poppied tune. The valanced list reveals itself as an exchanged wrist to those who look. Recent controversy aside.",
    //     "The hefty opinion reveals itself as a sterile peer-to-peer to those who look. This could be, or perhaps the watch of a diamond becomes a bosom baboon. In recent years, some posit the unstuffed road to be less than altern. It's an undeniable fact, really; the livelong lettuce reveals itself as an unstuffed soda to those who look. In ancient times a bit is a balance's season. The popcorn of a morning becomes a moonless beauty.",
    //     "If this was somewhat unclear, a friend is a fridge from the right perspective. An upset carriage is a stitch of the mind. To be more specific, a temper is a pair from the right perspective. Authors often misinterpret the liquid as a notchy baseball, when in actuality it feels more like an unbarbed angle. Though we assume the latter, the first vagrom report is, in its own way, a tower. We know that the octopus of a cd becomes an unrent dahlia.",
    //     "A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
    //     "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast of a religion. In ancient times the first stinko sailboat is, in its own way, an exchange. Few can name a tutti channel that isn't a footless operation. Extending this logic, an oatmeal is the rooster of a shake. Those step-sons are nothing more than matches."
    // ];



    const { t } = useTranslation("common");
    const [mistakeTag, setMistakeTag] = useState();
    const [timeTag, setTimeTag] = useState();
    const [wpmTag, setWpmTag] = useState();
    const [cpmTag, setCpmTag] = useState();
    const [inpField, setInpField] = useState();
    const [characters, setCharacters] = useState([]);
    const [typingText, setTypingText] = useState('');
    const [spanTag, setSpanTag] = useState();
    const [TypingLength, setTypingLength] = useState({
        start: 0,
        end: 100000
    })


    const [textInput, settextInput] = useState("");

    const [familyfont, setfamilyfont] = useState("");


    const [paragraphs, setParagraphs] = useState(t("Topic1"));

    // const [paragraphs, setParagraphs] = useState(t("photographs"));
    const router = useRouter();

    const [screens, setScreens] = useState({
        Typing: true,
        Result: false
    })


    useEffect(() => {
        setMistakeTag(document.querySelector(".mistake span"));
    }, [])
    useEffect(() => {
        setTimeTag(document.querySelector(".time span b"));
    }, [])
    useEffect(() => {
        setWpmTag(document.querySelector(".wpm span"));
    }, [])
    useEffect(() => {
        setCpmTag(document.querySelector(".cpm span"));
    }, [])
    useEffect(() => {
        setInpField(document.querySelector(".input-field"));
    }, [])
    useEffect(() => {
        setSpanTag(document.querySelector(".typing-text p"));
    }, [])


    useEffect(() => {
        setCharacters(document.querySelectorAll('.typing-text span'));
    }, [typingText])

    const [timer, setTimer] = useState(null);
    const [maxTime, setMaxTime] = useState(600);
    let [timeLeft, settimeLeft] = useState(600);
    const [mistakes, setMistakes] = useState(0);

    let charIndex = textInput?.length,
        isTyping = textInput?.length > 0 ? true : 0



    const ChangeTimeVarient = (event) => {
        const value = event.target.value;
        if (value === "10") {
            setMaxTime(600);
            settimeLeft(600);
            timeTag.innerText = "10min";
        }
        if (value === "15") {
            setMaxTime(900);
            settimeLeft(900);
            timeTag.innerText = "15min";
        }

        if (value === "30") {
            setMaxTime(1800);
            settimeLeft(1800);
            timeTag.innerText = "30min";
        }
        if (value === "60") {
            setMaxTime(3600);
            settimeLeft(3600);
            timeTag.innerText = "60min";
        }
    }



    const inputRef = useRef(null);

    function loadParagraph() {
        document.getElementsByClassName("input-field")[0].value = "";
        if (familyfont !== 'krutidev') {
            const ranIndex = Math.floor(Math.random() * paragraphs.split(',,').length);

            //the text is the value of typingText
            let text = "";
            paragraphs.split(',,')[ranIndex].split("").forEach(char => {
                let span = `<span>${char}</span>`;
                text += span;
            });
            setTypingText(text);
        } else {
            const ranIndex = Math.floor(Math.random() * paragraphs.split(',,').length);

            //the text is the value of typingText
            let text = "";
            paragraphs.split(',,')[ranIndex].split("").forEach(char => {
                if (char !== "," && char !== "?" && char !== '“' && char !== '”' && char !== '–' && char !== '(' && char !== ')' && char !== '-' && char !== '.' && char !== ':' && char !== ';' && char !== 'w' && char !== 's' && char !== 'W' && char !== 'a' && char !== 'S' && char !== 'q' && char !== 'H' && char !== '‘' && char !== 'I' && char !== '') {
                    let span = `<span>${char}</span>`;
                    text += span;
                }

            });


            setTypingText(text);
        }
    }

    const [oneTimeCall, setoneTimeCall] = useState(true);

    //the function that addclass 'active' to the first letter of typing text

    useEffect(() => {
        (typingText != '') && document.querySelectorAll(".typing-text p span")[0].classList.add("active");

        // document.addEventListener("keydown", () => inpField.focus());
        document.querySelector(".typing-text p").addEventListener("click", () => handleKeyDown());
    }, [typingText]);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    function handleKeyDown() {

        // inputRef.current.focus();
    }

    const [words60index, setwords60index] = useState(0);

    const [words40index, setwords40index] = useState(30);




    function convertToMangal(text) {
        const englishChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}:\"<>?,./;'[]\\-=";
        const hindiChars = "ोवम्ािुपगरकतसलदजौीेूहनैंबॆओऴणअआइउफघऱखथशळधझऔईएऊङऩऐँभऎ1234567890ऍॅ्रजतकश()ःऋढञछऑठष।य़,.यचटड़ॉॉ-ृ्श्र्ष्र्ञ्र";

        let hindiText = "";
        for (let i = 0; i < text.length; i++) {
            let index = englishChars.indexOf(text[i]);
            if (index !== -1) {
                hindiText += hindiChars[index];
            } else {
                hindiText += text[i];
            }
        }
        return hindiText;
    }

    function convertToKrutiDev(text) {
        const englishChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}:\"<>?,./;'[]\\-=";
        const kurtiDevChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}:\"<>?,./;'[]\\-=";

        let krutiDevText = "";
        for (let i = 0; i < text.length; i++) {
            let index = englishChars.indexOf(text[i]);
            if (index !== -1) {
                krutiDevText += kurtiDevChars[index];
            } else {
                krutiDevText += text[i];
            }
        }
        return krutiDevText;
    }

 

    const [checkLanguage, setCheckLanguage] = useState(false);

    const [checkFontFamily, setCheckFontFamily] = useState(false);

    const [newIndex, setIndex] = useState(1);
    const [val , setval] = useState([]);


    

    function initTyping(event) {
        // let characters = document.querySelectorAll(".typing-text span");
        let typedChar = event.target.value.split('')[charIndex];
        let typingcontainer = document.querySelector(".typing-text");

        if (checkLanguage === true && checkFontFamily === false) {
            settextInput(convertToMangal(event.target.value));
        } else {
            // console.log(event.target.value);
            settextInput(event.target.value);
        }

        

        setwords60index((prev) => prev + 1);
        if (words60index > 90) {
            console.log("called for scrolll");
            typingcontainer.scrollTop = words40index;
            setwords40index((prev) => prev + 25);
            setwords60index(0);
        }

    

        var vales = [...val];
        vales.push(characters[charIndex].innerText);
        setval(vales);

        if (charIndex < characters.length - 1 && timeLeft > 1) {
            if (!isTyping) {

                setTimer(setInterval(initTimer, 1000));
                isTyping = true;
            }
            if (typedChar == null) {
                if (charIndex > 0) {
                    charIndex--;
                    console.log('backspace');


                    setwords60index((prev) => prev - 2);

                    if (characters[charIndex].classList.contains("incorrect")) {
                        setMistakes((prev) => prev - 1);
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            } else {
             

                if (checkLanguage === true && checkFontFamily === false) {
                    if (characters[charIndex].innerText == convertToMangal(typedChar)) {
                        characters[charIndex].classList.add("correct");
                    } else {

                        setMistakes((prev) => prev + 1);
                        characters[charIndex].classList.add("incorrect");
                    }
                    charIndex++;
                } else {

                    console.log(characters[charIndex].textContent ,convertToMangal(typedChar))

                    if (characters[charIndex].innerText == typedChar) {
                        characters[charIndex].classList.add("correct");
                    } else {

                        setMistakes((prev) => prev + 1);
                        characters[charIndex].classList.add("incorrect");
                    }
                    charIndex++;
                }
            }
            characters.forEach(span => span.classList.remove("active"));
            characters[charIndex].classList.add("active");

            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;


            setIndex(charIndex);

            wpmTag.innerText = wpm;
            mistakeTag.innerText = mistakes;
            cpmTag.innerText = charIndex - mistakes;
        } else {
            console.log("calling");
            clearInterval(timer);
            ///After Typing then function calling
            if (oneTimeCall === true) {
                ///Now Show the result
                setScreens({
                    Result: true,
                    Typing: false
                });
                setoneTimeCall(false);
            }
            event.target.value = "";
        }
    }



    function initTimer() {
        if (timeLeft > 0) {
            settimeLeft(timeLeft--);

            timeTag.innerText = parseInt(timeLeft / 60) + 'min ' + (timeLeft % 60) + 's';

            let wpm = Math.round(((document.querySelector(".input-field").value.length - mistakes) / 5) / (maxTime - timeLeft) * 60);

            wpmTag.innerText = wpm;
        } else {
            clearInterval(timer);
        }
    }


    if (textInput?.length < 1) {
        clearInterval(timer);

    }

    const [plusState, setPlusState] = useState(1);
    function resetGame() {
        settextInput("");
        setParagraphs(t("Topic1"));
        loadParagraph();
        setMaxTime(600);
        settimeLeft(600);
        document.getElementById("timeoptions").selectedIndex = 0;
        clearInterval(timer);
        timeTag.innerText = "10min";
        charIndex = isTyping = 0;

        inpField.value = "";
        wpmTag.innerText = 0;
        mistakeTag.innerText = 0;
        setMistakes(0);
        cpmTag.innerText = 0;
        setPlusState(1);

        setoneTimeCall(true);
        inputRef.current.focus();
        setScreens({
            Result: false,
            Typing: true
        })
        for (let i = 0; i < characters.length; i++) {
            characters[i].classList.remove("correct", "incorrect", "active");
        }
    }


    useEffect(() => {
        loadParagraph();
    }, []);


    useEffect(() => {
        setParagraphs(t("Topic1"));
    }, [t("Topic1")]);



    useEffect(() => {
        loadParagraph();
    }, [paragraphs]);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function saveText(value) {

        setIsOpen(false);
        if (typeof (value) == 'string') {
            setParagraphs(value);
        }

    }

    useEffect(() => {
        document.getElementsByClassName("input-field")[0].addEventListener('onchange', () => {
            console.log('hello')
        })
    })




    function changeFont(event) {
        event.preventDefault();
        let value = event.target.value;
        spanTag.style.fontFamily = value;
        inpField.style.fontFamily = value;
        settextInput("");


        setfamilyfont(value)
        const ranIndex = Math.floor(Math.random() * paragraphs.split(',,').length);
        document.getElementsByClassName("input-field")[0].value = "";
        //the text is the value of typingText
        let text = "";
        paragraphs.split(',,')[ranIndex].split("").forEach(char => {
            let span = `<span>${char}</span>`;
            text += span;
        });
        setTypingText(text);
        setCheckFontFamily(false);
        if (value === "krutidev") {
            setCheckFontFamily(true);
            const ranIndex = Math.floor(Math.random() * paragraphs.split(',,').length);

            //the text is the value of typingText
            let text = "";
            paragraphs.split(',,')[ranIndex].split("").forEach(char => {
                if (char !== "," && char !== "?" && char !== '“' && char !== '”' && char !== '–' && char !== '(' && char !== ')' && char !== '-' && char !== '.' && char !== ':' && char !== ';' && char !== 'w' && char !== 's' && char !== 'W' && char !== 'a' && char !== 'S' && char !== 'q' && char !== 'H' && char !== '‘' && char !== 'I' && char !== '') {
                    let span = `<span>${char}</span>`;
                    text += span;
                }

            });
            setTypingText(text);
        }
    }

    const [langeVarient, setLanguageVarient] = useState("easy");

    function ChangeLanguageVarient(event) {
        setParagraphs("Click on languages button..!");
        setPlusState(1);
        setLanguageVarient(event.target.value);
    }

    function NextTopicset() {
        const TopicSelect = document.getElementById("TopicsSelectInput");
        setPlusState(plusState + 1);
        var val = plusState;
        TopicSelect.selectedIndex = val;
        val = val + 1;
        setParagraphs(t("Topic" + val));
        settextInput("");
    }

    useEffect(() => {
        var val = plusState;
        if (paragraphs === "Topic" + val) {
            setParagraphs("All Topics is Done..!");
        }
    }, [paragraphs])




    const [TotalTopics, setTotalTopics] = useState(164);




    useEffect(() => {
        const TopicSelect = document.getElementById("TopicsSelectInput");
        TopicSelect.innerHTML = "";
        for (let i = 1; i < TotalTopics; i++) {
            TopicSelect.innerHTML += "<option value=" + i + ">Topic " + i + "</option>"
        }
    }, [TotalTopics])

    const ChangeTopic = (event) => {
        const value = event.target.value;
        setPlusState(Number(value));
        setParagraphs(t("Topic" + value));
    }

    const changeEnglishTopicSize = () => {

        setCheckLanguage(false);
        if (langeVarient === 'easy') {
            setTotalTopics(164);
        }
        if (langeVarient === 'medium') {
            setTotalTopics(87);
        }
        if (langeVarient === 'hard') {
            setTotalTopics(100);
        }
    }

    const changeHindhiTopicSize = () => {

        setCheckLanguage(true);
        if (langeVarient === 'easy') {
            setTotalTopics(115);
        }
        if (langeVarient === 'medium') {
            setTotalTopics(159);
        }
        if (langeVarient === 'hard') {
            setTotalTopics(91);
        }
    }

    const [backSpaceWork, setBackspaceWork] = useState(false);

    const changeTheTextBoxProperty = (e) => {
        setBackspaceWork(e.target.checked);
    }

    function preventBackspace(e) {
        if (!backSpaceWork) {
            var evt = e || window.event;
            if (evt) {
                var keyCode = evt.charCode || evt.keyCode;
                if (keyCode === 8) {
                    if (evt.preventDefault) {
                        evt.preventDefault();
                    } else {
                        evt.returnValue = false;
                    }
                }
            }
        }
    }

    function EndTest() {
        setScreens({
            Result: true,
            Typing: false
        })
        clearInterval(timer);
    }

    return (
        <>
            <div className={(screens.Result === true) ? "wrapper hidden" : "wrapper show"}>
                <LanguageSwitcher setTotalTopics={setTotalTopics} setPlusState={setPlusState} lang={'en' + langeVarient} className="lang_button"><span onClick={() => changeEnglishTopicSize()} className='lang_button'>English</span></LanguageSwitcher>
                <LanguageSwitcher setTotalTopics={setTotalTopics} setPlusState={setPlusState} lang={'hi' + langeVarient} className="lang_button"><span onClick={() => changeHindhiTopicSize()} className='lang_button'>हिंदी</span></LanguageSwitcher>

                <div className='checkboxstyles'>
                    <input type="checkbox" checked={backSpaceWork} onChange={changeTheTextBoxProperty} />
                    <label>Enable Backspace</label>
                </div>


                <select id="TopicsSelectInput" style={{ right: "500px" }} onChange={ChangeTopic}>
                </select>

                <select id="timeoptions" style={{ right: "350px" }} onChange={ChangeTimeVarient}>
                    <option value="10">10 Min</option>
                    <option value="15">15 Min</option>
                    <option value="30">30 Min</option>
                    <option value="60">60 Min</option>
                </select>

                <select style={{ right: "200px" }} onChange={ChangeLanguageVarient}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                {/* <button onClick={openModal} className="edit-button">Edit Text</button> */}
                <select name="font-setting" id="fontSetting" onChange={changeFont}>
                    <option value="remington">Reminton</option>
                    <option value="krutidev">Kurtidev</option>
                    <option value="mangal">Mangal</option>
                </select>

                <CustomModal paragraphs={paragraphs} modalIsOpen={modalIsOpen} closeModal={saveText}></CustomModal>
                <div className="content-box">

                    <div className={(screens.Result === true) ? "hidden" : "show"}>
                        <div className="typing-text" >
                            <p dangerouslySetInnerHTML={{ __html: typingText }}></p>
                        </div>
                        <textarea value={textInput} onKeyDownCapture={preventBackspace} type="text" ref={inputRef} cols={6} rows={6} onInput={initTyping} spellCheck={false} className="input-field" onKeyDown={handleKeyDown}></textarea>
                    </div>
                    <div className="content">
                        <ul className="result-details">
                            <li className={"time"}>
                                <p>Time Left:</p>
                                <span><b>10min</b></span>
                            </li>
                            <li className="mistake">
                                <p>Mistakes:</p>
                                <span>0</span>
                            </li>
                            <li className="wpm">
                                <p>WPM:</p>
                                <span>0</span>
                            </li>
                            <li className="cpm">
                                <p>CPM:</p>
                                <span>0</span>
                            </li>
                            <li className="cpms" >
                                {
                                    (paragraphs !== "All Topics is Done..!") && (
                                        <button onClick={NextTopicset}>Next Topic</button>
                                    )
                                }
                            </li>
                        </ul>
                        <button onClick={() => EndTest()}>End Test</button>
                    </div>
                </div>
            </div>

            <div className={(screens.Typing === true) ? 'wrapper result hidden' : 'wrapper result show'}>
                <p>Test Results</p>
                <ul>
                    <li><p>Speed : {wpmTag?.innerText}</p></li>
                    <li><p>Mistakes : {mistakeTag?.innerText}</p></li>
                    <li><p>Characters Per Minute : {cpmTag?.innerText}</p></li>
                    <li><button onClick={() => resetGame()}>Try Again</button> </li>
                </ul>

            </div>

        </>
    )
}

