import React from "react";
import { 
    OverViewContent, 
} from "./Overview_Styled";

export class Overview extends React.Component {

    constructor(props) {

        super(props);
        this.state = {}
        this.updateChanges = this.updateChanges.bind(this);
    }

    componentDidMount() {
        this.setState({
            title : this.props.title,
            data : this.props.data,
            unit : this.props.unit,
            color: this.props.color
        })
    }

    componentDidUpdate() {

        if(this.state.data !== this.props.data) {
            this.updateChanges();            
        }

    }

    updateChanges = () => {

        this.setState({
            title : this.props.title,
            data : this.props.data,
            unit : this.props.unit,
            color: this.props.color
        })

    }   

    render() {

        return(

            <OverViewContent style={{
                backgroundColor: `var(${this.state.color})`
            }}>

                <div style={{
                        height: "30%",
                        alignItems: "center"
                    }}>
                    
                    <p style={{
                        fontSize: "1.6vh",
                        fontWeight: "bold"
                    }}>{this.state.title}</p>

                </div>

                <div style={{
                        height: "70%",
                        alignItems: "flex-end"
                    }}>

                    <p style={{
                        fontSize: "2vh"
                    }}><b>{this.state.data}</b> {this.state.unit}</p>

                </div>

            </OverViewContent>

        )

    }

}