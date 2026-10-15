import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import { getAllPosts } from "@/lib/blog";
import styles from "./BlogSection.module.css";

// Used when a post has no coverImage in its frontmatter.
const FALLBACK_IMAGES = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.webp",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/** Latest three posts from content/blog. Hidden when there are none. */
export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby='blog-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.header}>
          <h2 id='blog-heading' className={styles.tag}>
            Blog
          </h2>
          <span className={styles.line} aria-hidden='true' />
          <Button
            href='/blog'
            text='Explore the blog'
            btnType='underlinedBlack'
            arrow
          />
        </div>

        <ul className={styles.grid}>
          {posts.map((post, i) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug.current}`}
                className={styles.card}
              >
                <span className={styles.imageWrap}>
                  <Image
                    src={
                      post.coverImage?.src ??
                      FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]
                    }
                    alt={post.coverImage?.alt ?? ""}
                    fill
                    sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 33vw'
                    className={styles.image}
                  />
                </span>

                <span className={styles.meta}>
                  {post.tags?.[0] && (
                    <span className={styles.chip}>{post.tags[0].name}</span>
                  )}
                  <time className={styles.date} dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </span>

                <h3 className={`${styles.title} h6`}>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
