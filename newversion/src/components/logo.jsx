export function Logo({
  className = "",
  width,
  height,
}) {
  const imageClassName = width && height 
    ? `${className} object-contain`
    : `${className} h-full w-full object-contain`
  
  return (
    <>
      {/* Логотип для светлой темы (logodark.png) */}
      <img
        src="/logodark.png"
        width={width}
        height={height}
        className={`${imageClassName} block dark:hidden`}
        alt="Logo"
      />
      {/* Логотип для темной темы (logowhite.png) */}
      <img
        src="/logowhite.png"
        width={width}
        height={height}
        className={`${imageClassName} hidden dark:block`}
        alt="Logo"
      />
    </>
  )
}
