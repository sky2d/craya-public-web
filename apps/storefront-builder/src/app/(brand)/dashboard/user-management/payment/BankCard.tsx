export const BankCard = () => (
  <div className="flex h-full w-full flex-col justify-between rounded-xl border-[1px] border-[#CDCDCD] bg-[linear-gradient(226.42deg,#F1E8D7_8.93%,#6B93AD_110.98%)] p-4 text-white-light4 shadow-lg">
    <div className="flex items-start justify-between">
      <p className="text-lg font-bold">HDFC Bank</p>
      <div className="h-6 w-8 rounded-sm bg-yellow-400"></div>
    </div>
    <div>
      <p className="text-xs opacity-70">Account No</p>
      <p className="font-mono tracking-wider">**** **** **** 1234</p>
    </div>
    <div className="flex items-end justify-between text-xs">
      <div>
        <p className="opacity-70">Beneficiary Name</p>
        <p className="font-medium">AHMED M Y ALAZAIZA</p>
      </div>
      <div>
        <p className="opacity-70">IFSC Code</p>
        <p className="font-medium">sd6d76</p>
      </div>
    </div>
  </div>
);
