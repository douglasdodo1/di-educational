import Hero from "@/components/hero/Hero";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Hero />
      {children}
    </>
  );
};

export default DashboardLayout;
