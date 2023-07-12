import React, {Component, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { 
    LogoNav,
    MainNav,
    MenuMain,
    MenuPart,
    MenuPartContent,
    MenuPartHeader,
    UserMenuBtn,
    UserName,
    UserNav,
    UserNavAvatar
} from "./NavCompe_Styled";

export default function NavCompetitive() {
    const [userData, setUserData] = useState({});
    const [OpenMenuuser, setOpenMenuUser] = useState(false);

    const openMenu = () => {
        setOpenMenuUser(!OpenMenuuser);
    }

    const GetUserData = async () => {
        await fetch(`/user/${JSON.parse(localStorage.getItem("userInfo")).username}`, {
            method: "GET"
        })
        .then(res=>res.json())
        .then(res => {
            setUserData(res.data);
        })
    }
    useEffect(() => {
        GetUserData();
    }, [])

    return (
        <MainNav>

            <LogoNav href="/">
                <span>
                    <FontAwesomeIcon icon={fa.faBiking}/>
                </span>
                <p>Driving Bike Testing</p>
            </LogoNav>

            <UserNav>

                <UserName>
                    <p>{userData.fullname}</p>
                </UserName>

                <UserNavAvatar>
                    <div>
                        <img alt="user avatar" src={userData.avatar}></img>
                    </div>
                </UserNavAvatar>

                <UserMenuBtn>
                    <button onClick={openMenu}>
                        <span>
                            <FontAwesomeIcon icon={
                                OpenMenuuser ? fa.faAngleUp : fa.faAngleDown
                            }/>
                        </span>
                    </button>
                </UserMenuBtn>
                
                {
                    OpenMenuuser ? (
                        <MenuMain>
                            
                            <MenuPart>
        
                                <MenuPartHeader>
                                    <p>Thông tin cá nhân</p>
                                </MenuPartHeader>
        
                                <MenuPartContent>

                                    <div>
                                        <p><b>Họ và tên: </b></p>
                                        <p>{userData.fullname}</p>
                                    </div>

                                    <div>
                                        <p><b>Ngày sinh: </b></p>
                                        <p>{new Date(userData.birthday).toLocaleDateString()}</p>
                                    </div>
                                    
                                    <div>
                                        <p><b>Số điện thoại: </b></p>
                                        <p>{userData.phone}</p>
                                    </div>

                                    <div>
                                        <p><b>Email: </b></p>
                                        <p>{userData.email}</p>
                                        
                                    </div>

                                    <div>
                                        <p><b>Ngày tạo: </b></p>
                                        <p>{new Date(userData.createdate).toLocaleDateString()}</p>
                                    </div>

                                </MenuPartContent>
        
                            </MenuPart>

                            <MenuPart>
        
                                <MenuPartHeader>
                                    <p>Khác</p>
                                </MenuPartHeader>
        
                                <MenuPartContent>

                                    <a href="/login">Đăng xuất</a>

                                    <a href="/statistic">Thống kê bài thi</a>

                                </MenuPartContent>
        
                            </MenuPart>

                        </MenuMain>
                    ) : <></>
                }

            </UserNav>

        </MainNav>

    )
}