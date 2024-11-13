import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

async function AllBooks() {
  const response = await fetch(`http://localhost:12345/book`);
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(`http://localhost:12345/book/random`);
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}

/* 
데이터 캐시 방법
1. { cache: "force-cache"} : 요청의 결과를 무조건 캐싱, 한번 호출 된 이후에는 다시는 호출하지 않음
2. { cache: "no-store"} : 결과를 저장하지 않음, 캐싱을 아예 하지 않도록 설정
3. { next: {revalidate: 3}} : 특정 시간을 주기로 캐시를 업데이트, 페이지 라우터의 ISR 방식과 유사함
4. { next: {tags ['a'] }} : On-Demand Revalidate, 요청이 들어왔을 때 데이터를 최신화
*/
