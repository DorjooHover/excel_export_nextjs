import { Inter } from 'next/font/google';
import { utils, writeFileXLSX } from 'xlsx';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const getExcel = async () => {
    const res = await fetch(
      'https://eunitbackend-production.up.railway.app/ad/json/all'
    );
    const data = await res.json();
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
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
