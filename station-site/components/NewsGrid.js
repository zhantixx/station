export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <h2 className="section-title">Подписка на новости</h2>
      <form className="newsletter-form">
        <input type="email" placeholder="Ваш email" required />
        <button type="submit">Подписаться</button>
      </form>
    </section>
  );
}
