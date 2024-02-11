import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        businesses : [],
        currentBusiness : {},
        books: [],
        currentBooks : [],
        currentBook: {},
        book: {},
        entries: [],
        random : 0
    },
    reducers: {
        refresh: (state, action) => {
            state.random = Math.random() * 0.52
        },
        addBusinesses: (state, action) => {
            state.businesses = action.payload
        },
        addCurrentBusiness: (state, action) => {
            state.currentBusiness = action.payload
        },
        addBusiness: (state, action) => {
            state.businesses = [action.payload, ...state.businesses]
        },
        addBooks: (state, action) => {
            state.books = action.payload
        },
        addCurrentBooks: (state, action) => {
            state.currentBooks = action.payload
        },
        reAddCurrentBooks: (state, action) => {
            
            const findBooks = state.books.filter(book=>book.business !== action.payload.id)

            state.books = [...findBooks,...action.payload.data]
        },
        addCurrentBook: (state, action) => {
            state.currentBook = action.payload
        },
        addBook: (state, action) => {
            state.books = [action.payload, ...state.books]
        },
        removeBook: (state, action) => {
            state.books = state.books.filter(book => book._id != action.payload)
            state.currentBook = {}
        },
        renameBook: (state, action) => {
            console.log(action.payload)
            state.books = state.books.map(book => book._id === action.payload._id ? action.payload : book)
        },
        addEntries: (state, action) => {
            state.entries = action.payload

        },
        addEntry: (state, action) => {
            const entries = [action.payload, ...state.currentBook.entries]
            state.currentBook = { ...state.currentBook, entries }
        },
        removeEntry: (state, action) => {
            const entries = state.currentBook.entries.filter(entry => entry._id !== action.payload)
            state.currentBook = { ...state.currentBook, entries }
        },
        updatePrevEntry: (state, action) => {
            const findEntries = state.currentBook.entries.filter(entry => entry._id !== action.payload._id)
            const entries = [action.payload, ...findEntries]
            state.currentBook = { ...state.currentBook, entries }
        },
        logoutReset: (state, action) => {
            state.books = []
            state.currentBook = {}
            state.book = {}
            state.entries = []
        }

    }
})
export const {refresh,addBusinesses,addCurrentBusiness,addBusiness, addBooks,addCurrentBooks,reAddCurrentBooks, addCurrentBook, addBook, removeBook, renameBook, addEntries, addEntry, removeEntry, updatePrevEntry, logoutReset } = bookSlice.actions
export default bookSlice.reducer