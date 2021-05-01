import * as React from 'react';
import './App.css';
import QuestionCard from '../QuestionCard/QuestionCard';
import { fetchQuestions } from "../../API";
import { Question } from "../../API"
import {
  useParams, 
  Link
} from "react-router-dom";

import { GlobalStyle, Wrapper } from "./Quiz.styles"

export type AnswerObject = {
  question: string;
  answer: string;
  progress: boolean;
  correctAnswer: string
}

function Quiz() {
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [category, setCategory] = React.useState<string>()
  const [over, setOver] = React.useState(true);

  let { slug } = useParams<{ slug: string }>();

  React.useEffect(()=>{ 
    const getSetData = async ()=> {
      const newQuestions = await fetchQuestions(slug)    
      setQuestions(newQuestions.questions);
      setTotal(newQuestions.count)
      setCategory(newQuestions.name)
    };
    getSetData();
  },[slug])

  const startTrivia = () => {
    setLoading(true);
    setOver(false);
    setScore(0);
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!over) {
      const answer = e.currentTarget.value;
      const correct = questions[number].answers.find(answer => answer.is_correct === true) 
      
      const progress = correct!.text === answer
      if (progress) setScore(prev=> prev+1)
      //save answer in the aray for user
      const answerObject = {
        question: questions[number].text,
        answer,
        progress,
        correctAnswer: correct!.text
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === total) {
      setOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }
  return ( 
    <>
    <GlobalStyle />
    <Wrapper className="App" style={{marginTop: "25px"}}>
      <h1>{category}</h1>
      <h2 className="mb-2" style={{color:'white'}}>Total questions: {total}</h2>
      {over || userAnswers.length === total ?
      (
      <div className="btn-group mr-2 mt-2">
        <button className="btn btn-info btn-lg btn-block" onClick={startTrivia}>
          Start
        </button>
        <Link to='/'>
        <button className="btn btn-primary btn-lg btn-block">
          Back
        </button>
        </Link>
      </div>): null}
      { !over && <p className="score mb-2">Score: {score}</p>}
      { loading && <p>Loading Questions ...</p> }
      {!loading && !over &&
      <QuestionCard 
        questionNr={number +1}
        totalQuestions={total}
        question={questions[number]}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />}
      {!over && !loading && userAnswers.length === number+1 &&
      number !== total-1 ? (
      <button className='btn btn-info btn-lg btn-block mt-3' onClick={nextQuestion}>
        Next Question
      </button>): null}
    </Wrapper>
    </>
  );
}

export default Quiz;
