import { useEffect, useRef } from "react";
import { savePc } from "../../utils/api/pcService";
import { useNavigate } from "react-router-dom";
import { checkSession } from "/utils/api/sessions";

export default function AddPcForm() {
  // 1. Budas susisrinkti informacija iš ivesties laukeliu

  // const [files, setFiles] = useState(0);
  const navigate = useNavigate();

  const pcNameInputRef = useRef(null);
  const cpuInputRef = useRef(null);
  const gpuInputRef = useRef(null);
  const ramTypeInputRef = useRef(null);
  const ramSpeedInputRef = useRef(null);
  const ramAmountInputRef = useRef(null);
  const computerTypeInputRef = useRef(null);
  const pcImagesInputRef = useRef(null);

  useEffect(() => {
    checkSession((resp) => {
      if (!resp.isLoggedIn) navigate("/login");
    });
    pcNameInputRef.current.focus();

    const focusCPU = (e) => {
      if (e.key === "Enter") {
        cpuInputRef.current.focus();
      }
    };
    pcNameInputRef.current.addEventListener("keydown", focusCPU);

    const focusGPU = (e) => {
      if (e.key === "Enter") {
        gpuInputRef.current.focus();
      }
    };
    cpuInputRef.current.addEventListener("keydown", focusGPU);

    const focusRamType = (e) => {
      if (e.key === "Enter") {
        ramTypeInputRef.current.focus();
      }
    };
    gpuInputRef.current.addEventListener("keydown", focusRamType);

    const focusRamSpeed = (e) => {
      if (e.key === "Enter") {
        ramSpeedInputRef.current.focus();
      }
    };
    ramTypeInputRef.current.addEventListener("keydown", focusRamSpeed);

    const focusRamAmount = (e) => {
      if (e.key === "Enter") {
        ramAmountInputRef.current.focus();
      }
    };
    ramSpeedInputRef.current.addEventListener("keydown", focusRamAmount);

    const focusPcType = (e) => {
      if (e.key === "Enter") {
        computerTypeInputRef.current.focus();
      }
    };
    ramAmountInputRef.current.addEventListener("keydown", focusPcType);

    return () => {
      pcNameInputRef.current.removeEventListener("keydown", focusCPU);
      cpuInputRef.current.removeEventListener("keydown", focusGPU);
      gpuInputRef.current.removeEventListener("keydown", focusRamType);
      ramTypeInputRef.current.removeEventListener("keydown", focusRamSpeed);
      ramSpeedInputRef.current.removeEventListener("keydown", focusRamAmount);
      ramAmountInputRef.current.removeEventListener("keydown", focusPcType);
    };
  }, []);

  // 2. Budas susisrinkti informacija iš ivesties laukeliu
  //   const pcData = useRef({});

  function registerNewPc(e) {
    e.preventDefault();
    // console.log(e.pageX === 0); //buvo paspaustas enter mygtukas
    //Prevencija nuo netikėto formos išsiuntimo
    if (e.pageX === 0 && e.pageY === 0) return;
    console.log("info išsiunčiama į serverį");
    // 1. Budas susisrinkti informacija iš ivesties laukeliu

    const formData = new FormData();
    formData.append("pc_name", pcNameInputRef.current.value);
    formData.append("cpu", cpuInputRef.current.value);
    formData.append("gpu", gpuInputRef.current.value);
    formData.append("ramType", ramAmountInputRef.current.value);
    formData.append("ramSpeed", ramSpeedInputRef.current.value);
    formData.append("ramAmount", ramAmountInputRef.current.value);
    formData.append("pc_type", computerTypeInputRef.current.value);
    formData.append("files", pcImagesInputRef.current.files);

    console.log(formData.get("files"));
    savePc(formData, (resp) => {
      if (resp.status) navigate("/");
      else alert("Pridėjimas prie DB buvo nesėkmingas");
    });
    // 2. Budas susisrinkti informacija iš ivesties laukeliu
    // console.log(pcData.current);
  }

  return (
    <div className="bg-slate-300 w-[100vw] h-[100vh] flex justify-center items-center auth-bg">
      <div className="w-4/5 min-h-[400px] max-w-[1000px] bg-gray-500 bg-opacity-80 p-4 rounded-md">
        <h1 className="text-xl font-bold">Add new PC Form</h1>
        <hr className="mb-4" />

        <form action="">
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">PC Name</span>
              <input
                ref={pcNameInputRef}
                // onChange={(e) => {
                //   pcData.current.cpu = e.target.value
                // }}
                type="text"
                placeholder="PC Name"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">
                Processor (CPU)
              </span>
              <input
                ref={cpuInputRef}
                // onChange={(e) => {
                //   pcData.current.cpu = e.target.value
                // }}
                type="text"
                placeholder="Processor"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">
                Ram type (GPU)
              </span>
              <input
                ref={gpuInputRef}
                // onChange={(e) => {
                //   pcData.current.gpu = e.target.value;
                // }}
                type="text"
                placeholder="RAM type"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">
                Grapfics card (GPU)
              </span>
              <select
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
                ref={ramTypeInputRef}
                // onChange={(e) => {
                //   pcData.current.ramType = e.target.value;
                // }}
              >
                <option>DDAR</option>
                <option>DDR2</option>
                <option>DDR3</option>
                <option>DDR4</option>
                <option>DDR5</option>
              </select>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">
                Ram speed (MHz)
              </span>
              <input
                ref={ramSpeedInputRef}
                // onChange={(e) => {
                //   pcData.current.ramSpeed = e.target.value;
                // }}
                type="number"
                placeholder="Ram speed (MHz)"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none">
                Ram amount (MB)
              </span>
              <input
                ref={ramAmountInputRef}
                // onChange={(e) => {
                //   pcData.current.ramAmount = e.target.value;
                // }}
                type="number"
                placeholder="Ram amount (MB)"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none select-none">
                PC type
              </span>
              <select
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
                ref={computerTypeInputRef}
                // onChange={(e) => {
                //   pcData.current.pcType = e.target.value;
                // }}
              >
                <option>Macbook</option>
                <option>Laptop</option>
                <option>Stationary</option>
              </select>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block select-none select-none">
                Computer image
              </span>
              <input
                type="file"
                accept=".jpg, .png"
                ref={pcImagesInputRef}
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 2) {
                    alert("Max files chosen: 2");
                    // e.target.files = new FileList();
                    e.target.files.length = "";
                  }
                }}
              />
            </label>
          </div>
          <button
            className="border-2 border-gray-700 bg-indigo-400 hover:bg-indigo-800 rounded text-white px-6 py-1 mt-4"
            onClick={(e) => registerNewPc(e)}
          >
            Register new PC
          </button>
        </form>
      </div>
    </div>
  );
}
