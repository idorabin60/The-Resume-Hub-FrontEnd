/* eslint-disable react/prop-types */
// card.jsx
function cn(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
export function Card({ children, className }) {
    return (
      <div className={`bg-white shadow-md rounded-lg ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children, className }) {
    return (
      <div className={`p-4 border-b ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardFooter({ children, className }) {
    return (
      <div className={`p-4 border-t ${className}`}>
        {children}
      </div>
    );
  }
  export function CardTitle({ children, className, ...props }) {
    return (
      <h3
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  }
  
  CardTitle.displayName = "CardTitle"
  