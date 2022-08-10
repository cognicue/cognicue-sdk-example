import { useEffect, useState, useRef } from "react";

const options = {
  accountID: import.meta.env.VITE_APP_ACCOUNT_ID,
  audioRecord: true,
  videoRecord: true,
  interviewID: import.meta.env.VITE_APP_INTERVIEW_ID,
  candidate: {
    email: import.meta.env.VITE_APP_EMAIL,
    first_name: import.meta.env.VITE_APP_FIRST_NAME,
    last_name: import.meta.env.VITE_APP_LAST_NAME,
  },
};

const Questions = (props) => {
  const { children, title } = props;

  return (
    <div>
      <h2 className="text-center text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
};

function App() {
  const [page, setPage] = useState(0);
  const cogniCueNode = useRef(null);
  const once = useRef(false);

  useEffect(() => {
    if (!once.current) {
      cogniCueNode.current = new window.CogniCue(options);
      cogniCueNode.current.ready();
      console.log(cogniCueNode.current);
      once.current = true;
    }
  }, []);

  const start = async () => {
    await cogniCueNode.current.start();
    setPage(1);
  };

  const end = async () => {
    await cogniCueNode.current.stop();
    const res = await cogniCueNode.current.close();
    console.log(res);
    setPage(4);
  };

  const next = (pageNumber) => async () => {
    await cogniCueNode.current.stop();
    console.log("Getting next question.");
    await cogniCueNode.current.start();
    setPage(pageNumber);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!page && (
        <button
          onClick={start}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-40"
        >
          Start Feedback
        </button>
      )}
      {page === 1 ? (
        <Questions title="First Step">
          <button
            onClick={next(2)}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-40"
          >
            Next
          </button>
        </Questions>
      ) : null}
      {page === 2 ? (
        <Questions title="Second Step">
          <button
            onClick={next(3)}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-40"
          >
            Next
          </button>
        </Questions>
      ) : null}
      {page === 3 ? (
        <div className="text-center">
          <h2 className="mb-6 text-2xl">Click End Button to Finish Last Question</h2>
          <button
            onClick={end}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-40"
          >
            End
          </button>
        </div>
      ) : null}
      {page === 4 ? <div className="text-3xl text-center">Thanks for your participation :)</div> : null}
    </div>
  );
}

export default App;
