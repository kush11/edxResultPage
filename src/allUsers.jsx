import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class allUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: ''
        }
    }

    componentDidMount() {
        // axios.get(`${process.env.LOCAL_SERVER}/user_name_withGrade`)
        axios.get('http://localhost:4000/allUsers')
            .then((response) => {
                console.log(response);
                this.setState({ userData: response.data.result });
            })
            .catch((error) => {
                console.log(error);
            })

    }    

    render() {        
        const { userData } = this.state;        
        if(userData !== ''){
            return (
                <div>
                    <h3>UserData</h3>   
                    <table className="table table-striped row-md-12" id="table-to-excel" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((data) => (
                                <tr>
                                    <td>{(data.username)}</td>
                                    <td>{data.email}</td>                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )
        }
        return (
            <div className="" style={{}}>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>COURSE_NAME</th>
                            <th>MARKS</th>
                        </tr>
                    </thead>                   
                </table>
            </div>
        )                
    }
}
export default allUsers;