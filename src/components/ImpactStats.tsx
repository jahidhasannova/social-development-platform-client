
const stats = [
  {
    number: "1,450+",
    label: "Active Volunteers",
    color: "text-teal-600",
    bg: "bg-teal-50",
    icon: "👥",
  },
  {
    number: "180+",
    label: "Events Completed",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: "🌱",
  },
  {
    number: "24,000+",
    label: "Lives Impacted",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    icon: "❤️",
  },
  {
    number: "100%",
    label: "Community Driven",
    color: "text-amber-500",
    bg: "bg-amber-50",
    icon: "🤝",
  },
];

const ImpactStats = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0faf8] to-white px-4 py-16 sm:px-6 lg:py-20">

      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-emerald-600">
            Our Impact
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Together, We Make a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Every volunteer, every event, and every small act of kindness
            creates a meaningful impact in our community.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-100 hover:shadow-[0_15px_35px_rgba(16,185,129,0.10)]"
            >
              {/* Icon */}
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} text-xl transition-transform duration-300 group-hover:scale-110`}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <h3
                className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${stat.color}`}
              >
                {stat.number}
              </h3>

              {/* Label */}
              <p className="mt-2 text-sm font-medium text-slate-500">
                {stat.label}
              </p>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
