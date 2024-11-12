import ClientComponent from "@/app/component/client-component";

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  return (
    <div>
      Search 페이지 : {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
