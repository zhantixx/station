import React from "react";
import styles from "./newsPost.module.css";

export default function ArticlePage() {
  const post = {
    id: 1,
    title: "Почему снижение цен на нефть почти не повлияло на курс тенге",
    category: "Обновлено",
    time: "1 день назад",
    author: {
      name: "Андрей Валентинов",
      avatar: "", 
    },
    heroImage: "/image/пост1.JPG",
    content: [
      `Полторы декады сентября 2024 года стали относительно удачными для финансовой системы Казахстана. Национальной валюте наконец-то удалось опуститься ниже отметки 480 тенге за доллар благодаря действиям Национального банка РК, сообщает Zakon.kz.`,
      `Укрепление тенге происходило преимущественно за счет увеличения предложения иностранной валюты на рынке в результате активных продаж для обеспечения трансфертов из Нацфонда, отмечает финансовый аналитик Андрей Чеботарев. При этом курс практически не реагировал на негативный внешний фактор в виде дальнейшего снижения цены на нефть, которое ранее оказалось основным триггером столь быстрого ослабления тенге.`,
      `Текущие трансферты из Нацфонда в размере свыше 900 млн долларов должны были выступить существенным фактором укрепления курса, однако этого не происходит. "На валютном рынке доминируют негативные ожидания касательно ряда экономических проблем. Текущий дефицит бюджета и накопившиеся экономические дисбалансы создают дополнительное давление на тенге, усиливая беспокойство среди участников рынка". Андрей Чеботарев`,
    ],
    inlineImage: "/image/post11.JPG",
    inlineText: "Внешнеэкономические факторы, оказывающие влияние на тенге, оказались смешанными. Индекс доллара за неделю немного снизился – до 101,1 пункта. Это снижение связано с ожиданиями рынка по возможному снижению ставки ФРС США на 0,5 пункта. Индекс экспортных цен Казахстана с учетом цены на нефть и газ за неделю вырос на 1,0 пункта, составив 133,9. В течение недели цены на нефть доходили до 69 долларов США за баррель, затем стабилизировались на 71,61 доллара за баррель.",
    inlineText2: "Индекс экспортных цен без учета стоимости нефти и газа также вырос на 5,5 пункта, что связано с улучшением динамики стоимости металлов. Цены на металлы на мировых рынках растут на фоне признаков улучшения спроса в Китае и ожиданий стимулирующих мер, включая возможное снижение ключевой ставки.",
    inlineText3: "Форвардный курс, отражающий ожидания рынка по будущему курсу доллара к тенге, остается на уровне прошлой недели. Рыночные прогнозы скорректировались в сторону более умеренного ослабления тенге в краткосрочной перспективе. Это связано с предстоящими мерами поддержки национальной валюты, включая значительное увеличение объемов конвертации иностранной валюты в сентябре для обеспечения трансфертов из Нацфонда в государственный бюджет.",
    inlineText4: "Ранее мы сообщали, что нефть, скорее всего, будет дешеветь из-за энергетической политики Китая, что невыгодно для казахстанской экономики. ",
  };

  const comments = [
    { id: 1, name: "Floyd Miles", date: "2 Days Ago", avatar: "/image/avatar_floyd.png", text: "Leverage agile frameworks to provide a robust synopsis..." },
    { id: 2, name: "Theresa Webb", date: "2 Days Ago", avatar: "/image/avatar_theresa.png", text: "Leverage agile frameworks to provide a robust synopsis..." },
    { id: 3, name: "Cody Fisher", date: "2 Days Ago", avatar: "/image/avatar_cody.png", text: "Leverage agile frameworks to provide a robust synopsis..." },
  ];

  return (
    <div className={styles.contentWrapper}>
      <article className={styles.articleMain}>
        {/* Hero Section */}
        <section className={styles.articleHero}>
          <img src={post.heroImage} alt={post.title} className={styles.heroBgImage} />
          <a href="/news" className={styles.backLinkHero}>
            <img src="/image/back.png" alt="Назад" className={styles.backIconImg} />
          </a>
          <div className={styles.heroOverlayContent}>
            <div className={styles.metadata}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.time}>{post.time}</span>
            </div>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleInfo}>
              <div className={styles.author}>
                {post.author.avatar && <img src={post.author.avatar} alt={post.author.name} className={styles.authorAvatar} />}
                <span className={styles.authorName}>{post.author.name}</span>
              </div>
              <div className={styles.stats}>
                <a href="#like" className={styles.clickableIconLink}>
                  <img src="/image/love.png" alt="Like" className={styles.statIcon} /> 521K
                </a>
                <a href="#comment" className={styles.clickableIconLink}>
                  <img src="/image/comment.png" alt="Comment" className={styles.statIcon} /> 213
                </a>
                <a href="#share" className={styles.clickableIconLink}>
                  <img src="/image/share.png" alt="Share" className={styles.statIcon} /> 80
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className={styles.articleBody}>
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* Inline Image Section */}
        <section className={styles.articleBodyContinuation}>
          <div className={styles.inlineImageContainer}>
            <img src={post.inlineImage} alt="Вставка изображения" className={styles.inlineArticleImage} />
          </div>
          <p className={styles.bodyTextBelowImage}>{post.inlineText}</p>
          <p className={styles.bodyTextBelowImage}>{post.inlineText2}</p>
          <p className={styles.bodyTextBelowImage}>{post.inlineText3}</p>
          <p className={styles.bodyTextBelowImage}>{post.inlineText4}</p>
        </section>
      </article>

      {/* Comments Section */}
      <section className={styles.commentsSection}>
        <div className={styles.commentInputArea}>
          <img src="/image/user_avatar.png" alt="Ваш аватар" className={styles.commentUserAvatar} />
          <div className={styles.inputFormContainer}>
            <textarea placeholder="Write your comment in here" className={styles.commentTextarea}></textarea>
            <button className={styles.postCommentButton}>Post Comment</button>
          </div>
        </div>

        <div className={styles.commentsList}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.commentItem}>
              <img src={comment.avatar} alt={comment.name} className={styles.commentAuthorAvatar} />
              <div className={styles.commentContent}>
                <span className={styles.commentAuthorName}>{comment.name}</span>
                <span className={styles.commentDate}>{comment.date}</span>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
