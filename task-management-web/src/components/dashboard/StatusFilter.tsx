interface Props {
  value:
    | "all"
    | "pending"
    | "in_progress"
    | "completed";

  onChange: (
    status:
      | "all"
      | "pending"
      | "in_progress"
      | "completed"
  ) => void;
}

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

const StatusFilter = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() =>
            onChange(filter.value as Props["value"])
          }
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300

          ${
            value === filter.value
              ? "bg-blue-600 text-white shadow-lg"
              : "border bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;