import React from 'react';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {waiting, loading, questions, index, correct, nextQuestion, checkAnswer} = useGlobalContext();
  if(waiting){
    return (
      <SetupForm />
    )
  }
  if(loading){
   return (
      <Loading/>
    )
  }


 const {question , incorrect_answers, correct_answer } = (questions[index]);
 let  answers = [...incorrect_answers] ;
 const tempIndex = Math.floor(Math.random() * 4);
 if(tempIndex === 3){
   answers.push(correct_answer);
 }
 else{
   answers.push(answers[tempIndex]);
   answers[tempIndex] = correct_answer;
 }

  return (
    <main>
      <Modal/>
      <section className="quiz">
        <p className="correct-answers">correct answers:{correct}/{index}</p>
        <article className="container">
          <h4 dangerouslySetInnerHTML={{__html:question}}/>
            <div className="btn-container">
              {answers.map((item,index)=> {
                return (
                  <button key={index} className="answer-btn" dangerouslySetInnerHTML={{__html:item}} onClick={() => checkAnswer(correct_answer === item)} />
                )
              })}
            </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>next</button>
      </section>
    </main>
  )
  
}

export default App;
