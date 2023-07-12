import React, { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  VerifyDiv,
  VerifySection,
  VerifyFieldDiv,
  VerifyInputDiv,
} from "../../TemplateLayout/TemplateLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const navigate = useNavigate();
  const [ValidData, setValidData] = useState(true);
  const [userInfo, SetUserInfo] = useState({
    username: "",
    pass: "",
    email: "",
    phone: "",
    fullname: "",
    birthday: `${new Date().getFullYear()}-${parseInt((new Date().getMonth()+1) /10)}${(new Date().getMonth()+1) % 10}-${parseInt(new Date().getDate()/10)}${new Date().getDate() % 10}`
  });

  const emailFormat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneFormat = /^[0-9]{10}$/

  const filterData = () => {

    SetField([]);
    setValidData(true);

    Object.keys(userInfo).forEach(e => {
      if(userInfo[e] === "") {
        setValidData(false);
      }
      else {

        if(e === "email" & !Boolean(userInfo[e].match(emailFormat)) ) {
          setValidData(false);
          SetField(field => [...field, {
            field: e,
            msg: "Sai định dạng email"
          }]);
        } 
        else if(e === "phone" & !Boolean(userInfo[e].match(phoneFormat)) ) {
          setValidData(false);
          SetField(field => [...field, {
            field: e,
            msg: "Sai định dạng số điện thoại"
          }]);
        }
        else if((e==="username" || e==="pass") && userInfo[e].includes(' ')) {
          setValidData(false);
          SetField(field => [...field, {
            field: e,
            msg: "Không thể chứa dấu cách (space)"
          }]);
        }
        else if(e === "birthday") {

          let CurrentDate = new Date();
          let userPickDate = new Date(userInfo[e]);
          let diff_day = parseInt((Date.parse(userPickDate) - Date.parse(CurrentDate))/(1000*60*60*24));
          let diff_year = CurrentDate.getFullYear()-userPickDate.getFullYear();


          if(diff_day >=0) {
            setValidData(false);
            SetField(field => [...field, {
              field: e,
              msg: "không thể chọn ngày sinh quá thời điểm hiện tại"
            }]);
          }else {
            if(diff_year < 18) {
              setValidData(false);
              SetField(field => [...field, {
                field: e,
                msg: "Chưa đủ 18 tuổi"
              }]);
            }
          }

        }

      }
    })
  }

  useEffect(()=>{
    filterData();
  }, [userInfo])

  const InputChange = useCallback(
    (type) => (e) => {
      SetUserInfo({ ...userInfo, [type]: e.target.value });
    },
    [userInfo]
  );

  const [field, SetField] = useState([]);

  const SignupAuth = async () => {
    await fetch("/signAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userInfo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              username: userInfo.username,
            })
          );
          navigate("/");
        } else {
          SetField(data.field);
        }
      });
  };

  const ClickToLogin = () => {
    navigate("/login");
  }

  return (
    <VerifyDiv>

      <VerifySection>

        <VerifyFieldDiv>
          <p>Trắc nghiệm<br></br>Thi bằng lái xe máy</p>
        </VerifyFieldDiv>

        <VerifyFieldDiv style={{
            flexDirection:"column"
        }}>

          <VerifyInputDiv>
            <input
              type="text"
              required={true}
              onChange={InputChange("username")}
              value={userInfo.username}
              maxLength={20}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faUser}/> Tên đăng nhập</span>
            {field.map((element) => {
              if (element.field === "username") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="password"
              required={true}
              onChange={InputChange("pass")}
              value={userInfo.pass}
              maxLength={30}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faPen}/> Mật khẩu</span>
            {field.map((element) => {
              if (element.field === "pass") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="text"
              required={true}
              onChange={InputChange("fullname")}
              value={userInfo.fullname}
              maxLength={100}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faInbox}/> Họ và tên</span>
            {field.map((element) => {
              if (element.field === "fullname") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="text"
              required={true}
              onChange={InputChange("email")}
              value={userInfo.email}
              maxLength={50}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faMailBulk}/> Email</span>
            {field.map((element) => {
              if (element.field === "email") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="text"
              required={true}
              onChange={InputChange("phone")}
              value={userInfo.phone}
              maxLength={10}
              minLength={10}
            ></input>
            <span><FontAwesomeIcon icon={fa.faPhone}/> Số điện thoại</span>
            {field.map((element) => {
              if (element.field === "phone") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="date"
              required={true}
              onChange={InputChange("birthday")}
              value={userInfo.birthday}
            ></input>
            <span style={{        
              zIndex: "1",
              top: "0",
              backgroundColor: "var(--White)"}}
          ><FontAwesomeIcon icon={fa.faBirthdayCake}/> Ngay sinh</span>
            {field.map((element) => {
              if (element.field === "birthday") {
                return <p>* {element.msg}</p>;
              }
              return <Outlet />;
            })}
          </VerifyInputDiv>

        </VerifyFieldDiv>

        <VerifyFieldDiv style={{
            justifyContent: "space-between"
        }}>
          <button onClick={SignupAuth} disabled={!ValidData}>Dang ky</button>
          <button onClick={ClickToLogin}>Dang nhap</button>
        </VerifyFieldDiv>

      </VerifySection>

    </VerifyDiv>
  );
}
export default Signup;
