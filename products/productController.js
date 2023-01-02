const {product,findProduct,findProductById,addProduct,removeProduct,getProductList,findRelativeProduct, updateProduct,getPriceList} = require('../models/product')
const {partner,findPartner,findPartnerIdByName,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,findCatalogueIdByName,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')

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

    const catalogue = ""
    //console.log(req.query.catalogue);
    const catalogueList = await getCatalogueList(catalogue);
    if(productId !== undefined){
        const product = await findProduct(productId);
        console.log("............................................")
        const relativeProductList = await findRelativeProduct(productId);
        res.render('admins/detail',{product:product,relativeProductList:relativeProductList, catalogueList})
    }
    res.render('admins/detail')
}

exports.showAddProduct = async(req, res, next) => {
    const partnerId = ""
    console.log(req.query.partner);

    const catalogue = ""
    console.log(req.query.catalogue);

    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);

    res.render('admins/add-product',{partnerList,catalogueList});
}



exports.addNewProduct = async (req,res, next) =>{
    const productName = req.body.product_name

    const partner_name = req.body.name_partner
    //console.log(partner)
    const partnerId = await findPartnerIdByName(partner_name)

    const description = req.body.description


    const catagory = req.body.name_catagory
    //console.log(catagory)
    const catalogueId = await findCatalogueIdByName(catagory)
    

    const CreationTime = req.body.expire_date
    const price = req.body.price
    const imageProduct = req.body.image
    //const imageProduct = '/images/D.jpg'
    console.log(productName,partnerId ,
        description, 
        catalogueId ,
        CreationTime, price, imageProduct
    )
    
    const partner = ""
    const partnerList = await getPartnerList(partner_name);

    const catalogue = ""
    //console.log(req.query.catalogue);
    const catalogueList = await getCatalogueList(catalogue);
    const existProduct = await findProduct(productName)
    if (existProduct !== null) {
        console.log('Product is exist!')
        res.render('admins/add-product', { error: 'Product is exist!',partnerList,catalogueList });
        return;
    }


    // const catalogueList = await getCatalogueList(catalogue);
    // const partnerList = await getPartnerList(partnerId);
    const productList = await addProduct(imageProduct, productName, price,description,CreationTime,partnerId,catalogueId);
    
    res.render('admins/add-product',{productList,catalogueList}) 

}

exports.showUpdateProduct = async(req, res, next) => {
    console.log(".....................")

    const productId = req.params.id
    console.log(productId)

    const partnerId = ""
    console.log(req.query.partner);

    const catalogue = ""
    console.log(req.query.catalogue);

    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);

    if(productId !== undefined){
        const product = await findProductById(productId);
       
        res.render('admins/update-product',{product, catalogueList,partnerList})
    }

    //res.render('admins/update-product',{catalogueList});
}

exports.updateProduct = async (req,res, next) =>{
    const productName = req.body.product_name
    const partnerId = req.body.id_partner
    const description = req.body.description
    const catalogueId = req.body.name_catagory
    const CreationTime = req.body.expire_date
    const price = req.body.price
    const imageProduct = req.body.upload_image
    //const imageProduct = '/images/D.jpg'
    console.log(productName,partnerId ,
        description, 
        catalogueId ,
        CreationTime, price, imageProduct
    )

    const catalogue = ""
    //console.log(req.query.catalogue);
    const catalogueList = await getCatalogueList(catalogue);
    const existProduct = await findProduct(productName)
    if (existProduct !== null) {
        //console.log('Product is exist!')
        res.render('/admins/update-product', { error: 'Product is exist!',catalogueList });
        return;
    }


    // const catalogueList = await getCatalogueList(catalogue);
    // const partnerList = await getPartnerList(partnerId);
    const productList = await updateProduct(imageProduct, productName, price,description,CreationTime,partnerId,catalogueId);
    
    res.render('/admins/add-product',{productList,catalogueList}) 

}

exports.removeProduct = async (req,res,next) =>{
    const productId = req.params.id
    console.log("Product ID:")
    console.log(productId)
    
    
    if(productId !== undefined){
       
        console.log("............................................")
        await removeProduct(productId);
        
        
        res.render('admins/product')
    }
    //res.render('admins/product')
}