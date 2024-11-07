import fetchOneBook from "@/lib/fetch-one-books";
import style from "@/pages/book/[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    // fallback: false,
    // fallback: "blocking",
    fallback: true, // ui 먼저 전달하고 데이터는 나중에 전달
  };
};
/*
  fallback option
  false : 404 Not Found 반환
  blocking : 즉시 생성(Like SSR)
  true : 즉시 생성 + 페이지만 미리 반환
*/

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입북스 - 검색결과</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스 - 검색결과" />
          <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
        </Head>
      </>
    );
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>

        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
