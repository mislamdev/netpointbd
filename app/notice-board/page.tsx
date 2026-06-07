import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import { getAssetPath } from '@/lib/utils';
import type { Notice } from '@/lib/types';
import ContactCallToAction from '@/components/ContactCallToAction';

export const dynamic = "force-dynamic";

export default async function NoticeBoardPage() {
  const notices = await readJSON<Notice[]>('notices');
  return (
    <>
      <PageTitle
        title="Notice Board"
        style="centered"
        description="Stay updated with our latest news, announcements, and important updates. Check back regularly for service updates and special offers from Net Point BD."
      />
      <div className="shopping-cart-area ptb-100">
        <div className="container">
          <form className="wishlist">
            <div className="cart-table table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sl</th>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">View</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>

                <tbody>
                  {notices.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: '#718096' }}>
                        No notices yet.
                      </td>
                    </tr>
                  ) : (
                    notices.map((n, i) => (
                      <tr key={n.id}>
                        <td>{i + 1}</td>
                        <td>{n.date}</td>
                        <td>{n.title}</td>
                        <td>
                          {n.fileUrl ? (
                            <a href={getAssetPath(n.fileUrl)} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td>
                          {n.fileUrl ? (
                            <a href={getAssetPath(n.fileUrl)} download>
                              Download
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>

      <ContactCallToAction />
    </>
  );
}
