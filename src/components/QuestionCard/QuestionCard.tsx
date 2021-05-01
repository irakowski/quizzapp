import * as React from "react";
import { AnswerObject } from '../Quiz/Quiz'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: {
      id: number;
      text: string
    };
    answers: {
      id: number, 
      text: string, 
      is_correct: boolean }[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions
}:Props) => (
  <Wrapper>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{__html: question?.text}}></p>
      <div>
        {answers.map(({id, text, is_correct})=>(
          <div key={id}>
            <ButtonWrapper 
            correct={userAnswer?.correctAnswer === text}
            userClicked={userAnswer?.answer === text}>
            <button
            disabled={userAnswer ? true : false} 
                    value={text}
                    onClick={callback}
                    >
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            </button>
            </ButtonWrapper>
          </div>
        ))}
      </div>
    </Wrapper>)

export default QuestionCard;