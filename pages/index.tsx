import Payment from "@/components/payment";


export default function Home() {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="my-10" >
        <h1 className="text-2xl font-bold mb-5 ">Standard Payment</h1>
           <Payment/>
          </div>
    </div>
  );
}
