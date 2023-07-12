
import React, { useEffect } from "react"
import { useState,useMemo } from "react";
import { Overview } from "./Overview";
import { License } from "./license";
import * as TestReport_Styled from "./TestReport_Styled";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables} from "chart.js";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
Chart.register(...registerables);

export default function TestReport() {
    
    const [userData, setUserData] = useState({});
    const [listPoints, setListPoints] = useState([]);
    const [ListHistory, setListHistory] = useState([]);
    const [typeChart, setTypeChart] = useState("month");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [timesAttemp, setTimesAttemp] = useState(0);
    const [averagePoint, setAveragePoint] = useState(0);
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);

    const fetchListPoint = async (year) => {

        await fetch(`/statistic/test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem("userInfo")).username,
                year: year
            })
        })
        .then(res => res.json())
        .then(data => {
            setListPoints(data.data);
        })

    }

    const fetchUserInfo = async () => {

        await fetch(`/user/${JSON.parse(localStorage.getItem("userInfo")).username}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setUserData(data.data);
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

    const updateTypeChart = (value) => {

        setTypeChart(value);

    }

    const statisticCal = () => {

        if(listPoints.length!==0) {
            if(typeChart === "month") {
                setAveragePoint( 

                    (listPoints[month-1].reduce((acc, cur) => {
                        
                        return acc += cur.points
                        
                    }, 0)/(listPoints[month-1].length === 0 ? 1 : listPoints[month-1].length )).toFixed(2) 

                );
                setTimesAttemp(listPoints[month-1].length);                
            }
            else {
                setAveragePoint( 

                    (listPoints.reduce((acc, cur) => {
                        return acc += cur.reduce((a, c) => {
                            return a += c.points/cur.length
                        }, 0 )
                        
                    }, 0)/(listPoints.length)).toFixed(2) 

                );
                setTimesAttemp(
                    listPoints.reduce((acc, cur) => {
                        return acc += cur.length
                        
                    }, 0))
            }

        }

    }

    const resetDataChart = (month) => {
        if(listPoints.length!== 0 ) {

            let numberOfColumn = new Date(year, month,0).getDate();

            if(typeChart === "year") {
                numberOfColumn = 12;
            }
            let barColumn = new Array(numberOfColumn).fill(0), lineColumn = new Array(numberOfColumn).fill(0);
            let dataMonth = listPoints[month-1];

            if(typeChart === "month") {

                dataMonth.forEach(element => {
                    barColumn[new Date(element.attempdate).getDate()-1] +=1;
                });
                dataMonth.forEach(element => {
                    lineColumn[new Date(element.attempdate).getDate()-1] += element.points/barColumn[new Date(element.attempdate).getDate()-1];
                });

            }
            else {
                barColumn = listPoints.reduce((acc , curr, idx) => {
                    acc.push(curr.length);
                    return acc
                }, []);
                lineColumn = listPoints.reduce((acc, curr, idx) => {
                    acc.push(curr.reduce((ac, cu) => ac += cu.points/curr.length, 0 ));
                    return acc;
                }, []);
            }

            statisticCal();
            setBarData(barColumn);
            setLineData(lineColumn.map(e => e.toFixed(2)));

        }

    }

    useMemo(() => {

        fetchListPoint(year);  

    }, [year])

    useMemo(() => {
        
        resetDataChart(month);

    }, [month, typeChart]);

    useMemo(() => {

        resetDataChart(month);
        statisticCal();

    }, [listPoints])

    useEffect(() => {

        fetchListPoint(year);  
        fetchUserInfo();
        GetListHistory();

    }, [])

    return (

        <TestReport_Styled.TestReportMain>

            <div style={{width:"69%"}}>

                <TestReport_Styled.PartMain style={{height:"25%"}}>

                    <TestReport_Styled.PartHeader>

                        <h1>Tổng quan</h1>

                    </TestReport_Styled.PartHeader>

                    <TestReport_Styled.PartContent>

                        <Overview title="Số lần kiểm tra" data={timesAttemp} unit = "Lần" color="--Color3" />
                        
                        <Overview title="Số điểm trung bình" data={averagePoint} unit="Điểm" color="--Color6" />
                    
                    </TestReport_Styled.PartContent>

                </TestReport_Styled.PartMain>


                <TestReport_Styled.PartMain style={{
                        height:"75%",
                        justifyContent:"flex-start"
                    }}>

                    <TestReport_Styled.PartHeader>

                        <h1>Thống kê</h1>

                    </TestReport_Styled.PartHeader>

                    <TestReport_Styled.PartContent_statistic>

                        <div>

                            <TestReport_Styled.ButtonSelectTypeChartDiv>

                                <button onClick={ e => updateTypeChart("month")} className={typeChart === "month" ? "selected": ""}>Theo tháng</button>

                                <button onClick={ e => updateTypeChart("year")} className={typeChart === "year" ? "selected": ""}>Theo năm</button>

                            </TestReport_Styled.ButtonSelectTypeChartDiv>


                            {
                                typeChart === "month" 

                                ? <TestReport_Styled.TimeSelectTypeCharDiv>

                                    <div>
                                        <select
                                            onChange={ e => setMonth(parseInt(e.target.value))}
                                        >
                                        {
                                        new Array(12).fill(0).map((e, idx) => {
                                            return <option
                                                    value = {idx+1}
                                                    selected = {idx+1 === month}
                                                    >Tháng {idx+1}
                                                </option>
                                            

                                        })
                                        }
                                        </select>
                                    </div>

                                    <div>
                                        <select
                                            onChange={ e => setYear(parseInt(e.target.value))}
                                        >
                                        {
                                        new Array(6).fill(0).map((e, idx) => {
                                            return <option
                                                    value = {new Date().getFullYear() + 3 -(idx)}
                                                    selected = {new Date().getFullYear() + 3 -(idx) === parseInt(year)}
                                                    >Năm {new Date().getFullYear() + 3-(idx)}
                                                </option>
                                        })
                                        }
                                        </select>
                                    </div>

                                </TestReport_Styled.TimeSelectTypeCharDiv>

                                : <TestReport_Styled.TimeSelectTypeCharDiv>

                                    <div>
                                        <select
                                            onChange={ e => setYear(parseInt(e.target.value))}
                                        >
                                        {
                                        new Array(6).fill(0).map((e, idx) => {
                                            return <option
                                                    value = {new Date().getFullYear() + 3 -(idx)}
                                                    selected = {new Date().getFullYear() + 3 -(idx) === parseInt(year)}
                                                    >Năm {new Date().getFullYear() + 3-(idx)}
                                                </option>
                                        })
                                        }
                                        </select>
                                    </div>

                                </TestReport_Styled.TimeSelectTypeCharDiv>
                            }                            

                        </div>

                        <div>

                            <Bar id="chart" data= {
                                        {
                                            labels: (barData ?? new Array(12).fill(0)).map((e, idx) => idx+1),
                                            datasets: [
                                                {
                                                    type: 'line',
                                                    label: 'Số điểm trung bình',
                                                    yAxisID: 'avg',
                                                    pointBorderColor: "#297242",
                                                    borderColor: '#297242',
                                                    pointStyle: false,
                                                    backgroundColor: () => {
                                                        var ctx = document.getElementById("chart").getContext("2d");
                                                        var gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
                                                        gradientFill.addColorStop(0, "rgba(104, 185, 132, 0.8)");
                                                        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.1)");
                                                        return gradientFill
                                                    },
                                                    borderWidth: 2,
                                                    data: lineData ?? new Array(12).fill(0), 
                                                    fill: true, 
                                                    tension: 0.3
                                                },
                                                {
                                                    type: 'bar',
                                                    label: 'Số lần làm bài',
                                                    yAxisID: 'times',
                                                    borderColor: '#fd8080',
                                                    backgroundColor: () => {
                                                        var ctx = document.getElementById("chart").getContext("2d");
                                                        var gradientFill = ctx.createLinearGradient(0, 0, 0, 1000);
                                                        gradientFill.addColorStop(0, "rgba(253, 128, 128, 1)");
                                                        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.1)");
                                                        return gradientFill
                                                    },
                                                    borderWidth: 3,
                                                    data: barData ?? new Array(12).fill(0), fill: true
                                                }
                                            ]
                                        } 
                                    }

                                    options= {
                                        {
                                            responsive: true,
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Biểu đồ số lần làm bài thi và số điểm trung bình'
                                                },
                                                legend: {
                                                    position: "bottom"
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                      title: (context) => `${context[0].dataset.label}`, // disable default title
                                                      label: (context) => `${typeChart === "month" ? "Ngày" : "Tháng"} ${context.parsed.x+1}: ${context.parsed.y} ${context.dataset.label === "Số lần làm bài" ? "Lần" : "Điểm"}` // customize label content
                                                    }
                                                }
                                            },
                                            scales: {
                                                times:{
                                                    id: 'times',
                                                    type: 'linear',
                                                    position: 'left',
                                                    ticks: {
                                                        stepSize: 1
                                                    },
                                                    min: 0
                                                }, 
                                                avg: {
                                                    id: 'avg',
                                                    type: 'linear',
                                                    position: 'right',
                                                    ticks: {
                                                        stepSize: 2
                                                    },
                                                }
                                            }
                                        }
                                    }
                            />

                        </div>

                    </TestReport_Styled.PartContent_statistic>

                </TestReport_Styled.PartMain>


            </div>

            <div style={{width:"29%"}}>

                <TestReport_Styled.PartMain style={{height: "40%"}}>

                    <TestReport_Styled.PartHeader>

                        <h1>Bằng lái xe</h1>

                    </TestReport_Styled.PartHeader>

                    <TestReport_Styled.PartContent >

                        <License data={userData}/>

                    </TestReport_Styled.PartContent>

                </TestReport_Styled.PartMain>

                <TestReport_Styled.PartMain style={{height: "60%", justifyContent: "flex-start"}}>

                    <TestReport_Styled.PartHeader>

                        <h1>Lịch sử làm bài</h1>

                    </TestReport_Styled.PartHeader>

                    <TestReport_Styled.PartContent style={{flexDirection:"column-reverse", overflow: "auto"}}>

                    {
                        ListHistory.filter(e => new Date(e.attempdate).getMonth()+1 === parseInt(month) && new Date(e.attempdate).getFullYear() === year).length !==0
                        ? ListHistory.filter(e => typeChart === "month" 
                            ? new Date(e.attempdate).getMonth()+1 === parseInt(month) && new Date(e.attempdate).getFullYear() === year
                            : new Date(e.attempdate).getFullYear() === year
                            ).map( element => {

                            let classNameCheck = "failed";
                            let icon = {

                                "failed": fa.faXmark,
                                "verified": fa.faCheck

                            }
                            if(element.points >= element.verifypoint) {
                                classNameCheck = "verified";
                            }

                            return  (                              
                                <TestReport_Styled.HistoryMain href={`/test/results/${element.id}`} key={element.id} className={classNameCheck}>

                                    <div>

                                        <div>
                                            <p>{element.testname}</p>
                                        </div>

                                        <div>
                                            <span className={classNameCheck}>
                                                <FontAwesomeIcon icon={icon[classNameCheck]}/>
                                            </span>
                                        </div>
                                        
                                    </div>

                                    <div>
                                        <div>
                                            <p><b>Bắt đầu </b>{(element.attempdate.substring(0, element.attempdate.length - 5)).replace("T", " ")}</p>
                                            <p><b>Hoàn thành: </b>{(element.datefinish.substring(0, element.datefinish.length - 5)).replace("T", " ")}</p>
                                        </div>
                                        <div className={classNameCheck}>
                                            <p>{element.points}/{element.questionquantity}</p>
                                        </div>
                                    </div>

                                </TestReport_Styled.HistoryMain>
                            )

                        })
                        :<div styled ={{
                            height: "100%", 
                            width: "100%", 
                            display:"flex",
                            alignItems: "center",
                            justifyContent: "center"
                            }}>
                            Nothing
                        </div>
                    }

                    </TestReport_Styled.PartContent>

                </TestReport_Styled.PartMain>

            </div>

        </TestReport_Styled.TestReportMain>

    )

}