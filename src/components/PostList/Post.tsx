import React from "react";
import Link from "../../utils/Link";
import styles from "../../styles/post.module.css";

const Post = ({ url, filename }: { url: string; filename: string }) => {
  return (
    <Link href={filename}>
      <div className={styles.container}>
        <img
          src={url}
          //srcSet={`${url}?w=100%&fit=crop&auto=format&dpr=2 2x`}
          alt=""
          loading="lazy"
          width={"100%"}
          className={styles.image}
        />
        <div className={styles.background}></div>
      </div>
    </Link>
  );
};

export default Post;
