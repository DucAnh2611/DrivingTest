import React, { useEffect, useState } from "react";
import {Routes, Route, Outlet} from 'react-router-dom';
import NavCompetitive from "../nav/NavCompetitive/navCompe";
import MainPage from "../pages/competitive/MainPage/MainPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import TestPage from "../pages/competitive/Testpage/Testpage";
import ResultPage from "../pages/competitive/ResultsPage/ResultPage";
import TestReport from "../pages/competitive/Statistic/Test/TestReport";

function AppRouter() {
    const [Islogin, SetIslogin] = useState(false);

    const LoginState = async () => {
        var username = JSON.parse(localStorage.getItem("userInfo")).username;
        localStorage.clear();
        await fetch('/loginState', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
        .then(res => res.json())
        .then(data=> {
            if(data.status === "ok") {
                SetIslogin(true);
                localStorage.setItem("userInfo", JSON.stringify({username: username}));
            }
        });
    }

    useEffect(() => {
        LoginState();
    }, [])

    const PrivateRoute = () => {
        return Islogin === true ? <Outlet/> : <Login/>
    }

    const WithoutNav = () => (
        <>
            <Outlet/>
        </>
    )

    const WithNav = () => (
        <>
            <NavCompetitive/>
            <Outlet/>
        </>
    )

    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route element={<WithNav/>}>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/test/:testid" element={<TestPage/>}></Route>
                    <Route path="/test/results/:historyid" element={<ResultPage/>}></Route>
                    <Route path="/statistic" element={<TestReport></TestReport>}></Route>
                </Route>
            </Route>
            <Route element={<WithoutNav/>}>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
            </Route>
        </Routes>

    )
}

export default AppRouter;
