import { Inter } from 'next/font/google';
import { utils, writeFileXLSX } from 'xlsx';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const getExcel = async () => {
    const res = await fetch(
      'https://eunitbackend-production.up.railway.app/ad/json/all'
    );
    const data = await res.json();
    const wb = utils.book_new();
    data.map((item) => {
      const ws = utils.json_to_sheet(item.ads);
      utils.book_append_sheet(wb, ws, item.id);
    });
    writeFileXLSX(wb, 'test.xlsx');
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button onClick={() => getExcel()}>excel</button>
    </main>
  );
}
