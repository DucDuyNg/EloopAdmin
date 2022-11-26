const {recycle,findRecycle,addRecycle,removeRecycle,getRecycleList} = require('../models/recycle')

exports.getListRecycle = async (req,res,next) =>{

    const recycleList = await getRecycleList();
    console.log(recycleList.length);

    res.render('users/recycle', {recycleList : recycleList})
}


