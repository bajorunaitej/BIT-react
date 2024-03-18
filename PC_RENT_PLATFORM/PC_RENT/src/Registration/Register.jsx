import { useEffect, useMemo, useRef } from "react";
import { getAllCountries } from "/utils/api/countriesApi";
import { register } from "../../utils/api/registerService";
import { checkSession } from "/utils/api/sessions";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationWindow() {
  // const [userDetails, setUserDetails] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  //   birth_date: "",
  //   phone: "",
  // });
  const userInfo = useRef({
    username: "",
    password: "",
    email: "",
    birth_date: "",
    phone: "",
  });

  // const [addressDetails, setAddressDetails] = useState({
  //   country: "",
  //   county: "",
  //   municipality: "",
  //   zipCode: "",
  //   city: "",
  //   street: "",
  //   streetNumber: "",
  //   apartmentNumber: "",
  // });

  const addressInfo = useRef({
    country: "",
    county: "",
    municipality: "",
    zipCode: "",
    city: "",
    street: "",
    streetNumber: "",
    apartmentNumber: "",
  });

  // const [countries, setCountries] = useState([]);
  const countriesInfo = useRef([]);

  const navigate = useNavigate();
  useEffect(() => {
    getAllCountries((data) => {
      // setCountries(data);
      countriesInfo.current = data;
    });

    checkSession((data) => {
      if (data.isLoggedIn) {
        navigate("/");
      } else {
        console.log("Vartotojas neprisijungęs");
      }
    });
  }, [navigate]);

  // const sortedCountries = useMemo(() => {
  //   return countries.sort((a, b) => a.country.localeCompare(b.country));
  // }, [countries]);
  const sortedCountries = useMemo(() => {
    return countriesInfo.current.sort((a, b) =>
      a.country.localeCompare(b.country)
    );
  }, [countriesInfo]);

  function setFieldInUserDetails(e, field) {
    // const newObject = { ...userDetails };
    const newObject = { ...userInfo.current };
    newObject[field] = e.target.value;
    // setUserDetails(newObject);
    userInfo.current = newObject;
  }

  // function setFieldInAddressDetails(e, field) {
  //   const newObject = { ...addressDetails };
  //   newObject[field] = e.target.value;
  //   setAddressDetails(newObject);
  // }

  // function setNumberField(e, field, maxNumber) {
  //   if (+e.target.value > maxNumber) {
  //     if (+e.target.value || e.target.value === "") {
  //       setFieldInAddressDetails(e, field);
  //     }
  //   }
  // }

  function sendRegistrationDetails() {
    // const registrationDetails = { ...userDetails, ...addressDetails };
    const registrationDetails = { ...userInfo.current, ...addressInfo.current };
    register(registrationDetails);
    console.log(registrationDetails);
  }

  return (
    <div className="bg-slate-300 w-[100vw] h-[100vh] flex justify-center items-center auth-bg">
      <div className="w-4/5 min-h-[400px] max-w-[1000px] bg-gray-500 bg-opacity-80 p-4 rounded-md">
        <h1 className="text-xl font-bold">Registration</h1>
        <hr className="mb-4" />

        <form>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Username</span>
              <input
                value={userInfo.current.username}
                onChange={(e) => setFieldInUserDetails(e, "username")}
                type="text"
                placeholder="Enter your username"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Password</span>
              <input
                value={userInfo.current.password}
                onChange={(e) => setFieldInUserDetails(e, "password")}
                type="password"
                placeholder="Enter your password"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Email</span>
              <input
                value={userInfo.current.email}
                onChange={(e) => setFieldInUserDetails(e, "email")}
                type="email"
                placeholder="Enter your email address"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Birth date</span>
              <input
                type="date"
                value={userInfo.current.birth_date}
                onChange={(e) => setFieldInUserDetails(e, "birth_date")}
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Phone</span>
              <input
                type="number"
                value={userInfo.current.phone}
                onChange={(e) => setFieldInUserDetails(e, "phone")}
                placeholder="Enter your phone number"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <h1 className="text-xl font-bold">Address</h1>
          <hr className="mb-4" />

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Country</span>
              <select
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
                value={addressInfo.current.country}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     country: e.target.value,
                //   })
                // }
                onChange={(e) => (addressInfo.current.country = e.target.value)}
              >
                {sortedCountries.map((country) => (
                  <option key={`country-${country.id}`}>
                    {country.country}
                  </option>
                ))}
                {/* <option>Lithuania</option>
                <option>Latvia</option>
                <option>United Kingdom</option> */}
              </select>
              {/* <input
                type="text"
                placeholder="Enter your country"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              /> */}
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">County</span>
              <input
                type="text"
                value={addressInfo.current.county}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     county: e.target.value,
                //   })
                // }
                onChange={(e) => (addressInfo.current.county = e.target.value)}
                placeholder="Enter your county"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Municipality</span>
              <input
                type="text"
                value={addressInfo.current.municipality}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     municipality: e.target.value,
                //   })
                // }
                onChange={(e) =>
                  (addressInfo.current.municipality = e.target.value)
                }
                placeholder="Enter your municipality"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Postal code</span>
              <input
                type="text"
                value={addressInfo.current.zipCode}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     zipCode: e.target.value,
                //   })
                // }
                onChange={(e) => (addressInfo.current.zipCode = e.target.value)}
                placeholder="Enter your postal code"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">City</span>
              <input
                type="text"
                value={addressInfo.current.city}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     city: e.target.value,
                //   })
                // }
                onChange={(e) => (addressInfo.current.city = e.target.value)}
                placeholder="Enter your city"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Street</span>
              <input
                type="text"
                value={addressInfo.current.street}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     street: e.target.value,
                //   })
                // }
                onChange={(e) => (addressInfo.current.street = e.target.value)}
                placeholder="Enter your street"
                className="outline-none border w-4/5 px-2 py-1 rounded-lg"
              />
            </label>
          </div>

          <div className="mb-2">
            <label>
              <span className="w-1/5 inline-block">Street number</span>
              <input
                type="text"
                placeholder="Street number"
                className="outline-none border w-1/5 px-2 py-1 rounded-lg"
                value={addressInfo.current.streetNumber}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     streetNumber: e.target.value,
                //   })
                // }
                onChange={(e) =>
                  (addressInfo.current.streetNumber = e.target.value)
                }
              />
              <span> - </span>
              <input
                type="text"
                placeholder="Apartment number"
                className="outline-none border w-2/5 px-2 py-1 rounded-md"
                value={addressInfo.current.apartmentNumber}
                // onChange={(e) =>
                //   setAddressDetails({
                //     ...addressDetails,
                //     apartmentNumber: e.target.value,
                //   })
                // }
                onChange={(e) =>
                  (addressInfo.current.apartmentNumber = e.target.value)
                }
              />
            </label>
          </div>

          <div>
            <label>
              <input type="checkbox" required />
              <span className="ml-2">Agree to Terms and Conditions </span>
            </label>
          </div>

          <Link
            to="/login"
            className="block text-slate-700 hover:text-blue-900 hover:underline "
          >
            Already have an account?
          </Link>

          <button
            className="border-2 border-gray-700 bg-indigo-400 hover:bg-indigo-800 rounded text-white px-6 py-1 mt-4"
            onClick={sendRegistrationDetails}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
