import ClientComponent from "../component/client-component";
import styles from "./page.module.css";
import ServerComponent from "../component/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

/*
1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다.
2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.
3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.
4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 Props는 전달 불가하다.
*/
