export function Avatar({ width, height, src, alt }) {
  return <img src={src} alt={alt} style={{ width: width + 'px', height: height + 'px', borderRadius: '50%' }} />;
}
