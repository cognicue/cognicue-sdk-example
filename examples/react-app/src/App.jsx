import { useEffect, useRef, useState } from "react";
import useScript from "./use-script.hook";
import Loader from "./Loader";

const optionsConfig = {
  accountID: "",
  audioRecord: true,
  videoRecord: true,
  interviewID: "",
  candidate: {
    email: "",
  },
};

function App() {
  const loaded = useScript("https://sdk.cognicue.in/0.1.1/cognicue.min.js");
  const [loader, setLoader] = useState(true);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questionShow, setQuestionShow] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [finishInterview, setFinishInterview] = useState(false);
  const [errorOnPage, setErrorOnPage] = useState(false);
  const cogniCueNode = useRef(null);

  const onReady = () => {
    setLoader(false);
    setStarted(true);
    console.log("ready........");
  };

  const onStart = () => {
    console.log("start........");
  };

  const onUpdate = (event) => {
    console.log("updates", event.data);
  };

  const onStatusUpdate = (event) => {
    console.log(event);

    if (event.status === "COMPLETED") {
      setFinished(true);
      console.log("Completed........");
    }
  };

  const questionHandler = () => {
    const data = JSON.parse(localStorage.getItem("activity_data"));
    setQuestionText(data.question.question_text);
  };

  const startHandler = async () => {
    await cogniCueNode.current?.start();
    questionHandler();
    setStarted(false);
    setQuestionShow(true);
  }

  const nextHandler = async () => {
    await cogniCueNode.current.stop();
    setQuestionText('Getting next question.');
    await cogniCueNode.current.start();
    questionHandler();
  }

  const finishHandler = async () => {
    setFinishInterview(true);
    await cogniCueNode.current.stop();
    cogniCueNode.current.destroy();
  }

  const errorHandler = ({ error }) => {
    if (error === "access") {
      setStarted(false);
      setErrorOnPage(true);
    }
  }

  useEffect(() => {
    if (loaded) {
      setLoader(true);
      cogniCueNode.current = new window.CogniCue(optionsConfig);
      cogniCueNode.current.ready();

      cogniCueNode.current.onReady = onReady;
      cogniCueNode.current.onStart(onStart);
      cogniCueNode.current.onUpdate(onUpdate);
      cogniCueNode.current.onStatusUpdate(onStatusUpdate);
      cogniCueNode.current.onError(errorHandler);
    }
  }, [loaded]);

  if (loader) {
    return <Loader />;
  }

  if (errorOnPage) {
    return (
      <div>
        Oops! something went wrong
      </div>
    )
  }

  return (
    <>
      <div className={`question-box ${!questionShow || finishInterview ? 'hide' : ''}`}>
        <div className="question">{questionText}</div>
        <div className="question-buttons">
          <button className={`question-next ${finished ? 'hide': ''}`} onClick={nextHandler}>Next</button>
          <button className={`question-finish ${!finished ? 'hide': ''}`} onClick={finishHandler}>Finish</button>
        </div>
      </div>
      <div className={`start-screen ${!started ? 'hide' : ''}`}>
        <button className="question-start" onClick={startHandler}>Start</button>
      </div>
      <div className={`finish-screen ${!finishInterview ? 'hide': ''}`}>Interview End.</div>
    </>
  );
}

export default App;
