import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    VerifyDiv,
    VerifySection,
    VerifyFieldDiv,
    VerifyInputDiv,
} from "../../TemplateLayout/TemplateLayout";
import { LoadingScr } from "../../LoadingScreen/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons"

function Login() {
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [field, SetField] = useState("");
  const [Loading, setLoading] = useState(false);

  const ClickSign = () => {
    navigate("/signup");
  };
  
  const LoginAuth = async () => {
    await fetch("/loginAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              username: username,
            })
          );
          setLoading(true);
          navigate("/");
          window.location.reload();
        } else {
          SetField(data.field);
        }
      });
  };

  return (
    <>
    
    {
      Loading? <LoadingScr/> : <></>

    }

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
              onChange={(e) =>SetUsername(e.target.value)}
              id="username"
              maxLength={20}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faUser}/> Tên đăng nhập</span>
            {
            (() => {
              if (field === "username") {
                return <p>* Tài khoản không tồn tại</p>;
              }
            })()
            }
          </VerifyInputDiv>

          <VerifyInputDiv>
            <input
              type="password"
              required={true}
              onChange={(e) => SetPassword(e.target.value)}
              id="password"
              maxLength={30}
              minLength={1}
            ></input>
            <span><FontAwesomeIcon icon={fa.faPen}/> Mật khẩu</span>
            {
            (() => {
              if (field === "password") {
                return <p>* Mật khẩu không chính xác</p>;
              }
            })()
            }
          </VerifyInputDiv>

        </VerifyFieldDiv>

        <VerifyFieldDiv style={{
            justifyContent: "space-between"
        }}>
          <button onClick={LoginAuth}>Đăng nhập</button>
          <button onClick={ClickSign}>Đăng ký</button>
        </VerifyFieldDiv>

      </VerifySection>
    </VerifyDiv>    
    
    </>

  );
}
export default Login;
