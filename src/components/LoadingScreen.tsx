/** Server-route fallback using the same visual language as the initial loader. */
export default function LoadingScreen() {
  return (
    <div className="site-loader" role="status" aria-label="Sayfa hazırlanıyor">
      <div className="site-loader__ambient" aria-hidden="true" />
      <div className="site-loader__content">
        <img
          className="site-loader__logo"
          src="/assets/logos/yilmazlar-grup-logo.png"
          alt="Yılmazlar Grup"
        />
        <div className="site-loader__framework" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  )
}
