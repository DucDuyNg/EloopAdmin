const {product,findProduct,findProductById,addProduct,removeProduct,getProductList,findRelativeProduct, updateProduct,getPriceList} = require('../models/product')
const {partner,findPartner,findPartnerIdByName,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,findCatalogueIdByName,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')

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
    if(productName === ' ' || price === ' ' || image === ' '){
        res.render('admins/add-product', {error: 'Please fill out the information completely!',partnerList,catalogueList})
    }
    else if (existProduct !== null) {
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

    const partnerList = await getPartnerList();
    const catalogueList = await getCatalogueList();


    const product = await findProductById(productId);

    res.render('admins/update-product',{product:product[0], catalogueList:catalogueList,partnerList:partnerList})
}

exports.updateProduct = async (req,res, next) =>{
    console.log("updateproduct");
    const productId = req.body.id
    const productName = req.body.product_name
    const partnerId = req.body.id_partner
    const description = req.body.description
    const catalogueId = req.body.name_catagory
    const CreationTime = req.body.expire_date
    const status = req.body.status
    const price = req.body.price
    const imageProduct = req.body.upload_image ? undefined : ""
    //const imageProduct = '/images/D.jpg'
    console.log(status,
        productName,partnerId ,
        description, 
        catalogueId ,
        CreationTime, price, imageProduct
    )

    const catalogue = ""
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);

    if(productName === ' ' || price === ' ' || imageProduct === ' '){
        //res.render('admins/update-product/:productId', {error: 'Please fill out the information completely!',partnerList,catalogueList})
        //res.redirect('back', {error: 'Please fill out the information completely!',partnerList,catalogueList})
        res.redirect('../update-product/' + productId);
    }
   
    else{
        console.log('......................h2');
        const product = await findProductById(productId)
        const productUpdate = await updateProduct(imageProduct, productName, price,description,CreationTime,partnerId,catalogueId);
        console.log(product)
        res.redirect('back')
    }

    //const productUpdate = await updateProduct(imageProduct, productName, price,description,CreationTime,partnerId,catalogueId,productId);
   
  
}

exports.removeProduct = async (req,res,next) =>{
    const productId = req.params.id
    console.log("Product ID:")
    console.log(productId)
    
    
    if(productId !== undefined){
       
        console.log("............................................")
        await removeProduct(productId);
        
        
        res.redirect('/product')
    }
}


exports.getListProductQueryParam = async (req,res,next) =>{
    console.log(req.query);
    const partnerId = req.query.partner
    const catalogue = req.query.catalogue
    const price = req.query.price
    const sorting = req.query.sorting
    const page = req.query.page || 1
    console.log(req.params);

    const defaultItemEachPage = 5

    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    let productList = await getProductList(partnerId,catalogue,price,sorting);

   
    const pageCount = Math.ceil(productList.length /defaultItemEachPage)
    console.log(pageCount);
   
    const rightRange = defaultItemEachPage * parseInt(page)
    const leftRange = rightRange - defaultItemEachPage

    productList = productList.slice(leftRange,rightRange)

    const priceList = await getPriceList();

    res.render('admins/product', {productList : productList, 
                            partnerList : partnerList,
                            catalogueList :catalogueList,
                            priceList :priceList, 
                            pagination: {
                                page: page ,
                                pageCount: pageCount
                              }
                            })
}


exports.getProductDetail = async (req,res,next) =>{
    const productId = req.params.id
    if(productId !== undefined){
        const product = await findProduct(productId);
        const relativeProductList = await findRelativeProduct(productId);
        res.render('users/detail',{product:product,relativeProductList:relativeProductList})
    }
    res.render('admins/detail')
}