import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>


      <HorizontalCardProduct category={'camera'} heading={'Top\'s Camera' }/>
      
      <HorizontalCardProduct category={'watches'} heading={'Popluar Watches'}/>

      <HorizontalCardProduct category={'airpodes'} heading={'Best Airpodes'}/>


      <VerticalCardProduct  category={'earphones'} heading={'Trending Earphones'}/>

      <VerticalCardProduct  category={'mobiles'} heading={'Latest Mobiles'}/>

      <VerticalCardProduct  category={'mouse'} heading={'Best Mouses'}/>
      {/* add for rest products */}

    </div>
  )
}

export default Home