import { useState, useRef, useEffect } from "react";
import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { invoke } from "@tauri-apps/api/tauri";
import { emit, listen } from "@tauri-apps/api/event";
import { FiSend, FiPlus, FiMinus } from "react-icons/fi";
import { MdUsbOff, MdUsb } from "react-icons/md";

interface MenuProps {
    isDropped: boolean;
    lines: string[];
}

function Menu({ isDropped, lines }: MenuProps) {
    // Your component logic here


    const [inputValuePower, setInputValuePower] = useState("");
    function handleInputChangePower(event: any) {
        setInputValuePower(event.target.value);
    };

    const [inputValueStop, setInputValueStop] = useState("");
    function handleInputChangeStop(event: any) {
        setInputValueStop(event.target.value);
    };

    async function handleWriteCustom(str: string) {
        setInputValuePower("");
        setInputValueStop("");
        const newLines: any = [...lines, str];
        invoke("send_serial", { input: str });
    }



    const optionButtonContainerStyle = `h-[80px] lg:h-[20%] lgh:w-[90%] w-[90%] lg:w-[45%] rounded-lg gap-1 bg-gray-400 p-1 flex flex-row items-center justify-center`;
    const optionButtonStyle = `border border-gray-400 bg-gray-600 hover:bg-gray-400 hover:text-white text-gray-200 text-sm lg:text-base font-bold py-2 px-2 rounded-lg`;
    const singleButtonStyle = `h-[80px] lg:h-[20%] lgh:w-[90%] w-[90%] lg:w-[45%] border border-gray-400 bg-gray-600 hover:bg-gray-400 hover:text-white text-gray-200 text-sm lg:text-base font-bold py-2 px-2 rounded-lg`;
    return (
        <>
            {
                isDropped ? (
                    <div className="w-3/6 flex flex-col items-center">
                        <div className="bg-gray-900 rounded-xl w-full p-2 text-xl text-center mb-2">
                            Custom Buttons
                        </div>
                        {/* buttons container */}
                        <div className="overflow-y-scroll bg-gray-700 rounded-xl border-4 border-gray-600 flex flex-wrap h-full w-full justify-center items-center p-2  gap-x-6 gap-y-3">
                            <div className={optionButtonContainerStyle}>
                                <button
                                    onClick={() =>
                                        handleWriteCustom(
                                            `SET PWOUT=${inputValuePower}`
                                        )
                                    }
                                    className={optionButtonStyle}
                                >
                                    Set Power
                                </button>
                                <input
                                    id="myInput"
                                    type="text"
                                    className="w-[40%] h-1/2 text-sm text-black border-2 border-gray-700 p-2"
                                    value={inputValuePower}
                                    onChange={handleInputChangePower}
                                />
                            </div>

                            <button
                                onClick={() => handleWriteCustom("SET PWOUT")}
                                className={singleButtonStyle}
                            >
                                Print Set Power
                            </button>

                            <div className={optionButtonContainerStyle}>
                                <button
                                    onClick={() =>
                                        handleWriteCustom(
                                            `SET SSTOP=${inputValueStop}`
                                        )
                                    }
                                    className={optionButtonStyle}
                                >
                                    Set Stop Status
                                </button>
                                <input
                                    id="myInput"
                                    type="text"
                                    className="w-[40%] h-1/2 text-sm text-black border-2 border-gray-700 p-2"
                                    value={inputValueStop}
                                    onChange={handleInputChangeStop}
                                />
                            </div>

                            <button
                                onClick={() => handleWriteCustom("SET SSTOP")}
                                className={singleButtonStyle}
                            >
                                Print Stop Status
                            </button>
                            <button
                                onClick={() => handleWriteCustom("P")}
                                className={singleButtonStyle}
                            >
                                Print Power
                            </button>
                            <button
                                onClick={() => handleWriteCustom("E")}
                                className={singleButtonStyle}
                            >
                                Print Error
                            </button>
                            <button
                                onClick={() => handleWriteCustom("TC")}
                                className={singleButtonStyle}
                            >
                                Print Cold Tip Temp
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )
            }
        </>
    );
}

interface BoxProps {
    lines: string[];
    setLines: React.Dispatch<React.SetStateAction<string[]>>;
}

function Box({lines, setLines}: BoxProps) {

    const [inputValueText, setInputValueText] = useState("");

    const handleInputChangeTextBox = (event: any) => {
        setInputValueText(event.target.value);
    };

    async function handleHello() {
        let data = await invoke("greet", { name: "World" });
        console.log(data);
        const newLines: any = [...lines, data];
        setLines(newLines);
    }

    async function handleSend(event: any) {
        event.preventDefault();
        // writeNewLines(inputValueText + "\n");
        setInputValueText("");
        // send serial
        await invoke("send_serial", { input: inputValueText });
    }

    const [isRecording, setIsRecording] = useState(true);

    function handleRecordToggle() {
        if (isRecording) {
            writeNewLines("\n(Serial console) Recording Started\n");
            setIsRecording(false);
        } else {
            writeNewLines("\n(Serial console) Recording Saved\n");
            setIsRecording(true);
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);
    // scroll to bottom
    function scrollToBottom() {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const [messageBox, setMessageBox] = useState<String>("");

    function messages() {
        return (
            <div className="flex-1 p-4">
                {messageBox.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        );
    }

    // same as payload
    type Payload = {
        message: string;
    };

    async function startSerialEventListener() {
        await listen<Payload>("updateSerial", (event: any) => {
            writeNewLines(event.payload.message);
        });
    }

    useEffect(() => {
        startSerialEventListener();
    }, []);


    function writeNewLines(str: string) {
        setMessageBox((messageBox) => messageBox.concat(str));
    }

    // check scroll to bottom on message update
    useEffect(() => {
        scrollToBottom();
    }, [messageBox, messageBox.length]);



    return (
        <>
            <div className="overflow-hidden w-full h-full flex flex-col">
                {/* message box */}
                <div
                    ref={scrollRef}
                    className="overflow-y-scroll resize-none h-full flex flex-grow justify-start flex-col bg-gray-500"
                >
                    {messages()}
                </div>
                {/* text box */}
                <form
                    onSubmit={handleSend}
                    className="flex flex-row items-center w-full"
                >
                    {/* <MdUsb className="color-white bg-green-800 h-full w-12 p-2" /> */}
                    <input
                        id="myInput"
                        type="text"
                        className="w-full text-black border-2 border-gray-400 p-2 w-full"
                        value={inputValueText}
                        onChange={handleInputChangeTextBox}
                    />
                    <FiSend
                        onClick={handleSend}
                        className="color-white bg-blue-800 h-full w-12 p-2"
                    />
                </form>
            </div>
        </>
    );
}

interface MessageBoxProps {
    isDropped: boolean;
}

function MessageBox({ isDropped }: MessageBoxProps) {

    const [lines, setLines] = useState<string[]>([]);

    return (

        /* main message box */
        < div className="h-full w-full gap-2 p-5 flex flex-row overflow-hidden" >
            {/* buttons left*/}
            <Menu isDropped={isDropped} lines={lines} />
            {/* message box and text box right */}
            <Box  lines={lines} setLines = {setLines} />
        </div >
    );
}


export default MessageBox