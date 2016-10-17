import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Panel,Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        age:"",
        gender: "",
        pnumber:"",
        email:"",
        rating: "",
        comment:"",
        movies: [],
        records:[],

        show: false,
        selectedName: "",
        selectedAge: "",
        selectedGender: "",
        selectedPnumber: "",
        selectedEmail: "",
        selectedRating: "",
        selectedMovies: [],
        selectedComment: "",
        seledtedId: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

   modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    }; 

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };


    submit = ()=> {

        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });
            location.reload();

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        rating: data.rating
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedAge: data.age,
                        selectedGender: data.gender,
                        selectedPnumber: data.pnumber,
                        selectedEmail: data.email,
                        selectedRating: data.rating,
                        selectedMovies: data.movies,
                        selectedComment: data.comment,
                        selectedId: data.id
                    })

                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectName,
                        age: this.state.selectedAge,
                        gender: this.state.selectedGender,
                        pnumber: this.state.selectedPnumber,
                        email: this.state.selectedEmail,
                        rating: this.state.selectedRating,
                        movies: this.state.selectedMovies,
                        comment: this.state.selectedComment,};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show:false,
                selectedName: "",
                selectedAge: "",
                selectedGender: "",
                selectedPnumber: "",
                selectedEmail: "",
                selectedRating: "",
                selectedMovies: [],
                selectedComment: "",
                seledtedId: ""
            });
        }
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteItem(item.id)}>Delete</Button><br/><br/>
                     <Button  bsSize="xsmall" bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
                     <td>{item.id}</td>
                     <td className="textfieldareaName">{item.name}</td>
                     <td>{item.age}</td>
                     <td>{item.gender}</td>
                     <td className="textfieldareaName">{item.pnumber}</td>
                     <td className="textfieldareaName">{item.email}</td>
                     <td>{item.rating}</td>
                     <td className="textfieldarea">{item.comment}</td>
                     <td>{
                         item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                </tr>
            );
        });

let close = () => this.setState({ show: false })

        return (
            <div className="container">
            <h1> {this.state.try} </h1>
                <div className="page-header">
                    <div className="jumbotronTop"><p><h1>The Lake-Side Hotel</h1></p>
                    <p><h3>Customer Survey</h3></p></div> <br/>
                    <p> <h3>Help us to improve our services:</h3></p>
                </div>
                <div className="jumbotron">
                
                <p><b>About Yourself</b></p>
                    
                            
                                <Form><Panel>
                                    <FormGroup>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"                                            
                                            placeholder="ex. Juan dela Cruz"
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        <HelpBlock>What's your name?</HelpBlock>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Age</ControlLabel>
                                        <FormControl
                                            type="number"  
                                            max="3"  
                                            placeholder="0"
                                            value={this.state.age}
                                            onChange={this.onChange('age')}
                                            />
                                        <HelpBlock>How old are you?</HelpBlock>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="M"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="F"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup></Panel>
               

                                    <p><b>Contact Information</b></p>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>Mobile/Phone No.</ControlLabel>
                                        <FormControl
                                            type="number"    
                                            placeholder="* * * * * * * * * * *"
                                            value={this.state.pnumber}
                                            onChange={this.onChange('pnumber')}
                                            />
                                        <HelpBlock>*Optional data</HelpBlock>
                                    
                                        <ControlLabel>Email Address</ControlLabel>
                                        <FormControl
                                            type="text"    
                                            placeholder="someone@mail.com"
                                            value={this.state.email}
                                            onChange={this.onChange('email')}
                                            />
                                        <HelpBlock>*Optional data</HelpBlock>
                                    </FormGroup></Panel>

                                    <p><b>About your concerns</b></p>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>Please rate us by our services:</ControlLabel>
                                        <FormControl componentClass="select"                                                     
                                                     value={this.state.rating}
                                                     onChange={this.onChange('rating')}
                                            >
                                            <option selected disabled></option>
                                            <option value="⭐️">⭐️1-Poor</option>
                                            <option value="⭐️⭐️">⭐️⭐️2-Fair</option>
                                            <option value="⭐️⭐️⭐️">⭐️⭐️⭐️3-Good</option>
                                            <option value="⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️4-Very Good</option>
                                            <option value="⭐️⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️⭐️5-Excellent</option>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Comments</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Feel free to express . . ."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('comment')}
                                            cols = "70"
                                            rows = "7"      
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>What service/s are you satisfied? </ControlLabel>
                                        <HelpBlock>You can pick one or more than one</HelpBlock>
                                        <Checkbox value="Accomodation 🏢"
                                                  checked={this.state.movies.indexOf('Accomodation 🏢')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Accomodation 🏢 
                                        </Checkbox>
                                        <Checkbox value="Foods & Beverages 🍽🍹"
                                                  checked={this.state.movies.indexOf('Foods & Beverages 🍽🍹')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Foods & Beverages 🍽🍹
                                        </Checkbox>
                                        <Checkbox value="House Keeping 🛠"
                                                  checked={this.state.movies.indexOf('House Keeping 🛠')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            House Keeping 🛠
                                        </Checkbox>
                                        <Checkbox value="Laundry Services 👕"
                                                  checked={this.state.movies.indexOf('Laundry Services 👕')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Laundry Services 👕
                                        </Checkbox>
                                        <HelpBlock>--------If None-------</HelpBlock>
                                        <Checkbox value="NONE ❌"
                                                  checked={this.state.movies.indexOf('NONE ❌')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            NONE ❌
                                        </Checkbox>
                                    </FormGroup></Panel>

                                    
                                    <ButtonGroup>

                                        <Button bsStyle="primary" bsSize="large" onClick={this.submit}>Submit</Button>

                                    </ButtonGroup>
                                </Form>
                           
                               
                            
                      

                </div>

                <div className="page-header">
                    <p> <h3>Data stored:</h3></p>
                </div>    
                        <div className="jumbotron">
                <Panel>
                 <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Contact Number</th>
                                        <th>Email</th>
                                        <th>Rating</th>
                                        <th>Comment</th>
                                        <th>Satisfied service/s</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                    </Panel>            
            </div>

            
<div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form><Panel>
                                    <FormGroup>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"                                            
                                            placeholder="ex. Juan dela Cruz"
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                        <HelpBlock>What's your name?</HelpBlock>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Age</ControlLabel>
                                        <FormControl
                                            type="number"  
                                            max="3"  
                                            placeholder="0"
                                            value={this.state.selectedAge}
                                            onChange={this.modalonChange('selectedAge')}
                                            />
                                        <HelpBlock>How old are you?</HelpBlock>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="selectedGender" value="M"
                                               onChange={this.onChange('selectedGender')}>Male</Radio>
                                        <Radio name="selectedGender" value="F"
                                               onChange={this.modalonChange('selectedGender')}>Female</Radio>
                                    </FormGroup></Panel>
               

                                    <p><b>Contact Information</b></p>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>Mobile/Phone No.</ControlLabel>
                                        <FormControl
                                            type="number"    
                                            placeholder="* * * * * * * * * * *"
                                            value={this.state.selectedPnumber}
                                            onChange={this.modalonChange('selectedPnumber')}
                                            />
                                        <HelpBlock>*Optional data</HelpBlock>
                                    
                                        <ControlLabel>Email Address</ControlLabel>
                                        <FormControl
                                            type="text"    
                                            placeholder="someone@mail.com"
                                            value={this.state.selectedEmail}
                                            onChange={this.modalonChange('selectedEmail')}
                                            />
                                        <HelpBlock>*Optional data</HelpBlock>
                                    </FormGroup></Panel>

                                    <p><b>About your concerns</b></p>
                                    <Panel>
                                    <FormGroup>
                                        <ControlLabel>Please rate us by our services:</ControlLabel>
                                        <FormControl componentClass="select"                                                     
                                                     value={this.state.selectedRating}
                                                     onChange={this.modalonChange('selectedRating')}
                                            >
                                            <option selected disabled></option>
                                            <option value="⭐️">⭐️1-Poor</option>
                                            <option value="⭐️⭐️">⭐️⭐️2-Fair</option>
                                            <option value="⭐️⭐️⭐️">⭐️⭐️⭐️3-Good</option>
                                            <option value="⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️4-Very Good</option>
                                            <option value="⭐️⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️⭐️5-Excellent</option>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Comments</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Feel free to express . . ."
                                            value={this.state.selectedComment}
                                            onChange={this.modalonChange('selectedComment')}
                                            cols = "70"
                                            rows = "7"      
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>What service/s are you satisfied? </ControlLabel>
                                        <HelpBlock>You can pick one or more than one</HelpBlock>
                                        <Checkbox value="Accomodation 🏢"
                                                  checked={this.state.selectedMovies.indexOf('Accomodation 🏢')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Accomodation 🏢 
                                        </Checkbox>
                                        <Checkbox value="Foods & Beverages 🍽🍹"
                                                  checked={this.state.selectedMovies.indexOf('Foods & Beverages 🍽🍹')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Foods & Beverages 🍽🍹
                                        </Checkbox>
                                        <Checkbox value="House Keeping 🛠"
                                                  checked={this.state.selectedMovies.indexOf('House Keeping 🛠')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            House Keeping 🛠
                                        </Checkbox>
                                        <Checkbox value="Laundry Services 👕"
                                                  checked={this.state.selectedMovies.indexOf('Laundry Services 👕')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Laundry Services 👕
                                        </Checkbox>
                                        <HelpBlock>--------If None-------</HelpBlock>
                                        <Checkbox value="NONE ❌"
                                                  checked={this.state.selectedMovies.indexOf('NONE ❌')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            NONE ❌
                                        </Checkbox>
                                    </FormGroup></Panel>

                                    
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Survey</Button>

                                    </ButtonGroup>
                                </Form>
                        </Modal.Body>
            </Modal>
    </div>
 </div>


        );
    }
}

export default App;
