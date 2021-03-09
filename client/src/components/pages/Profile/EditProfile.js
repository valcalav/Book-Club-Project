import React, { useEffect, useState } from 'react'
import { AllCountries } from '../../shared/AllCountries'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import { GenresArr } from '../../shared/AllGenres'
import { Link } from 'react-router-dom'


import ReaderService from '../../../service/reader.service'


function EditProfile(props) {

    const { loggedUser } = props

    const readerService = new ReaderService()

    const [myInfo, setMyInfo] = useState({
        firstName:'',
        lastName:'',
        favoriteGenre:'',
        profileImg:'',
        country:''
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        setMyInfo({...myInfo,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            profileImg: loggedUser.profileImg
        })
    }, [])

    function handleSubmit() {
        const reader_id = props.match.params._id
        readerService.editProfile(reader_id, myInfo)
            .then(() => {
                props.history.push('/profile')
                console.log('profile edited')
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            <Container>
            <h5>Edit profile</h5>

            <Form onSubmit={e => handleSubmit(e)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" name="firstName" value={myInfo.firstName} onChange={(e) => setMyInfo({...myInfo, firstName: e.target.value})} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" name="lastName" value={myInfo.lastName} onChange={(e) => setMyInfo({...myInfo, lastName: e.target.value})} />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group>
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="text" placeholder="Link here..." name="profileImg" value={myInfo.profileImg} onChange={(e) => setMyInfo({...myInfo, profileImg: e.target.value})} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select" name="country" value={myInfo.country} onChange={(e) => setMyInfo({...myInfo, country: e.target.value})}>
                        {AllCountries.map((country, idx) => <option key={idx} >{country}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Favorite genre</Form.Label>
                    <Form.Control as="select" name="favoriteGenre" value={myInfo.favoriteGenre} onChange={(e) => setMyInfo({...myInfo, favoriteGenre: e.target.value})}>
                        {GenresArr.map((elm, idx) => <option key={idx} >{elm}</option>)}
                    </Form.Control>
                </Form.Group>

                {
                    error && <span>Not able to create meeting</span>
                }

                <Button block variant="dark" type="submit">Edit</Button>
            </Form>
            
            <Link to='/profile' className="btn btn-dark">Go back</Link>

        </Container>
        </div>
    )
}

export default EditProfile