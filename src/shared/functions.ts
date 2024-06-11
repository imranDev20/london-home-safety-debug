export function hexToRgba(hex: string, opacity: number): string {
  // Remove the hash symbol if present
  hex = hex.replace(/^#/, "");

  // Parse the hex color code
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA color string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
