
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { 
  TestSection,
  ListQuesComp,
  ListQuesHeader,
  ListQuesBtn,
  ListQuesSubmitBtn,
  TestInfoComp,
  TestInfoHeader,
  TestInfoName,
  TestInfomain,
  MainTestComp,
  MainTestAQues,
  AQuesHeader,
  AQuesContext,
  AQuesImg,
  AQuesMain,
  TestResultUser,
 } from "./TestPage_Styled";
import { LoadingScr } from "../../../LoadingScreen/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';

function ResultPage() {
  const { historyid } = useParams();
  const navigate = useNavigate();
  const [HistoryInfo, setHistoryInfo] = useState([]);
  const [TestInfo, SetTestInfo] = useState({});
  const [UserInfo, setUserInfo] = useState({});
  const [Loading, setLoading] = useState(true);

  const convertTime = (time) => {
    var res = "";
    if (time < 60) {
      res = `${time} Phút`;
    } else {
      res = `${parseInt(time / 60)} Tiếng ${time % 60} phút`;
    }
    return res;
  };

  const GetList = () => {
    fetch(`/results/${historyid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {

        setHistoryInfo(data.data.historyInfo);
        SetTestInfo(data.data.testInfo);
        setUserInfo(data.data.userInfo);
        setLoading(false);

      });
  };

  useMemo(() => {
    GetList();
  }, []); 
  const returnMain = () => {
    navigate("/");
  }

  return (
    <>

      {
        Loading ? <LoadingScr/> : <></>
      }
  
      <TestSection>
        <ListQuesComp>
          
          <ListQuesHeader>
            <p>Danh sách câu trả lời</p>
          </ListQuesHeader>

          <ListQuesBtn>
            {
            HistoryInfo.map((element, index) => {
              let className = "incorrect";

              console.log(element);
              if(element.asswereid !== null ) {
                if (element.ansQues[element.ansQues.findIndex( e=> e.istrue ===1)].id === element.answereid) {
                  className = "correct";
                }
              }

              return (
                <a
                  href={`#${index+1}`}
                  key={index}
                  className={className}
                >
                  {index + 1}
                </a>
              );
            })
            }
          </ListQuesBtn>

          <ListQuesSubmitBtn>
            <button onClick={returnMain}>Kết thúc</button>
          </ListQuesSubmitBtn>

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
            <p><b>Điều kiện đạt: </b>{TestInfo.verifypoint}/{TestInfo.questionquantity}</p>
          </TestInfomain>

          <TestResultUser>
            <p><b>Họ và tên: </b>{UserInfo.fullname}</p>
            <p><b>Số điện thoại: </b>{UserInfo.phone}</p>
            <p><b>Email: </b>{UserInfo.email}</p>
            <p><b>Ngày sinh: </b>{new Date(UserInfo.birthday).toLocaleDateString()}</p>
            <p><b>Điểm: </b>{UserInfo.points}/{TestInfo.questionquantity}</p>
          </TestResultUser>


        </TestInfoComp>    
        
        <MainTestComp>
          {
          HistoryInfo.map((e, idx) => {

            return (
              <MainTestAQues id={idx+1}>

                <AQuesHeader>

                  <AQuesContext>
                    <p>
                      <b>Câu hỏi {idx + 1}: </b>{e.context}
                    </p>
                  </AQuesContext>

                  {(() => {
                    if (e.imagequestion !== "") {
                      return (
                        <AQuesImg>
                          <img
                            alt={e.context}
                            src={e.imagequestion}
                          />
                        </AQuesImg>
                      );
                    }
                  })()}

                </AQuesHeader>

                <AQuesMain>
                  {
                  e.ansQues.map((anses, index) => {

                    let classNameInput = "nothing";
                    let classNameDiv = "normal";
                    let iconCheck = fa.faCheck;

                    if(e.answereid === anses.id) {

                      if(anses.istrue ===1) {
                        classNameDiv = "correct";
                      }
                      else {
                        classNameDiv = "incorrect";
                        iconCheck = fa.faXmark;
                      }

                      classNameInput = "check";
                    }  else {
                      if(anses.istrue ===1) {
                        classNameDiv = "correct";
                      }
                    }
                    return (
                      <div className={classNameDiv} > 
                        <div className={classNameInput}></div>
                        <p > {anses.context} <p><FontAwesomeIcon icon={iconCheck}/></p></p>
                      </div>
                    );
                  })
                  }
                  <div>
                    <p>
                      <b>Giải thích: {e.explain.replace(";", ".") || "Không có lời giải thích nào được cung cấp"} </b>
                    </p>
                  </div>
                </AQuesMain>

              </MainTestAQues>
            );
          })
          }
        </MainTestComp>

      </TestSection>      
    
    </>

  );
}

export default ResultPage;
