// // import NoticeBoard from './components/NoticeBoard';

// // function App() {
// //   return (
// //     <div>
// //       <NoticeBoard />
// //     </div>
// //   );
// // }

// // export default App;




// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import UploadNotice from "./components/UploadNotice";
// import NoticeBoard from "./components/NoticeBoard";

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <nav className="flex justify-center gap-6 mb-6">
//         <Link
//           to="/"
//           className="text-blue-600 font-semibold hover:underline"
//         >
//           📢 View Notices
//         </Link>
//         <Link
//           to="/upload"
//           className="text-blue-600 font-semibold hover:underline"
//         >
//           📤 Upload Notice
//         </Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<NoticeBoard />} />
//         <Route path="/upload" element={<UploadNotice />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;





import Header from "./components/Header";
import Hero from "./components/Hero";
import NoticeBoard from "./components/NoticeBoard";
import LoginTabs from "./components/LoginTabs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="main-content">
        <div className="container content-wrapper">
          <NoticeBoard />
          <LoginTabs />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
