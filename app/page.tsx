import { LengthConverter } from "@/components/page/length-converter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-2 md:p-12 lg:p-24">
      <h1 className="text-center text-2xl my-2">Length Converter</h1>
      <LengthConverter />
    </main>
  );
}
