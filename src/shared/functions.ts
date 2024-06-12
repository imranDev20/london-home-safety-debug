import slugify from "react-slugify";

export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(/^#/, "");

  // Parse the hex color code
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const customSlugify = (text: string) => {
  return slugify(text, { delimiter: "-" });
};
