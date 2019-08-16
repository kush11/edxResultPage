import React, { Component } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './App.css';
import { ExcelRenderer } from 'react-excel-renderer';

class userData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: ''
        }
    }

    componentDidMount() {
        // axios.get(`${process.env.LOCAL_SERVER}/user_name_withGrade`)
        axios.get('http://localhost:4000/user_name_withGrade')
            .then((response) => {
                console.log(response);
                this.setState({ userData: response.data.userDataArray });
            })
            .catch((error) => {
                console.log(error);
            })

    }
    fileHandler = (event) => {
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(resp);
                var localArray = resp.rows;
                
                // axios
                //     .post("http://localhost:4000/insertUserData", resp.rows)
                //     .then((res) => {
                //         console.log("data has been sent", res)
                //     })
                //     .catch((err) => {
                //         console.log("Error", err);
                //     });
                fetch('http://localhost:4000/insertUserData', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resp.rows)
                });
                // this.setState({
                //   cols: resp.cols,
                //   rows: resp.rows
                // });
            }
        });

    }

    render() {
        const { userData } = this.state;
        if (userData !== '') {
            return (
                <div>
                    <h3>User Result Data</h3>
                    <div className="DownloadExcel">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-excel"
                            filename="userResult"
                            sheet="sheet 1"
                            buttonText="Download Excel" />
                    </div>

                    <input type="file"
                        onChange={this.fileHandler.bind(this)}
                        style={{ "padding": "10px" }}
                    />

                    <table className="table table-striped row-md-12" id="table-to-excel" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>COURSE_NAME</th>
                                <th>MARKS</th>
                                <th>CODE SCORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((data) => (
                                <tr>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.moduleName}</td>
                                    <td>{data.marks}</td>
                                    <td>{data.codeScore}</td>
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
                            <th>CODE SCORE</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
export default userData;