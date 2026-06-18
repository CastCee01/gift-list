export default function Input({ label, id, className = '', ...props }) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700" htmlFor={id}>
            {label}
          </label>
        )}
  
        <input
          id={id}
          className={`w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700 ${className}`}
          {...props}
        />
      </div>
    )
  }