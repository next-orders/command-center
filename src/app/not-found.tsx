import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Страница не найдена",
};

export default function NotFound() {
  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <div>
        <h1 className="mb-2 text-3xl font-semibold">404 ошибка</h1>
        <p>То, что вы запросили, не существует.</p>
      </div>
      <div className="text-center my-10">
        <div className="mt-8">
          <Link href="/">Вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
}
