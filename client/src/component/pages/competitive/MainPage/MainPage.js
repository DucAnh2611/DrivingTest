import React, {useEffect, useState, useTransition} from "react";
import { createPortal } from "react-dom";
import { 
    PageSection ,
    PageFirstDiv,
    PageSectDiv,
    PageSectionHeader,
    PageSectionHeaderTitle,
    PageSectionHeaderSearch,
    PageSectionMain,
    PageSectionMainRow

} from "../../../TemplateLayout/TemplateLayout";
import { 
    LinkTest,
    TestHeader,
    TestContent,
    LinkHistory,
    HistoryHeader,
    HistoryMain,
    LayoutHover,
    ConfirmRedirect,
    NothingHistory

} from "./MainPagee_Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { LoadingScr } from "../../../LoadingScreen/Loading";

function MainPage() {
    const [List, SetList] = useState([]);
    const [ListHistory, setListHistory] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [showPopupRedirect, setShowPopupRedirect] = useState(false);
    const [isPending, startTransition] = useTransition();

    const convertTime = (time) => {

        var res = ""
        if(time< 60 ) {
            res = `${time} Phút`
        }
        else {
            res = `${parseInt(time/60)} Tiếng ${time%60} Phút`
        }
        return res;

    }

    const GetList = async () => {
        await fetch('/getAllTest', {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {

            SetList(data.data);
            setLoading(false);

        })
    }

    const GetListHistory = async () => {

        await fetch(`/history/${JSON.parse(localStorage.getItem("userInfo")).username}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {

            setListHistory(data.data);

        })            

    }

    const SearchList = async (e) =>{

        fetch(`/search/test?key=${e.target.value}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {

            startTransition(() => {

                setTimeout(() => {

                    setSearchInput(e.target.value);
                    SetList(data.data);

                }, 1000);
            
            });
            
        })  

    }

    const handleClickRedirect = () => {
        setShowPopupRedirect(true);
    }
    const ResetRedirect = () => {
        setShowPopupRedirect(false);
    }

    useEffect(()=>{

        setTimeout(() => {

            GetList();
            GetListHistory();

        }, 500);

    }, [])

    return (
        <>
        
        {
            Loading && (<LoadingScr/>)
        }

        <PageSection style={{
            flexDirection: "row"
        }}>

            <PageFirstDiv>

                <PageSectionHeader>

                    <PageSectionHeaderTitle>
                        <h1>
                            Danh sách bài kiểm tra
                        </h1>
                    </PageSectionHeaderTitle>

                    <PageSectionHeaderSearch>
                        <input 
                            type="search" 
                            placeholder="Tìm kiếm kỳ thi"
                            onChange={e => SearchList(e)}
                        />
                    </PageSectionHeaderSearch>

                </PageSectionHeader>

                <PageSectionMainRow>

                    {
                        !isPending 

                        ? List.length !== 0 

                            ? List.map(element => {
                                return (
                                    <LinkTest key={element.id}>
                                        
                                        <TestHeader>
                                            <div>
                                                <img alt="test img" src={element.imagetest}/>
                                            </div>
                                            <span>
                                                <FontAwesomeIcon icon={fa.faBiking}/>
                                            </span>
                                        </TestHeader>

                                        <TestContent>

                                            <div>
                                                <h1>{element.testname}</h1>
                                            </div>

                                            <div>
                                                <p>{element.questionquantity} Câu hỏi</p>
                                                <p>{convertTime(element.timecount)}</p>
                                            </div>

                                            <div>
                                                <p>Điều kiện: {element.verifypoint}/{element.questionquantity}</p>
                                            </div>
                                            <div>
                                                <button onClick={handleClickRedirect}>
                                                    <p>Làm bài</p>
                                                    <button>
                                                        <FontAwesomeIcon icon={fa.faArrowRight}/>
                                                    </button>
                                                </button >
                                                {
                                                    showPopupRedirect  ? createPortal(
                                                        <ConfirmRedirect>

                                                            <div>
                                                                <div>
                                                                    <p>Bạn sẽ làm bài thi: <br></br>{element.testname}</p>
                                                                </div>
                                                                <div>
                                                                    <a href={`/test/${element.id}`}>Làm bài thi</a>
                                                                    <button onClick={ResetRedirect}>Huỷ</button>
                                                                </div>
                                                            </div>

                                                        </ConfirmRedirect>,
                                                        document.querySelector(".App")
                                                    ) : <></>
                                                }
                                            </div>
                                        </TestContent>

                                    </LinkTest>
                                ) 
                            }) 

                            :<NothingHistory>
                                <p>Không có bài thi nào phù hợp với kết quả: "{searchInput}"</p>
                            </NothingHistory>

                        : <NothingHistory>
                            <p>Loading...</p>
                        </NothingHistory>
                    }  

                </PageSectionMainRow>

            </PageFirstDiv>

            <PageSectDiv>
                
                <PageSectionHeader>
                    <PageSectionHeaderTitle>
                            <h1>
                                Lịch sử bài thi
                            </h1>
                        </PageSectionHeaderTitle>
                </PageSectionHeader>

                <PageSectionMain>

                    {
                        ListHistory.length !==0 
                        ? ListHistory.map(element => {
                            let classNameCheck = "failed";
                            if(element.points >= element.verifypoint) {
                                classNameCheck = "verified";
                            }
                            return (
                                <LinkHistory href={`/test/results/${element.id}`} key={element.id} className={classNameCheck}>
                                                                        
                                    <LayoutHover>
                                        <span style={{width:"100%"}}></span>
                                        <span style={{width:`${parseInt((element.verifypoint/element.questionquantity)*100)}%`}}></span>
                                        <span style={{width:`${parseInt((element.points/element.questionquantity)*100)}%`}}></span>
                                    </LayoutHover>

                                    <HistoryHeader>
                                        <p>{element.testname}</p>
                                    </HistoryHeader>

                                    <HistoryMain>
                                        <div>
                                            <p><b>Bắt đầu </b>{(element.attempdate.substring(0, element.attempdate.length - 5)).replace("T", " ")}</p>
                                            <p><b>Hoàn thành: </b>{(element.datefinish.substring(0, element.datefinish.length - 5)).replace("T", " ")}</p>
                                        </div>
                                        <div>
                                            <p>{element.points}/{element.questionquantity}</p>
                                        </div>
                                    </HistoryMain>

                                </LinkHistory>
                            ) 
                        })
                        : 
                        <NothingHistory>
                            <p>Không có lịch sử làm bài nào</p>
                        </NothingHistory>
                    }
                    
                </PageSectionMain>

            </PageSectDiv>

        </PageSection>        

        </>

    )
};

export default MainPage;
