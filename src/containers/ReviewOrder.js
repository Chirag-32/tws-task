import { useSelector } from "react-redux"

const ReviewOrder = () =>{
    const data = useSelector((state) => state)
    const{product,customerInfo} = data
    const { title, price, category, description } = product;
    const{email, first_name,last_name} = customerInfo.customerInfo
    
    return (
        <div className="ui container">
            {Object.keys(product).length === 0 ? (
        <div>No Product Added, Please add a Product</div>
      ) : (
        <>
            <div className='ui placeholder segment'>
            <div className='ui two column stackable center aligned'>
              <div className='middle aligned row'>
                <div className='column rp'>
                  <h1><span>Product Name:   </span> {title}</h1>
                  <h2>
                    <span>Product Price:   </span>
                    <a className='ui teal tag label'>${price}</a>
                  </h2>
                  <h3 className='ui brown block header'>{category}</h3>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='ui placeholder segment'>
                <h2>Customer Information</h2>
            <div className='ui stackable center aligned'>
              <div className='middle aligned row'>
                <div className='column rp'>
                  <h2><span>Customer Email:   </span> {email}</h2>
                  <h2>
                    <span>Customer Full-Name:   </span>
                    <a className='ui label'>{first_name + " " + last_name}</a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
        )}
        </div>
    )
}

export default ReviewOrder