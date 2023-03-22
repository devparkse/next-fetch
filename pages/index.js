import Head from "next/head";
import Image from "next/image";
import HeaderInfo from "../components/HeaderInfo";
import styles from "../styles/Home.module.css";

export default function Home({ cats }) {
  return (
    <>
      <h1>Cats World</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.name}>{cat.name}</li>
        ))}
      </ul>
    </>
  );
}
// CSR : Client-Side-Rendering
// SSR : Server-side-Rendering  (요청시 HTML 생성 후 브라우저 출력)
// SSG : Static-Site-Generation (서버에서 미리 html 을 생성, 내용변경불가)

// 1. SSR 적용
// 데이터를 호출후 Response 된 결과를 Props 로 전달한다.
// export const getServerSideProps = async () => {
//   // const res = await fetch(
//   //   `https://api.thecatapi.com/v1/breeds?api_key=${process.env.NEXT_PUBLIC_CATS_KEY}&limit=10`
//   // );
// const res = await fetch("http://localhost:8080/api/cats");
//   const cats = await res.json();
//   return {
//     props: {
//       cats,
//     },
//   };
// };

// 2. SSG 적용 (Static-Site-Generation)
// npm run build 를 할때 html 을 미리 만들어서 포함한다.
// 새로 고침을 해도 내용 갱신이 안됩니다.
// 미리 만들어져 있으므로 엄청 빨리 화면에 출력합니다.
// 그래서 Next.js 에서는 SSG 를 적극 추천합니다.
// getStaticProps 를 지원합니다.
export const getStaticProps = async () => {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${process.env.NEXT_PUBLIC_CATS_KEY}&limit=10`
  );
  // const res = await fetch("http://localhost:8080/api/cats");
  const cats = await res.json();
  return {
    props: {
      cats,
    },
    revalidate: 20,
  };
};
