import { suites } from "@/lib/data/suites";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuiteDetailView from "@/components/SuiteDetailView";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const suite = suites.find((s) => s.id === Number(id));

  if (!suite) {
    return {
      title: "Suite Not Found",
    };
  }

  return {
    title: `${suite.name} | ${suite.category}`,
    description: `${suite.description} Discover the architectural serenity of the ${suite.name} at Coastal Cove.`,
    openGraph: {
      title: `${suite.name} - Coastal Cove Luxury`,
      description: suite.description,
      images: [suite.image],
    },
  };
}

export default async function SuiteDetailPage({ params }: Props) {
  const { id } = await params;
  const suite = suites.find((s) => s.id === Number(id));

  if (!suite) {
    return <div className="min-h-screen flex items-center justify-center font-serif text-3xl">Suite not found.</div>;
  }

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Navbar darkText={false} />
      <SuiteDetailView suite={suite} />
      <Footer />
    </div>
  );
}
