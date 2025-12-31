/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";
import { motion } from "framer-motion";

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<PermissionState>;
}

const roles = [
  "Front-End Intern",
  "React / Next.js Developer",
  "UI & Animation Lover",
];

export default function AboutMe() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing Effect
  useEffect(() => {
    const current = roles[roleIndex];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setText((p) => p + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [charIndex, roleIndex]);

  const enableGyro = async () => {
    if (typeof window === "undefined") return;

    const DeviceOrientation =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;

    if (typeof DeviceOrientation?.requestPermission === "function") {
      try {
        const permission = await DeviceOrientation.requestPermission();
        if (permission !== "granted") {
          console.warn("Gyroscope permission denied");
        }
      } catch (err) {
        console.error("Gyroscope permission error:", err);
      }
    }
  };

  const lines = [
    // eslint-disable-next-line react/jsx-key
    <p>
      سلام، امیدوارم حالتون خوب باشه.
      <br />
      من <strong>فربد خورشیدی</strong>، ۲۵ ساله، از تهران هستم. رشته‌ی تحصیلی من{" "}
      <strong>تجربی</strong> بوده و به‌خاطر علاقه‌ام به تبدیل‌شدن به
      <strong>صدابردار کنسرت</strong>، از رشته‌ی <strong>روانشناسی</strong> در
      دانشگاه
      <strong>تهران مرکز</strong> انصراف دادم. تا قبل از دوران
      <span dir="ltr">COVID</span> با خواننده‌های زیادی همکاری داشتم، اما بعد از
      اون وارد <strong>سربازی</strong> شدم. در دوران سربازی، یادگیری زبان
      <span dir="ltr">Python</span>
      رو شروع کردم و کم‌کم به حوزه‌ی
      <span dir="ltr">Backend</span>
      علاقه‌مند شدم. بعد از پایان سربازی، زمانی که به سطح قابل قبولی برای
      موقعیت‌های کارآموزی
      <span dir="ltr">Backend</span>
      رسیده بودم، با من تماس گرفته شد؛ اما پس از حدود دو ماه متوجه شدم که شرایط
      همکاری شفاف نیست و عملاً مورد سوءاستفاده قرار گرفتم. مدتی از دنیای{" "}
      <strong>کامپیوتر</strong> فاصله گرفتم و وارد کار در
      <strong>چاپخانه</strong> شدم، اما نتونستم خودم رو با اون فضا تطبیق بدم.
      بعد از خارج‌شدن از اون مسیر، با تمرکز و انگیزه‌ی بالا یادگیری
      <span dir="ltr">Frontend</span>
      رو به‌صورت جدی شروع کردم و تلاش کردم هر روز، هر ساعت و هر دقیقه، مهارت‌هام
      رو با استفاده از <strong>نرم‌افزارهای به‌روز</strong> و ابزارهای متنوع
      <span dir="ltr">AI</span>
      ارتقا بدم.
    </p>,
  ];

  return (
    <section
      onClick={enableGyro}
      className="relative h-screen sm:flex-row sm:px-24 sm:justify-center sm:flex  z-10 flex min-h-screen items-center justify-center px-6 overflow-hidden bg-black text-white"
    >
      {/* Real Particles */}
      <Starfield />
      <div className="max-w-3xl  space-y-6 text-right">
        {lines.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
            className="text-lg leading-8 text-neutral-200"
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
