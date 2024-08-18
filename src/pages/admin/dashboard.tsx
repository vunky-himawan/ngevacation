import AdminLayout from "@/layouts/AdminLayout";

const DashboardAdmin = () => {
  return (
    <>
      <AdminLayout
        title="Dashboard"
        siteName="Hidden Gems"
        siteUrl="https://hiddengems.com"
      >
        <section className="w-full h-full flex justify-center items-center max-w-7xl mx-auto px-4">
          <h1>Coming Soon</h1>
        </section>
      </AdminLayout>
    </>
  );
};

export default DashboardAdmin;
