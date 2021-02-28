const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    bookClubName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ["fantasy", "science fiction", "dystopian", "action and adventure", "mystery", "horror", "thriller and suspense", "historical fiction", "romance", "womens fiction", "LGBTQ+", "classics", "contemporary fiction", "plays and screenplays", "poetry", "literary fiction", "magical realism", "comics and graphic novels", "short story", "young adult", "new adult", "childrens literature", "memoir and autobiography", "biography", "food and drink", "art and photography", "self-help", "history", "travel", "true crime", "humor", "essays", "guide how-to", "religion and spirituality", "humanities and social sciences", "parenting and families", "science and technology"],
        required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    duration: {
        type: String,
        enum: ["4 weeks", "5 weeks", "6 weeks", "7 weeks", "8 weeks", "3 months", "6 months"],
        required: true
    },
    meetings: {
        type: String,
        enum: ["once a week", "twice a week", "every two weeks", "once a month"],
        required: true
    },
    language: {
        type: String,
        enum: ["english", "spanish"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event