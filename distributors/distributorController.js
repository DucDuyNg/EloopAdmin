const {distributor,findDistributor,addDistributor,removeDistributor,getDistributorList} = require('../models/distributor')

exports.getListDistributor = async (req,res,next) =>{

    // const DistributorList = await getDistributorList();
    // console.log(distributorList.length);

    res.render('admins/distributor')
}


