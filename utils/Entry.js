class Entry{
    constructor(entries){
        this.entries = [
            {
                amount : 10,
                entryType : 'CashIn'
            },
            {
                amount : 10,
                entryType : 'CashOut'
            },
            {
                amount : 10,
                entryType : 'CashIn'
            },
            {
                amount : 10,
                entryType : 'CashOut'
            }
        ]
    }

    cashIn(){
        return this.entries
        .filter(entry=> entry.entryType === 'CashIn')
        .reduce((acc,cur)=> acc + cur.amount,0)
    }

    cashOut(){
        return this.entries
        .filter(entry=> entry.entryType === 'CashOut')
        .reduce((acc,cur)=> acc + cur.amount,0)
    }

    balance(){
        return this.cashIn() - this.cashOut()
    }

    generatedEntry(){
        let stock = 0
        const newEntries = []

        this.entries.forEach(entry=>{
            stock = entry.entryType === 'CashIn' ? stock + entry.amount : stock - entry.amount
            newEntries.push({
                ...entry,
                stock : stock
            })
        })
        return newEntries
    }
}

export default Entry