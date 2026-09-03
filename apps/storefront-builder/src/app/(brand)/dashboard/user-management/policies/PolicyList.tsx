interface PolicyListProps {
  title: string;
  points: string[];
}

export const PolicyList: React.FC<PolicyListProps> = ({ title, points }) => (
  <div className="flex flex-col gap-2">
    <h2 className="flex items-center text-[clamp(10px,0.7vw,15px)] font-medium">{title}</h2>
    <ul className="list-disc space-y-2 rounded-lg bg-[#F2F2F5] p-3 pl-8 text-[clamp(10px,0.7vw,13px)] text-black-dark3">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);
