import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  return (
    <>
      <Breadcrumbs keys={["EMPLOYEE_BASE"]} />

      <h1 className="mb-2 text-3xl font-semibold">Employee base</h1>
      <div className="mb-8">Here you can see all data</div>
    </>
  );
}
