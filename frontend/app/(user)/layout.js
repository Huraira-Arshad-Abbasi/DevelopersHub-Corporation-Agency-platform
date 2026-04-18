import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import BookingBtn from "@/components/user/BookingBtn";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-12 min-h-screen">
        {children}
      </main>
      <BookingBtn/>
      <Footer />
    </>
  );
}