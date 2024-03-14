import "./App.css";
import { Slider, Tooltip } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { GenerateError, GenerateSuccess } from "./toast/Toast";
import { ToastContainer } from "react-toastify";
import { PasswordGenerate } from "./api/PasswordApi";

export default function App() {
  const [generateData, setGenerateData] = useState([]);
  const [gPassword, setGPassword] = useState("");
  const [range, setRange] = useState(5);
  const textRef = useRef();

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      GenerateSuccess("Copied");
    }
  };

  const handleClick = (itemName) => {
    if (generateData.includes(itemName)) {
      setGenerateData((prevData) =>
        prevData.filter((item) => item !== itemName)
      );
    } else {
      setGenerateData((prevData) => [...prevData, itemName]);
    }
  };
  const handleChange = (e) => {
    setRange(Math.floor(e.target.value));
  };

  const handlePassword = async () => {
    try {
      const response = await PasswordGenerate({ generateData, range });
      if (response.status === 201) {
        GenerateError(response.data.message);
      } else {
        GenerateSuccess(response.data.message);
        setGPassword(response.data.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = [
    {
      id: 1,
      name: "uppecase",
    },
    {
      id: 2,
      name: "LowerCase",
    },
    {
      id: 3,
      name: "number",
    },
    {
      id: 4,
      name: "symbols",
    },
  ];

  return (
    <div className="h-screen text-white bg-black">
      <div className="container mx-auto px-4 max-w-screen-xl flex items-center justify-between h-full">
        <div className="m-4 w-1/2">
          <h1 className="text-[3rem] text-[#fff] font-extrabold">
            <span>Password</span> Generator
          </h1>
          <p className="w-[75%] text-base text-gray-600">
            Create strong and secure passwords to keep your account safe online.
          </p>
          <div className="w-full mt-10 flex gap-3 items-center">
            <input
              readOnly
              value={gPassword}
              ref={textRef}
              className="bg-black border text-gray-400 border-blue-600 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <FaCopy
              onClick={copyToClipboard}
              className="-ms-12 cursor-pointer"
              size={26}
            />
            <button
              type="submit"
              onClick={handlePassword}
              className="text-white ms-5 bg-blue-600 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Generate
            </button>
          </div>
          <div className="mt-2">
            {range <= 5 ? (
              <span className="text-lg text-[#f74747]">
                Weak
              </span>
            ) : range >= 11 && range <= 15? (
              <span className="text-lg text-[#f5f23c]">
                Strong
              </span>
            ) : range >= 5 && range <= 10 ? (
              <span className="text-lg text-green-500">
                Good
              </span>
            ) : (
              <span className="text-lg text-green-900">
                Very Strong
              </span>
            )}
          </div>
          {/* <p className="text-green-800 mt-2">Weak</p> */}
          {/* <p className="text-green-800 mt-2">Good</p> */}
          <div className="w-full mt-7">
            <p className="mb-3 uppercase text-lg">Length</p>
            <Tooltip content={range} placement="top-end">
              <Slider
                min={5}
                defaultValue={range}
                color="blue"
                onChange={handleChange}
              />
            </Tooltip>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-7 w-full">
            {data.map((item) => {
              return (
                <div key={item.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded-lg text-indigo-600"
                    checked={generateData.includes(item.name)}
                    onChange={() => handleClick(item.name)}
                  />
                  <p className="uppercase text-lg">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/2 lg:flex items-center justify-center hidden ">
          <div className="p-4">
            <img
              src="https://ouch-cdn2.icons8.com/Zz6ABya1d68dTxHdZm-wbc1Ww16FNS3F8ERE1KwZYjQ/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTAw/MC8zMDg0NGIxMy0z/ZTEzLTQ1NGEtOTE3/ZC1mYjMyOTg2NjE5/M2Quc3Zn.png"
              className="object-cover w-[90%] h-[90%] lg:w-full lg:h-full"
              alt=""
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
