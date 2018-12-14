export interface Product extends Array<Product>{
    id: number;
    name: string;
    price: string;
    availablilty: string;
    forsale: string;
    description: string;
    imageurl: string;
    default_image_id: number;
    link: string;
}
