import '../../CSS/PRODUCTPAGE/Initial.css'
import Header from '../../HOME/Header'
import useFindData from '../../CUSTOMHOOK/useFindData'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../ADMIN/Data'
import addCart from '../../REUSEDFUCNTION/addCart'

const Iphone = () => {
  const {mobiles} = useFindData();
  const [iphone, setIphone] = useState([]);

  const productNavigate = useNavigate();

  useEffect(()=> {
    const filterData = mobiles.filter((items) => items.productBrand == "iphone")
    setIphone(filterData)
  }, [mobiles])

  const handleCart = (items) => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      addCart(authUser,items)
    })
    return () => unsubscribe()
  }

  return (
    <>
    <Header />
      <div className='products'>
        {iphone ? (
          <>
            {iphone.map((items) => {
              const {productName, productId, productPrice, productImage} = items;
              return <div className='container' key={productId}>
            <img src={productImage} alt='img' />
            <div className='content'>
                <div className='details'>
                    <h3>Model : {productName}</h3>
                    <p>tk : {productPrice}</p>
                </div>
                <div className='button'>
                    <button onClick={()=> productNavigate(`/mobile/${productId}`)}>Details</button>
                    <button onClick={()=> handleCart(items)}>Add to cart</button>
                </div>
            </div>
        </div>
            })}
          </>
        ): (<h1>Product is loading</h1>)}
    </div>
    </>
  )
}

export default Iphone