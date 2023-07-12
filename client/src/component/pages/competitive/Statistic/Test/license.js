import React from "react";
import { 
    LicenseContent,
    LicenseHeader,
    LicenseMainDiv,
    LicenseUserInfo
 } from "./Liecense_Styled";
export class License extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.setState({
            changed: false,
            avatar: "",
            fullname: "",
            createdate: "",
            phone: "",
            email: ""                
        });
    }

    componentDidUpdate() { 
        if(Object.keys(this.props.data).length !== 0 && this.state.changed !== true) {
            this.setState({changed: true, ...this.props.data});
        }
        
    }

    render() {
        return (

            <LicenseMainDiv>

                <LicenseHeader>

                    <div>
                        <p>BỘ GTVT</p>
                        <p>MOT</p>
                    </div>

                    <div>
                        <p>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                        <p>Độc lập - Tự Do - Hạnh phúc</p>
                    </div>

                </LicenseHeader>

                <LicenseContent>

                    <div>

                        <div>

                            <img alt="Anh chan dung" src={this.state.avatar}></img>

                        </div>

                        <LicenseUserInfo>

                            <div>
                                
                                <p>
                                    GIẤY PHÉP LÁI XE/DRIVER'S LICENSE
                                </p>
                                <p>
                                    Số/NO: Đang cập nhất
                                </p>

                            </div>

                            <div>

                                <div>
                                    <p>Họ tên:</p>
                                    <p>{this.state.fullname}</p>
                                </div>

                                <div>
                                    <p>Ngày sinh:</p>
                                    <p>{new Date(this.state.birthday).toLocaleDateString()}</p>
                                </div>

                                <div>
                                    <p>Quốc tịch:</p>
                                    <p>Việt Nam</p>
                                </div>

                                <div>
                                    <p>Nơi cư trú:</p>
                                    <p>Đang cập nhật</p>
                                </div>

                            </div>
                            

                        </LicenseUserInfo>  

                    </div>

                    <div>

                        <div>

                            <div>
                                <p>Hạng: A1</p>
                            </div>

                            <div>
                                <p>Giá trị: <b>Không giới hạn</b></p>
                            </div>

                        </div>

                        <div>

                            <div>

                                <p>
                                    Hà Nội, Ngày {
                                    `${parseInt(new Date().getDate()/10)}${new Date().getDate()%10}`
                                    } Tháng {
                                    `${parseInt((new Date().getMonth()+1)/10)}${(new Date().getMonth()+1)%10}`
                                    } Năm {
                                    new Date().getFullYear()
                                    }                                        
                                </p>

                            </div>

                        </div>

                    </div>                        

                </LicenseContent>

            </LicenseMainDiv>

        )
    }
}