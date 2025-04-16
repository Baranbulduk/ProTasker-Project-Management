export const getColorFromId = (id) => {
  if (!id) {
    return "#cccccc";
  }
  
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
      (hash >> 16) &
      0xff
    )
      .toString(16)
      .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;
    return color;
  };

  export const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
  
    r = Math.max(0, r - (r * percent) / 100);
    g = Math.max(0, g - (g * percent) / 100);
    b = Math.max(0, b - (b * percent) / 100);
  
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };