import ClientComponent from "@/app/component/client-component";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      book/[id] 페이지 : {id}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
