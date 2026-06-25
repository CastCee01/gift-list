export default function Textarea({ label, id, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-[#2A1F1A]" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={`w-full rounded-2xl border border-[#EADDD2] bg-white px-4 py-3 text-[#2A1F1A] outline-none placeholder:text-[#9C8F84] focus:border-[#8F6A46] ${className}`}
        {...props}
      />
    </div>
  )
}