// import React, { useEffect, useRef, useState } from "react";

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);
//   const scrollRef = useRef(null);
//   const isPaused = useRef(false);
//   const isResetting = useRef(false); // To prevent double-reset

//   useEffect(() => {
//     fetch("http://localhost:3000/notices")
//       .then((res) => res.json())
//       .then((data) => setNotices(data))
//       .catch((err) => console.error("Error fetching notices:", err));
//   }, []);

//   useEffect(() => {
//     const container = scrollRef.current;
//     const scrollSpeed = 0.5;

//     const scrollLoop = () => {
//       if (!container || isPaused.current || isResetting.current) {
//         requestAnimationFrame(scrollLoop);
//         return;
//       }

//       container.scrollTop += scrollSpeed;

//       const isAtBottom =
//         container.scrollTop + container.clientHeight >=
//         container.scrollHeight - 1;

//         if (isAtBottom) {
//             isResetting.current = true;

//             setTimeout(() => {
//               container.scrollTo({ top: 0, behavior: "smooth" }); // smooth reset
//               setTimeout(() => {
//                 isResetting.current = false;
//               }, 1000); // wait for smooth scroll to finish
//             }, 500); // pause before reset
//           }

//       requestAnimationFrame(scrollLoop);
//     };

//     const animationId = requestAnimationFrame(scrollLoop);

//     const pauseScroll = () => (isPaused.current = true);
//     const resumeScroll = () => (isPaused.current = false);

//     container.addEventListener("mouseenter", pauseScroll);
//     container.addEventListener("mouseleave", resumeScroll);

//     return () => {
//       cancelAnimationFrame(animationId);
//       container.removeEventListener("mouseenter", pauseScroll);
//       container.removeEventListener("mouseleave", resumeScroll);
//     };
//   }, [notices]);

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-blue-100 border border-blue-400 rounded-lg shadow-lg overflow-hidden">
//       <div className="bg-blue-600 text-white text-2xl font-bold px-4 py-3 text-center">
//         📢 Hostel Notice Board
//       </div>

//       <div
//         ref={scrollRef}
//         className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
//         style={{ scrollBehavior: "smooth", cursor: "grab" }}
//       >
//         {notices.length === 0 ? (
//           <p className="text-gray-600 text-center">No notices available.</p>
//         ) : (
//           notices.map((notice, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 min-h-[110px] flex-shrink-0"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {notice.title}
//               </h3>
//               <p className="text-gray-700 mt-1">{notice.message}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 🕒 {new Date(notice.date).toLocaleString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoticeBoard;











import React, { useEffect, useRef, useState } from "react";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const scrollRef = useRef(null);
  const isPaused = useRef(false);
  const isResetting = useRef(false);

  useEffect(() => {
    fetch("http://localhost:3000/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data.reverse()))
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const scrollSpeed = 0.5;

    const scrollLoop = () => {
      if (!container || isPaused.current || isResetting.current) {
        requestAnimationFrame(scrollLoop);
        return;
      }

      container.scrollTop += scrollSpeed;

      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

      if (isAtBottom) {
        isResetting.current = true;
        setTimeout(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isResetting.current = false;
          }, 1000);
        }, 500);
      }

      requestAnimationFrame(scrollLoop);
    };

    const animationId = requestAnimationFrame(scrollLoop);

    const pauseScroll = () => (isPaused.current = true);
    const resumeScroll = () => (isPaused.current = false);

    container?.addEventListener("mouseenter", pauseScroll);
    container?.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationId);
      container?.removeEventListener("mouseenter", pauseScroll);
      container?.removeEventListener("mouseleave", resumeScroll);
    };
  }, [notices]);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-blue-100 border border-blue-400 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white text-2xl font-bold px-4 py-3 text-center">
        📢 Hostel Notice Board
      </div>

      <div
        ref={scrollRef}
        className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
        style={{ scrollBehavior: "smooth", cursor: "grab" }}
      >
        {notices.length === 0 ? (
          <p className="text-gray-600 text-center">No notices available.</p>
        ) : (
          notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 min-h-[110px] flex-shrink-0"
            >
              {notice.imageUrl || notice.pdfUrl ? (
                <a
                  href={notice.imageUrl || notice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {notice.title}
                </a>
              ) : (
                <h3 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h3>
              )}

              {notice.message && (
                <p className="text-gray-700 mt-1">{notice.message}</p>
              )}

              <p className="text-sm text-gray-500 mt-2">
                🕒 {new Date(notice.date).toLocaleString()}
              </p>


            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
