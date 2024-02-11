export const  getPayments=async(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            status:200,
            data : {}
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status:500,
            message:error.message
        })
    }
}

export const  createPayment=async(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            status:200,
            data : {}
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status:500,
            message:error.message
        })
    }
}

export const  updatePayment=async(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            status:200,
            data : {}
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status:500,
            message:error.message
        })
    }
}

export const  deletePayment=async(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            status:200,
            data : {}
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status:500,
            message:error.message
        })
    }
}