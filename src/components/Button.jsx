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
      primary: 'bg-purple-700 text-white hover:bg-purple-800',
      secondary:
        'border border-gray-300 text-gray-800 hover:border-purple-700 hover:text-purple-700',
      danger: 'text-red-600 hover:text-red-700',
      ghost: 'text-gray-600 hover:text-purple-700',
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