import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

export const dynamic = "auto";
/*
특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
1. auto : 기본값, 아무것도 강제하지 않음
2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
3. force-static : 페이지를 강제로 statuc 페이지로 설정
4. error : 페이지를 강제로 statuc 페이지로 설정(설정하면 안되는 이유 -> 빌드 오류)
*/

async function AllBooks() {
  const response = await fetch(`http://localhost:12345/book`, { cache: "force-cache" });
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
  const response = await fetch(`http://localhost:12345/book/random`, { next: { revalidate: 3 } });
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
