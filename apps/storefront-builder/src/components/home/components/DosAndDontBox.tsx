import { FaCheck } from "react-icons/fa6";
export const DosAndDontBox = () => {
  return (
    <div className="relative h-96 w-4/5 overflow-y-auto rounded-lg bg-brand-color1">
      <p className="sticky text-center text-white-light4 heading-5">Do&apos;s and Dont&apos;s</p>

      <div>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="mt-3 flex items-center gap-3 p-2">
            <FaCheck className="text-white-light4 body-normal" />
            <span className="text-white-light4 body-normal">skdbjvosb jibisbviob s sib vsjs bvosb osbvobo sbobo sb sob</span>
          </div>
        ))}
      </div>
    </div>
  );
};
