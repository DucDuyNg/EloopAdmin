const {charity,findCharity,addCharity,removeCharity,getCharityList} = require('../models/charity')

exports.getListCharity = async (req,res,next) =>{

    const charityList = await getCharityList();
    console.log(charityList.length);

    res.render('users/charity', {charityList : charityList})
}


