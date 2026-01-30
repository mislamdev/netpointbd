import Link from 'next/link';

interface PageTitleProps {
  title: string;
  breadcrumb?: { name: string; href?: string }[];
  description?: string;
  style?: 'default' | 'centered';
}

export default function PageTitle({ title, breadcrumb, description, style = 'default' }: PageTitleProps) {
  const isCentered = style === 'centered';
  
  return (
    <section id="Banner">
      <div className={`page-title-area ${isCentered ? 'page-title-style-two' : ''}`}>
        <div className="container">
          <div className={isCentered ? 'row justify-content-center' : 'd-table'}>
            <div className={isCentered ? 'col-md-9' : 'd-table-cell'}>
              <div className="page-title-content">
                <h1>{title}</h1>
                {description && <p className="lead">{description}</p>}
                {!isCentered && breadcrumb && breadcrumb.length > 0 && (
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    {breadcrumb.map((item, index) => (
                      <li key={index} className={index === breadcrumb.length - 1 ? 'active' : ''}>
                        {item.href ? (
                          <Link href={item.href}>{item.name}</Link>
                        ) : (
                          item.name
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
