import { useState, useEffect } from 'react';
import PaymentCard from './components/PaymentCard';
import Success from './components/Success';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';

function App() {
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('payment_id');
    if (id) setPaymentId(id);
  }, []);

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden flex flex-col font-sans">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 relative z-10">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Enrollment Closing Soon
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Launch Your <br />
              <span className="gradient-text">Tech Career</span> With Us
            </h1>

            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join Zentro Solutions' premium internship program. master real-world skills, build production-ready projects, and get mentored by industry experts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-gray-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>Certified Internship</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>Live Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>Job Assistance</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-[#0f172a]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="Student" />
                <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">+500</div>
              </div>
              <p className="text-gray-400 text-sm">Already enrolled students</p>
            </div>
          </div>

          {/* Right Card Section */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            {/* Decorative blobs behind card */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-50"></div>

            {paymentId ? <Success paymentId={paymentId} /> : <PaymentCard />}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
