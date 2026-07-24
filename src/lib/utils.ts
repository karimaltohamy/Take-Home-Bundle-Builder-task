/**
 * Joins class names together, filtering out falsy values.
 * Simple, efficient utility to replace heavy libraries like clsx/tailwind-merge when simple conditional classes are needed.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(' ');
}
