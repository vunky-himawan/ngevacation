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
          <p>
            This feature is currently under development. We are working hard to
            perfect it so that you can enjoy it soon. Thank you for your
            patience!
          </p>
        </section>
      </AdminLayout>
    </>
  );
};

export default DashboardAdmin;
