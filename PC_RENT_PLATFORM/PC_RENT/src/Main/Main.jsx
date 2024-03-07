function AuthButtons() {
  return (
    <div>
      <a
        href="/registration"
        className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2 p-6"
      >
        Register now
      </a>
      <a
        href="/login"
        className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2 p-6"
      >
        Log inw
      </a>
    </div>
  );
}

export default function Main() {
  const isLoggedIn = false;

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="container w-[80%] bg-blue-200 min-h-[700px] rounded-lg">
        {!isLoggedIn && <AuthButtons />}
        {isLoggedIn && (
          <a
            href="/add-new-post"
            className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded mx-2 p-6"
          >
            Add rent
          </a>
        )}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white min-h-[300px] min-w-[100px]">
            <div className="img">
              <img src="https://placehold.co/400x300" alt="" />
            </div>
            <div className="details p-4">
              <h3 className="title text-xl mb-2 border-b-4 border-pink-500 w-fit pr-4">
                Lorem ipsum dolor sit amet.
              </h3>
              <div className="text-xs">
                <div className=" flex flex-wrap gap-x-4 mb-1">
                  <span className="inline-block w-1/3 font-bold">
                    Specifikacija:
                  </span>
                  <span>Specifikacijos reikšmė</span>
                </div>
              </div>
              <div className="text-xs">
                <div className=" flex flex-wrap gap-x-4 mb-1">
                  <span className="inline-block w-1/3 font-bold">
                    Specifikacija:
                  </span>
                  <span>Specifikacijos reikšmė</span>
                </div>
              </div>
              <div className="text-xs">
                <div className=" flex flex-wrap gap-x-4 mb-1">
                  <span className="inline-block w-1/3 font-bold">
                    Specifikacija:
                  </span>
                  <span>Specifikacijos reikšmė</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
