export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition'

  const variants = {
    primary: 'bg-[#8F6A46] text-white hover:bg-[#7A5637]',
    secondary:
      'border border-[#EADDD2] text-[#2A1F1A] hover:border-[#8F6A46] hover:text-[#8F6A46]',
    danger: 'text-red-600 hover:text-red-700',
    ghost: 'text-[#8F6A46] hover:text-[#7A5637]',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}