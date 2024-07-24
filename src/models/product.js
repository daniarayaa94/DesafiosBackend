class Product{
    constructor(id,{title,description,code,price,stock,category,thumbnails}){

        this.validateFields({ title, description, code, price, stock, category, thumbnails });

        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = parseInt(price)
        this.status = true
        this.stock = parseInt(stock)
        this.category = category
        this.thumbnails = thumbnails

        
    }

    validateFields(data) {
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === '');

        if (missingFields.length > 0) {
            throw new Error(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
        }
    }


}

export default Product;
