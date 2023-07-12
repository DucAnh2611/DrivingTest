
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { 
  TestSection,
  ListQuesComp,
  ListQuesHeader,
  ListQuesBtn,
  ListQuesSubmitBtn,
  ListQuesTimer,
  TestInfoComp,
  TestInfoHeader,
  TestInfoName,
  TestInfomain,
  MainTestComp,
  MainTestDefault,
  MainTestAQues,
  AQuesHeader,
  AQuesContext,
  AQuesImg,
  AQuesMain,
  PopupResults,
  ResultsMain,
  ResultsMainHeader,
  ResultsMainBody,
  ResultsMainbtnReturn,
  ControlButton
 } from "./TestPage_Styled";
import { LoadingScr } from "../../../LoadingScreen/Loading";
import PopupSubmit from "./PopupFinish";


function TestPage() {
  const [List, SetList] = useState([]);
  const { testid } = useParams();
  const [TestInfo, SetTestInfo] = useState([]);
  const [currentQues, SetCurrentQues] = useState({});
  const [listAns, SetListAns] = useState([]);
  const [finish, SetFinish] = useState(false);
  const [results, setResults]= useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeText, setTimeText] = useState("00:00:00");
  const [deadlineTime, SetDeadlineTime]= useState(new Date());
  const [Loading, setLoading] = useState(true);

  const DeadLineTime = (timer) => {
    let nowDate = new Date();
    let deadline = new Date(nowDate.setMinutes(nowDate.getMinutes() + timer));
    SetDeadlineTime(deadline);  
  }
  const StartTimer = (timer) => {
    let nowDate  = new Date();
    let countDown = (Date.parse(timer) - Date.parse(nowDate))/1000;
    if(countDown >= 0) {
      if(countDown === 0 && listAns.length !==0) {
        Submit();
        setTimeText(`00:00:00`)
      }else {
        setTimeText(`${parseInt(parseInt(countDown/(60*60))/10)}${parseInt(countDown/(60*60))%10}:${parseInt(parseInt(countDown/(60))/10)}${parseInt(countDown/(60))%10}:${parseInt((countDown - parseInt(countDown/60)*60)/10)}${parseInt(countDown%10)}`)
      }
    }
  }
  const convertTime = (time) => {
    var res = "";
    if (time < 60) {
      res = `${time} phút`;
    } else {
      res = `${parseInt(time / 60)} Tiếng ${time % 60} phút`;
    }
    return res;
  };

  const GetIdxList = (idx) => {
    SetCurrentQues({ ...List[idx], quesidx: parseInt(idx) });
  };

  const CreateDefautListAns = (List) => {
    SetListAns(List.map((e) => ( {
      quesid: e.id,
      ansid: 0
      })
    ));
  };

  const GetList = () => {
    fetch(`/test/${testid}/getQues`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        SetList(data.data.questions);
        SetTestInfo(data.data.test);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetList();
  }, []);

  useMemo(() => {
    CreateDefautListAns(List);
  }, [List.length]);

  useMemo(() => {
    setTimeLeft(TestInfo.timecount);
  }, [Object.keys(TestInfo).length]);

  useMemo(() => {
    DeadLineTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    const inteval = setInterval(() => {
      StartTimer(deadlineTime);
    }, 1000)
    return () => clearInterval(inteval)
  }, [deadlineTime]);
  
  const ClickButonInput = (event, aid, qid) => {
    SetListAns(listAns.map((e) => {
        if(e.quesid === qid) {
          e.ansid = aid;
        } 
        return e;
    }));
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const ConvertToDatetime = (date) => {
    return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
    )
  };

  const PreviousQuestion = () => {
    let idxCurrentQues = List.findIndex(e=> e.id === currentQues.id);
    SetCurrentQues({...List[idxCurrentQues > 0 ? idxCurrentQues-1 : idxCurrentQues], quesidx: idxCurrentQues > 0 ? idxCurrentQues-1 : idxCurrentQues});
  };

  const AfterQuestion = () => {
    let idxCurrentQues = List.findIndex(e=> e.id === currentQues.id);
    if (currentQues !== {}) {    
      SetCurrentQues({...List[idxCurrentQues < List.length-1 ? idxCurrentQues+1 : idxCurrentQues], quesidx: idxCurrentQues < List.length-1 ? idxCurrentQues+1 : idxCurrentQues});   
    }
    else {
      SetCurrentQues({...List[0], quesidx: List[0].id}); 
    }

  };

  const Submit = async () => {
    await fetch("/submitTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInfo: {
          username: JSON.parse(localStorage.getItem("userInfo")).username,
        },
        testSubmit: {
          test: {
            id: testid,
            attemp: ConvertToDatetime(new Date(deadlineTime.setMinutes(deadlineTime.getMinutes() - timeLeft))),
            finish: ConvertToDatetime(new Date()),
          },
          questions: listAns,
        },
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setResults(data.data);
      SetFinish(true);
    });
  };

  return (

    <>
    
    {
      Loading ? (<LoadingScr/>) : <></>
    }

    <TestSection>


      <ListQuesComp>
        
        <ListQuesHeader>
          <p>Danh sách câu hỏi</p>
        </ListQuesHeader>

        <ListQuesBtn>
          {listAns.map((element, index) => {
            let className = "checked";
            if(element.ansid ===0 ) {
              className = "notChecked";
            }
            return (
              <button
                onClick={(e) => {
                  GetIdxList(e.target.value);
                }}
                key={index}
                value={index}
                className={className}
              >
                {index + 1}
              </button>
            );
          })}
        </ListQuesBtn>

        <ListQuesSubmitBtn>
          <button onClick={Submit}>Nộp bài</button>
        </ListQuesSubmitBtn>

        <ListQuesTimer>
          <p>{timeText}</p>
        </ListQuesTimer>

      </ListQuesComp>

      <TestInfoComp>

        <TestInfoHeader>
          <img alt={TestInfo.imagetest} src={TestInfo.imagetest} />
        </TestInfoHeader>

        <TestInfoName>
          <h1>{TestInfo.testname}</h1>
        </TestInfoName>

        <TestInfomain>
          <p><b>Thời gian: </b>{convertTime(TestInfo.timecount)}</p>
          <p><b>Bao gồm: </b>{TestInfo.questionquantity} Câu hỏi</p>
          <p><b>Điều kiện: </b>{TestInfo.verifypoint}/{TestInfo.questionquantity}</p>
        </TestInfomain>

      </TestInfoComp>    
      
      <MainTestComp style={{height: "90%"}}>

        {(() => {
          if (Object.keys(currentQues).length === 0) {
            return (
              <>
              
                <MainTestDefault>
                  <p>
                    <b>Hướng dẫn làm bài thi: </b><br></br> Chọn 1 câu hoi ở danh sách bên phải để làm bài thi. Làm xong bài thi có thể xem lại kết quả của mình.
                  </p>
                </MainTestDefault>      

                <ControlButton>
                  <button onClick={AfterQuestion}>Sau</button>
                </ControlButton>
              
              </>

            );
          } else {
            return (
              <>

                <MainTestAQues>

                  <AQuesHeader>

                    <AQuesContext>
                      <p>
                        <b>Câu hỏi {currentQues.quesidx + 1}: </b>{currentQues.question}
                      </p>
                    </AQuesContext>

                    {(() => {
                      if (currentQues.img !== "") {
                        return (
                          <AQuesImg>
                            <img
                              alt={currentQues.question}
                              src={currentQues.img}
                            />
                          </AQuesImg>
                        );
                      }
                    })()}

                  </AQuesHeader>

                  <AQuesMain>
                    {
                      currentQues.ans.map((anses, index) => {
                        var ansedId = listAns[listAns.findIndex(ans => ans.quesid === currentQues.id)].ansid;
                        return (
                          <div
                            onClick={event => ClickButonInput(event, anses.id, currentQues.id)}
                          > 
                            {
                              (()=> {
                                if(ansedId === anses.id) {
                                  return <div className="check"></div>
                                }  
                                else {
                                  return <div className="nothing"></div>
                                }
                              })()
                            }
                            <p > {anses.context}</p>
                          </div>
                        );
                      })
                    }
                  </AQuesMain>

                </MainTestAQues> 

                <ControlButton>
                  <button onClick={PreviousQuestion}>Trước</button>
                  <button onClick={AfterQuestion}>Sau</button>
                </ControlButton>

              </>

            );
          }
        })()}

      </MainTestComp>

      {
        finish && Object.keys(results).length !==0 ? <PopupSubmit userInfo={results.userInfo} testHistory={results.test_history}/> : <></>
      } 

    </TestSection>    
    
    </>


  );
}

export default TestPage;
