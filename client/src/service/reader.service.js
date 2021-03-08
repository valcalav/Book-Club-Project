import axios from 'axios'

class ReaderService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/reader`,
            withCredentials: true
        })
    }

    joinBookClub = bookClub_id => this.api.put(`/joinBookClub/${bookClub_id}`)

    leaveBookClub = bookClub_id => this.api.put(`/leaveBookClub/${bookClub_id}`)

    editProfile = userData => this.api.put('/edit-profile', userData)

}

export default ReaderService