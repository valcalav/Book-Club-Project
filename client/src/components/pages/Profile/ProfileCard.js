import { Card } from 'react-bootstrap'

// import { Link } from 'react-router-dom'

function ProfileCard({ userInfo, firstName, lastName, profileImg }) {

    return (
        
            <Card className="clubs-card">
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                    <h5>{firstName} {lastName} </h5>
                    <h6>{userInfo.username}</h6>
                    <p>Email: {userInfo.email} </p>              

                    {/* <ButtonGroup size="sm" style={{ width: '100%' }}>
                        <Link to='#' className="btn btn-dark">Edit</Link>
                    </ButtonGroup> */}

                </Card.Body>
            </Card>
    )
}

export default ProfileCard