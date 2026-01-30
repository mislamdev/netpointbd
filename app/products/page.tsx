'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function ProductsPage() {
  const products = [
    {
      id: 0,
      name: 'Xiaomi Mi 4C',
      price: '1,700',
      image: getAssetPath('/assets/img/product/router.jpg'),
      alt: 'Xiaomi Mi 4C',
    },
    {
      id: 1,
      name: 'Wireless Security Camera',
      price: '1,800',
      image: getAssetPath('/assets/img/product/product-1.jpg'),
      alt: 'Wireless Security Camera',
    },
  ];

  return (
    <>
      <PageTitle 
        title="Our Products" 
        style="centered"
        description="We offer a wide range of networking products including routers, modems, switches, and cables to ensure the best internet experience for our customers."
      />
      
      <div className="product-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            {products.map((product) => (
              <div key={product.id} className="col-lg-4 col-sm-6">
                <div className="single-product">
                  <div className="product-img">
                    <img 
                      src={product.image} 
                      alt={product.alt} 
                      width="295" 
                      height="305" 
                      title={product.alt} 
                      loading="lazy" 
                    />
                    <ul>
                      <li>
                        <a href={`#product-view_${product.id}`} data-bs-toggle="modal">
                          <i className="bx bx-show-alt"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a href="/contact">
                    <h3>{product.name}</h3>
                  </a>
                  <span>৳{product.price}</span>
                  <a href="/contact" className="default-btn">
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="subscribe-area ptb-100 bg-color">
        <div className="container">
          <div className="subscribe-bg">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-8 col-sm-7">
                <div className="subscribe-content">
                  <img src={getAssetPath('/assets/img/icon/call-for-witi.svg')} alt="Image" width="80" height="60" loading="lazy" />
                  <h2>Looking for Internet Connection in Bogura?</h2>
                  <p>Contact with Net Point BD now and get your superfast internet connection within a day. We are here to assist you for your internet connection.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4">
                <div className="text-center text-lg-end">
                  <a href="/contact" className="default-btn" style={{ marginRight: '10px' }}>
                    <span>Contact Now</span>
                  </a>
                  <a href="tel:+8809649315047" className="default-btn">
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
