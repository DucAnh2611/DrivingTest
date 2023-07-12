import React, { Component } from "react";
import { Link } from "react-router-dom";
import { 
    PopupResults, 
    ResultsMain, 
    ResultsMainBody, 
    ResultsMainHeader,
    ResultsMainbtnReturn
} from "./TestPage_Styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";

export class PopupSubmit extends Component {
    constructor(props) {
        super(props);
        this.userFinishInfo = props.userInfo;
        this.TestFinishInfo = props.testHistory;
    }
    render () {
        console.log(1);
          return (
            <PopupResults>

              <div>

              </div>

              <ResultsMain>

                <ResultsMainHeader>
                    <p><b>Tên thí sinh: </b>{this.userFinishInfo.fullname}</p>
                    <p><b>Email: </b>{this.userFinishInfo.email}</p>
                    <p><b>Số điện thoại: </b>{this.userFinishInfo.phone}</p>
                    <p><b>Ngày sinh: </b>{(new Date(this.userFinishInfo.birthday)).toLocaleDateString()}</p>
                </ResultsMainHeader>
    
                <ResultsMainBody>

                    <div>
                      {
                        (() =>{
                          let textRes = "Không đạt";
                          let icon = fa.faXmark;
                          let color = "--Wrong";
                          if(this.TestFinishInfo.point >= this.TestFinishInfo.verifypoint){
                            textRes="Đạt";
                            icon = fa.faCheck;
                            color = "--Correct";
                          }
                          return (
                            <div style={{borderColor: `var(${color})`, color: `var(${color})`}}>
                              <span>
                                <FontAwesomeIcon icon={icon}/>
                              </span>
                              <p>
                                {textRes}
                              </p>
                            </div>
                          )
                        })()
                      }
                    </div>

                    <div> 
                        <p>{this.TestFinishInfo.point}/{this.TestFinishInfo.questionquantity}</p>
                    </div>

                </ResultsMainBody>

                <ResultsMainbtnReturn>
                    <Link to={`/`}>Xác nhận và kết thúc</Link>
                    <Link to={`/test/results/${this.TestFinishInfo.historyid}`}>Xem lại kết quả</Link>
                </ResultsMainbtnReturn> 

              </ResultsMain>

            </PopupResults>
            
          )
    }
}

export default PopupSubmit;