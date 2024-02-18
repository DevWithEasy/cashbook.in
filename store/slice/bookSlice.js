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
        ccp : [],
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
        updateBusiness: (state, action) => {
            state.businesses = state.businesses.map(business => business._id === action.payload._id ? action.payload : business)
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
            state.books = state.books.map(book => book._id === action.payload._id ? action.payload : book)
        },
        addEntries: (state, action) => {
            state.entries = action.payload
        },
        addEntry: (state, action) => {
            state.entries = [...state.entries,action.payload]
        },
        removeEntry: (state, action) => {
            state.entries = state.entries.filter(entry => entry._id != action.payload)
        },
        updatePrevEntry: (state, action) => {
            state.entries = state.entries.map(entry => entry._id === action.payload._id ? action.payload : entry)
        },
        addCCPs: (state, action) => {
            state.ccp = action.payload
        },
        addCCP: (state, action) => {
            const entries = [action.payload, ...state.ccp]
            state.ccp = entries
        },
        removeCCP: (state, action) => {
            state.ccp = state.ccp.filter(c => c._id != action.payload)
        },
        updateCCP: (state, action) => {
            state.ccp = state.ccp.map(c => c._id === action.payload._id ? action.payload : c)
        },
        logoutReset: (state, action) => {
            state.books = []
            state.currentBook = {}
            state.book = {}
            state.entries = []
        }

    }
})
export const {refresh,addBusinesses,addCurrentBusiness,addBusiness,updateBusiness, addBooks,addCurrentBooks,reAddCurrentBooks, addCurrentBook, addBook, removeBook, renameBook, addEntries, addEntry, removeEntry, updatePrevEntry,addCCPs,addCCP,updateCCP,removeCCP, logoutReset } = bookSlice.actions
export default bookSlice.reducer