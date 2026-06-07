import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import { getAssetPath } from '@/lib/utils';
import type { Product } from '@/lib/types';
import ContactCallToAction from '@/components/ContactCallToAction';

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await readJSON<Product[]>('products');
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
            {products
              .sort((a, b) => a.order - b.order)
              .map((product) => (
                <div key={product.id} className="col-lg-4 col-sm-6">
                  <div className="single-product">
                    <div className="product-img">
                      <img
                        src={getAssetPath(product.image)}
                        alt={product.alt}
                        width="295"
                        height="305"
                        title={product.alt}
                        loading="lazy"
                      />
                    </div>
                    <a href="/contact">
                      <h3>{product.name}</h3>
                    </a>
                    <span>৳{product.price.toLocaleString()}</span>
                    <a href="/contact" className="default-btn">
                      <span>Order Now</span>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <ContactCallToAction />
    </>
  );
}
