import React from "react";

export function PrimaryButton({ children, className = "", href, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string, children: React.ReactNode, className?: string, onClick?: () => void }) {
  const classes = `inline-flex items-center justify-center rounded-full bg-emerald-800 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition hover:bg-emerald-950/90 dark:bg-emerald-700 dark:hover:bg-emerald-600 ${className}`;
  if (href) {
    return <a href={href} className={classes} {...(props as any)}>{children}</a>;
  }
  return <button className={classes} onClick={onClick} {...props}>{children}</button>;
}

export function SecondaryButton({ children, className = "", href, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string, children: React.ReactNode, className?: string, onClick?: () => void }) {
  const classes = `inline-flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-800 bg-transparent px-6 py-3.5 text-sm font-semibold tracking-wide text-stone-600 dark:text-stone-300 transition hover:bg-stone-100 dark:hover:bg-stone-800 ${className}`;
  if (href) {
    return <a href={href} className={classes} {...(props as any)}>{children}</a>;
  }
  return <button className={classes} onClick={onClick} {...props}>{children}</button>;
}
