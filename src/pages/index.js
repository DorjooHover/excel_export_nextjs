import { Inter } from "next/font/google";
import { utils, writeFileXLSX } from "xlsx";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const getExcel = async (type) => {
    const res = await fetch(
      `https://eunitbackend-production.up.railway.app/ad/json/${type}`
    );
    const data = await res.json();
    const wb = utils.book_new();
    data.map((item) => {
      item.ads.map((ad) => {
        let num = ad["num"];
        ad["num"] = `=HYPERLINK("http://eunit.vercel.app/ad/${num}","link")`;
      });
      const ws = utils.json_to_sheet(item.ads);
      utils.book_append_sheet(wb, ws, item.id);
    });
    writeFileXLSX(wb, "test.xlsx");
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <button className={"bg-blue"} onClick={() => getExcel("all")}>
        All
      </button>
      <div className="py-10"></div>
      <button className={"bg-blue"} onClick={() => getExcel("sharing")}>
        Shared
      </button>
    </main>
  );
}
