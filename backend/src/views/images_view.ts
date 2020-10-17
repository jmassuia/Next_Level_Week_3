import Image from '../models/Images';

export default{
    render(image: Image){
        return(
            {
                id: image.id,
                url: `http://localhost:8888/uploads/${image.path}`
            }
        ) 
    },
    renderMany(images: Image[]){
        return images.map(images => this.render(images))
    }
}