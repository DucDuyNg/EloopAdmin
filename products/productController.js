const {product,findProduct,addProduct,removeProduct,getProductList,findRelativeProduct} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')
exports.getListProductQueryParam = async (req,res,next) =>{
    const partnerId = req.query.partner
    console.log(req.query.partner);

    const catalogue = req.query.catalogue
    console.log(req.query.catalogue);

    const price = req.query.price
    console.log(req.query.price);
    
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    const productList = await getProductList(partnerId,catalogue,price);
    console.log(productList.length);
    productList.forEach(element => {
       console.log(element.name);  
    });
    res.render('users/menu', {productList : productList, partnerList : partnerList,catalogueList :catalogueList})
}
exports.getListProduct = async (req,res,next) =>{
    const partnerId = ""
    console.log(req.query.partner);

    const catalogue = ""
    console.log(req.query.catalogue);

    const price = ""
    console.log(req.query.price);
    
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    const productList = await getProductList(partnerId,catalogue,price);
    console.log(productList.length);
    res.render('users/menu', {productList : productList, partnerList : partnerList,catalogueList :catalogueList})
}

exports.getProductDetail = async (req,res,next) =>{
    const productId = req.params.id
    
    if(productId !== undefined){
        const product = await findProduct(productId);
        const relativeProductList = await findRelativeProduct(productId);
        res.render('users/detail',{product:product,relativeProductList:relativeProductList})
    }

    res.render('users/detail')
}