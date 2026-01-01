"use client";
import { useRef, useState } from "react";

import Starfield from "./Starfield";

export default function AboutMe() {
  const [expanded, setExpanded] = useState(false);
  const startY = useRef<number | null>(null);

  return (
    <>
      <Starfield active={expanded} />

      <section className="w-full flex justify-center px-4 py-16">
        <div
          onTouchStart={(e) => (startY.current = e.touches[0].clientY)}
          className="relative w-full max-w-xl rounded-3xl
          border border-white/10 bg-black/60 
          p-6 text-white transition-all duration-700 ease-out
          "
        >
          <div className="text-gray-50 overflow-y-auto text-right  text-sm leading-7 scrollbar-thin scrollbar-thumb-white/30">
            <p>
              سلام، امیدوارم حالتون خوب باشه.
              <br />
              من <strong>فربد خورشیدی</strong>، ۲۵ ساله، از تهران هستم. رشته‌ی
              تحصیلی من <strong>تجربی</strong> بوده و به‌خاطر علاقه‌ام به
              تبدیل‌شدن به
              <strong>صدابردار کنسرت</strong>، از رشته‌ی{" "}
              <strong>روانشناسی</strong> در دانشگاه
              <strong>تهران مرکز</strong> انصراف دادم. تا قبل از دوران
              <span dir="ltr">COVID</span> با خواننده‌های زیادی همکاری داشتم،
              اما بعد از اون وارد <strong>سربازی</strong> شدم. در دوران سربازی،
              یادگیری زبان
              <span dir="ltr">Python</span>
              رو شروع کردم و کم‌کم به حوزه‌ی
              <span dir="ltr">Backend</span>
              علاقه‌مند شدم. بعد از پایان سربازی، زمانی که به سطح قابل قبولی
              برای موقعیت‌های کارآموزی
              <span dir="ltr">Backend</span>
              رسیده بودم، با من تماس گرفته شد؛ اما پس از حدود دو ماه متوجه شدم
              که شرایط همکاری شفاف نیست و عملاً مورد سوءاستفاده قرار گرفتم. مدتی
              از دنیای <strong>کامپیوتر</strong> فاصله گرفتم و وارد کار در
              <strong>چاپخانه</strong> شدم، اما نتونستم خودم رو با اون فضا تطبیق
              بدم. بعد از خارج‌شدن از اون مسیر، با تمرکز و انگیزه‌ی بالا یادگیری
              <span dir="ltr">Frontend</span>
              رو به‌صورت جدی شروع کردم و تلاش کردم هر روز، هر ساعت و هر دقیقه،
              مهارت‌هام رو با استفاده از <strong>نرم‌افزارهای به‌روز</strong> و
              ابزارهای متنوع
              <span dir="ltr">AI</span>
              ارتقا بدم.
            </p>
            ,
          </div>
        </div>
      </section>
    </>
  );
}
