export default function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex gap-6 overflow-x-auto border-b border-gray-200 no-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative shrink-0 whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
            active === tab.id
              ? 'text-brand-700'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-current={active === tab.id ? 'true' : undefined}
        >
          {tab.label}
          {active === tab.id && (
            <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-brand-500" />
          )}
        </button>
      ))}
    </div>
  );
}
