import styles from "@/components/layout/CommonLayout.module.scss";
import Link from "next/link";

interface CommonLayoutProps {
  children: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = (props) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">HOME</Link>
        <Link href="/convert">コンバート</Link>
        <Link href="/setting">API取得ページ</Link>
      </header>
      {props.children}
    </>
  );
};
