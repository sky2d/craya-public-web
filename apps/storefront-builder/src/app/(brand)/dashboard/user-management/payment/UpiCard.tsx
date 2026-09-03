export const UpiCard = () => (
  <div className="flex aspect-[196/300] h-full flex-col justify-between rounded-xl border-[1px] border-[#CDCDCD] bg-[linear-gradient(226.42deg,#F1E8D7_8.93%,#6B93AD_110.98%)] p-4 text-white-light4 shadow-lg">
    <div className="flex items-start justify-between">
      <p className="text-lg font-bold">UPI</p>
      <div className="h-6 w-8 rounded-sm bg-yellow-400"></div>
    </div>
    <div>
      <p className="text-gray-500 text-xs">UPI Id</p>
      <p className="font-mono tracking-wider">****@okhdfcbank</p>
    </div>
    <div>
      <p className="text-gray-500 text-xs">Beneficiary Name</p>
      <p className="font-medium">AHMED M Y ALAZAIZA</p>
    </div>
  </div>
);
