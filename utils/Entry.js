class Entry{
    constructor(entries){
        this.entries = entries
    }

    cashIn(){
        return this.entries
        .filter(entry=> entry.entryType === 'cash_in')
        .reduce((acc,cur)=> acc + cur.amount,0)
    }

    cashOut(){
        return this.entries
        .filter(entry=> entry.entryType === 'cash_out')
        .reduce((acc,cur)=> acc + cur.amount,0)
    }

    balance(){
        return this.cashIn() - this.cashOut()
    }

    generatedEntry(){
        let stock = 0
        const newEntries = []
        this.entries.forEach(entry=>{
            stock = entry.entryType === 'cash_in' ? stock + entry.amount : stock - entry.amount
            newEntries.unshift({
                ...entry,
                stock : stock
            })
            console.log(stock)
        })
        return newEntries
    }
}

export default Entry