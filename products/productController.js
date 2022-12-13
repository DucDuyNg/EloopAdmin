const {product,findProduct,addProduct,removeProduct,getProductList,findRelativeProduct,getPriceList} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')
exports.getListProductQueryParam = async (req,res,next) =>{
    const partnerId = req.query.partner
    console.log(req.query.partner);

    const catalogue = req.query.catalogue
    console.log(req.query.catalogue);

    const price = req.query.price
    console.log(req.query.price);

    const sorting = req.query.sorting
    console.log(req.query.sorting);
    
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    const productList = await getProductList(partnerId,catalogue,price,sorting);
    const priceList = await getPriceList();
    console.log(productList.length);
    productList.forEach(element => {
       console.log(element.productName);  
    });
    res.render('admins/product', {productList : productList, partnerList : partnerList,catalogueList :catalogueList,priceList :priceList})
}
exports.getListProduct = async (req,res,next) =>{
    const partnerId = ""
    console.log(req.query.partner);

    const catalogue = ""
    console.log(req.query.catalogue);

    const price = ""
    console.log(req.query.price);

    const sorting = ""
    console.log(req.query.sorting);
    
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    const priceList = await getPriceList();
    const productList = await getProductList(partnerId,catalogue,price,sorting);
   
    res.render('admins/product', {productList , partnerList ,catalogueList, priceList})
}

exports.getProductDetail = async (req,res,next) =>{
    const productId = req.params.id
    if(productId !== undefined){
        const product = await findProduct(productId);
        console.log("............................................")
        const relativeProductList = await findRelativeProduct(productId);
        res.render('admins/detail',{product:product,relativeProductList:relativeProductList})
    }
    res.render('admins/detail')
}