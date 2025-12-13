// js/chat.js
(function(){
  // Elements
  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const body = document.getElementById('chat-body');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  // simple message storage
  const STORAGE_KEY = 'webora_chat_history_v1';

  // open/close
  toggle.addEventListener('click', () => openPanel(true));
  closeBtn.addEventListener('click', () => openPanel(false));

  function openPanel(show){
    if(show){
      panel.classList.add('open');
      panel.setAttribute('aria-hidden','false');
      input.focus();
      renderHistory();
    } else {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
    }
  }

  // load/save history
  function loadHistory(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e){ return []; } }
  function saveHistory(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

  // render
  function renderHistory(){
    body.innerHTML = '';
    const msgs = loadHistory();
    msgs.forEach(m => {
      const d = document.createElement('div');
      d.className = 'msg ' + (m.from === 'user' ? 'user' : 'bot');
      d.textContent = m.text;
      body.appendChild(d);
    });
    body.scrollTop = body.scrollHeight;
  }

  // send message
  function sendMessage(text){
    if(!text || !text.trim()) return;
    const msgs = loadHistory();
    const userMsg = { from:'user', text: text.trim(), ts: Date.now() };
    msgs.push(userMsg);
    saveHistory(msgs);
    renderHistory();

    // bot typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'msg bot typing';
    typingEl.textContent = 'Typing…';
    body.appendChild(typingEl);
    body.scrollTop = body.scrollHeight;

    // compute bot reply after short delay
    setTimeout(async () => {
      typingEl.remove();
      const reply = await getBotReply(text.trim());
      msgs.push({ from:'bot', text: reply, ts: Date.now() });
      saveHistory(msgs);
      renderHistory();
    }, 700 + Math.random()*700);
  }

  // simple rule-based bot (extend this function)
  function getBotReply(msg) {
  msg = msg.toLowerCase(); // make input case-insensitive
  if (msg.includes("price") || msg.includes("pricing")) {
    return "💰 Our pricing plans are flexible:\n\n- **Basic (₹499/mo):** Perfect for small businesses & portfolios.\n- **Professional (₹999/mo):** Includes advanced SEO, and faster hosting.\n- **Enterprise (Custom):** For large-scale projects with 24/7 support, dedicated servers, and priority service.\n\n👉 We also offer one-time project pricing if you don’t want a subscription.";
  
  } else if (msg.includes("service") || msg.includes("offer")) {
    return "⚡ We provide a wide range of services:\n\n1. **Web Design & Development** – Modern, responsive, and optimized websites.\n2. **Mobile Apps** – Android & iOS apps built with latest frameworks.\n3. **SEO & Marketing** – Improve visibility and attract more customers.\n4. **Branding** – Logo, graphics, and digital presence.\n\nEvery project is fully customized to meet your goals.";

  } else if (msg.includes("about")) {
    return "🌍 Webora is a digital-first company passionate about technology. Since 2022, we’ve worked with **50+ businesses worldwide** across e-commerce, education, healthcare, and startups.\n\nOur mission is simple: **make digital simple, modern, and impactful**.";

  } else if (msg.includes("portfolio") || msg.includes("project")) {
    return "🖼️ You can explore our **Portfolio** section to see case studies:\n\n- **EduPro App:** Helped an education startup reach 10,000+ students in 3 months.\n- **ShopMax E-commerce:** Increased sales by 45% with a responsive online store.\n- **HealthConnect:** Built a telemedicine platform serving 5 countries.\n\n👉 Each portfolio entry includes problem → solution → result.";

  } else if (msg.includes("faq") || msg.includes("questions")) {
    return "❓ Some popular questions people ask:\n\n- What are your pricing plans?\n- Do you provide SEO?\n- How long does a project take?\n- Can you maintain my website?\n- Do you provide custom branding?\n\nYou can ask me any of these!";

  } else if (msg.includes("seo")) {
    return "🔍 Yes, we provide **SEO services**. This includes:\n\n- On-page SEO (meta tags, content optimization)\n- Off-page SEO (backlinks, authority building)\n- Technical SEO (site speed, mobile optimization)\n\nMost clients see ranking improvements within **6–12 weeks**.";

  } else if (msg.includes("time") || msg.includes("how long")) {
    return "⏳ The time depends on the project:\n\n- **Basic Website:** 1–2 weeks\n- **E-commerce Store:** 3–4 weeks\n- **Mobile App:** 1–2 months\n\nWe always share a project timeline before starting.";

  } else if (msg.includes("maintain") || msg.includes("maintenance")) {
    return "🛠️ Yes! We provide ongoing maintenance plans:\n\n- **Basic:** Security updates + backups.\n- **Standard:** Updates + content management.\n- **Premium:** 24/7 monitoring + bug fixes.\n\nThis way, your site/app always stays fresh and secure.";

  } else if (msg.includes("career") || msg.includes("job")) {
    return "👨‍💻 We’re always looking for talent!\n\nCheck our **Careers** page to see open roles. You can apply directly, and we’ll get back to you within a week.";

  } else if (msg.includes("newsletter") || msg.includes("subscribe")) {
    return "📩 You can subscribe to our **Newsletter** (in the footer of our site). You’ll get updates on:\n\n- New services\n- Case studies\n- Tech tips\n- Special discounts";

  } 
  // About Webora
  if (msg.includes("what is webora") || msg.includes("webora") || msg.includes("who are you")) {
    return "🌍 Webora is a **modern web design and digital solutions company**. We build professional websites, apps, and online stores for startups, businesses, and global clients. Our mission is to make high-quality web services affordable and accessible.";

  } else if (msg.includes("when started") || msg.includes("founded") || msg.includes("since when")) {
    return "📅 Webora was founded in **2022** and since then we’ve worked with **50+ clients across 5 countries**.";

  } else if (msg.includes("why choose webora") || msg.includes("benefits") || msg.includes("why you")) {
    return "🚀 Why Webora?\n- Affordable plans (hosting from ₹100/year)\n- Modern, mobile-friendly designs\n- SEO-optimized websites\n- 24/7 support\n- Trusted by businesses worldwide";

  } else if (msg.includes("mission") || msg.includes("vision") || msg.includes("goal")) {
    return "🎯 Our mission is to help businesses go digital with **affordable, fast, and scalable websites & apps** that stand out in the online market.";

  } else if (msg.includes("team") || msg.includes("who works") || msg.includes("developers")) {
    return "👨‍💻 Webora is powered by a team of developers, designers, and digital marketers who bring creativity and technology together.";

  } else if (msg.includes("location") || msg.includes("where are you") || msg.includes("office")) {
    return "📍 Webora is based in **India**, but we proudly serve clients worldwide 🌎 through remote collaboration.";

  } else if (msg.includes("trust") || msg.includes("clients") || msg.includes("reviews")) {
    return "⭐ Our clients say Webora is:\n‘Affordable, professional, and super responsive!’\n\nWe’ve completed **50+ projects** and have a **99% client satisfaction rate**.";

  } else if ( msg.includes("offer")) {
    return "⚡ Services:\n- Web Design & Development\n- E-commerce Stores\n- SEO & Marketing\n- Branding & Graphics\n- Hosting & Maintenance";

  } 

  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost")) {
    return "💰 Our pricing is transparent:\n\n- **Basic Website:** starts at ₹2,000\n- **Business Package:** ₹5,000 – ₹10,000\n- **E-commerce Stores:** ₹12,000 – ₹20,000\n- **Enterprise Solutions:** custom pricing\n\n👉 We also offer **₹100/year hosting** for small projects.";

  } else if (msg.includes("what do you do")) {
    return "⚡ We offer:\n\n- Web Design & Development\n- E-commerce Solutions\n- SEO & Digital Marketing\n- Mobile App Development\n- Branding & Graphics\n- Hosting & Maintenance";

  } else if (msg.includes("contact") || msg.includes("support")) {
    return "📞 Contact us anytime:\n\n- **Email:** gondaliyakunj71@gmail.com\n- **Phone:** +91-9727209868\n- **WhatsApp:** +91-9727209868\n\nWe reply within **24 hours**.";

  } else if (msg.includes("about") || msg.includes("who are you")) {
    return "🌍 Webora is a creative digital agency helping startups and businesses go online with modern, fast, and scalable solutions. We’ve served **50+ clients in 5 countries** since 2022.";

  } else if (msg.includes("portfolio") || msg.includes("project") || msg.includes("case study")) {
    return "🖼️ Some highlights from our portfolio:\n\n- **EduPro (Edtech):** 10k students onboarded in 3 months.\n- **ShopMax (E-commerce):** Increased sales by 45%.\n- **HealthConnect (Healthcare):** Serving 5 countries with telemedicine.\n\n👉 Visit our Portfolio page for details.";

  } else if (msg.includes("faq") || msg.includes("questions")) {
    return "❓ Popular FAQs:\n\n- Do you work with international clients?\n- Do you provide SEO?\n- How long does a project take?\n- Do you offer refunds?\n- Can I upgrade my plan later?\n\nI can answer all of these!";

  } else if (msg.includes("seo") || msg.includes("google rank")) {
    return "🔍 Yes, we provide **SEO optimization**:\n\n- Keyword research & strategy\n- Content optimization\n- Technical SEO (speed, structure)\n- Backlinks & authority building\n\n⚡ Clients usually see results within 8–12 weeks.";

  } else if (msg.includes("time") || msg.includes("how long") || msg.includes("duration")) {
    return "⏳ Timelines vary:\n\n- Basic Website: 1–2 weeks\n- E-commerce: 3–4 weeks\n- Mobile App: 1–2 months\n\nWe always share a roadmap before starting.";

  } else if (msg.includes("maintain") || msg.includes("maintenance") || msg.includes("update")) {
    return "🛠️ Maintenance packages:\n\n- **Basic:** Security updates + backups\n- **Standard:** Updates + content support\n- **Premium:** 24/7 monitoring, bug fixes, priority support";

  } else if (msg.includes("career") || msg.includes("job") || msg.includes("hiring")) {
    return "👨‍💻 Yes, we’re hiring!\n\nCheck our Careers page for open roles. Current openings:\n- Frontend Developer\n- UI/UX Designer\n- Digital Marketing Intern\n\nApply online and we’ll get back in a week.";

  } else if (msg.includes("newsletter") || msg.includes("subscribe") || msg.includes("updates")) {
    return "📩 Subscribe to our Newsletter (footer of the site) to get:\n\n- New service launches\n- Case studies\n- Web tips\n- Discounts & offers";

  } else if (msg.includes("refund") || msg.includes("money back")) {
    return "✅ Yes, we offer a **7-day full refund** if you’re not satisfied with our services.";

  } else if (msg.includes("international") || msg.includes("outside india")) {
    return "🌐 Yes! We work with clients worldwide using Zoom, Google Meet, and project tools like Trello & Slack.";

  } else if (msg.includes("technology") || msg.includes("stack") || msg.includes("tools")) {
    return "💻 We use modern technologies:\n\n- **Frontend:** React, Next.js, Tailwind CSS\n- **Backend:** Node.js, Firebase, Express\n- **Databases:** MongoDB, Firestore\n- **Hosting:** Vercel, Netlify, Firebase, AWS";

  } else if (msg.includes("ssl") || msg.includes("security")) {
    return "🔒 All our websites come with **Free SSL (https://)** and we provide extra layers of security for enterprise clients.";

  } else if (msg.includes("founder")){
    return " KUNJ GONDALIYA IS THE OFFICIAL OWNER OF THE WEBORA . HE IS 16 AND LOOKING FORWARD FOR A BETTER TOMMOROW.";
  }
  else if (msg.includes("culture") || msg.includes("value") || msg.includes("work style")) {
  return "🌱 At Webora, we follow a calm and creativity-first work culture. No pressure, no chaos — just clean, efficient, innovative work.";
}
else if (msg.includes("belief") || msg.includes("philosophy")) {
  return "💡 Webora believes in honesty, innovation, transparency, and building long-term partnerships with clients.";
}
else if (msg.includes("payment") || msg.includes("pay") || msg.includes("advance")) {
  return "💳 We accept payments via UPI, Bank Transfer, PayPal, and Razorpay. Most projects require a 30% advance to confirm the timeline.";
}
else if (msg.includes("invoice") || msg.includes("bill")) {
  return "🧾 Yes, we provide invoices for all payments. Company GST invoice support is also available.";
}

else if (msg.includes("process") || msg.includes("steps") || msg.includes("workflow")) {
  return "⚙️ Our work process is simple:\n1️⃣ Requirement Gathering\n2️⃣ UI/UX Design\n3️⃣ Development\n4️⃣ Testing\n5️⃣ Deployment\n6️⃣ Training & Support";
}
else if (msg.includes("update") || msg.includes("progress")) {
  return "📅 You will get daily or weekly project updates via WhatsApp, Email, or Trello depending on your preference.";
}
else if (msg.includes("app") || msg.includes("android") || msg.includes("ios")) {
  return "📱 Yes! We develop Android & iOS apps using Flutter and React Native. We also assist with Play Store publishing.";
}
else if (msg.includes("play store") || msg.includes("publish app")) {
  return "🚀 Yes, we help publish your app to the Google Play Store and guide you for Apple App Store approvals.";
}

else if (msg.includes("hosting") || msg.includes("server")) {
  return "🖥️ We provide hosting on Firebase, Vercel, Netlify, and VPS servers. We also help with domain, SSL, DNS, and emails.";
}
else if (msg.includes("domain") || msg.includes("ssl") || msg.includes("https")) {
  return "🔒 All our websites come with FREE SSL. We also assist in domain setup, DNS records, and business email creation.";
}
else if (msg.includes("analytics") || msg.includes("tracking") || msg.includes("insights")) {
  return "📊 We integrate Google Analytics, Meta Pixel, Firebase Analytics, Heatmaps, and more to track performance.";
}
else if (msg.includes("traffic") || msg.includes("visitors")) {
  return "🌍 We can set up real-time visitor tracking, user behavior insights, and conversion monitoring tools for your website.";
}
else if (msg.includes("content writing") || msg.includes("write content")) {
  return "✍️ Yes, we provide professional content writing for websites, blogs, social media, and marketing campaigns.";
}
else if (msg.includes("brand") || msg.includes("logo") || msg.includes("identity")) {
  return "🎨 Webora offers branding services including logos, color palettes, typography, and social media kits.";
}
else if (msg.includes("privacy") || msg.includes("policy") || msg.includes("terms")) {
  return "📜 Yes, we can create Privacy Policy, Terms & Conditions, Return Policy, and Cookie Policy pages for your website.";
}
else if (msg.includes("instagram") || msg.includes("social") || msg.includes("whatsapp")) {
  return "📱 We can integrate Instagram feeds, WhatsApp Chat, FB Messenger, and social icons directly into your website.";
}
else if (msg.includes("ads") || msg.includes("marketing") || msg.includes("promotion")) {
  return "📢 We help set up Google Ads, Meta Ads, Instagram promotions, and SEO-based marketing campaigns.";
}
else if (msg.includes("achievement") || msg.includes("success") || msg.includes("stats")) {
  return "🏆 Webora has helped startups grow by over 60% in conversions. We’ve delivered 50+ successful projects across multiple industries.";
}
else if (msg.includes("intern") || msg.includes("internship")) {
  return "🎓 Yes! Webora offers internships in web development, UI/UX, and digital marketing. You can apply through our Careers page.";
}
else if (msg.includes("team") || msg.includes("employee") || msg.includes("staff")) {
  return "👨‍💻 Webora works with a team of in-house developers, designers, and remote collaborators from around the world.";
}
else if (msg.includes("fun") || msg.includes("joke")) {
  return "😂 Developer joke: 'I told my computer I need a break… it said: I can’t CPU do that.'";
}
else if (msg.includes("fact") || msg.includes("fun fact")) {
  return "🤖 Fun fact: Most Webora projects start small and evolve into full-scale digital platforms!";
}
else if (msg.includes("startup") || msg.includes("business")) {
  return "🚀 Webora helps startups build their entire digital identity — website, branding, marketing, and analytics.";
}

else if (msg.includes("help") || msg.includes("assist")) {
  return "🤝 I'm here to help! Ask me anything about pricing, services, SEO, portfolio, design, or development.";
}
else if (msg.includes("utsav") && msg.includes("who")) {
  return "👨‍💻 Utsav Vishveliya is one of Webora’s core team members. He contributes to development, feature testing, and workflow optimization.";
}
else if (msg.includes("utsav") && msg.includes("role")) {
  return "🛠️ Utsav plays an important role in Webora’s development cycle — assisting with front-end improvements, backend logic, and overall system stability.";
}
else if (msg.includes("utsav") && msg.includes("work")) {
  return "⚡ Utsav is known for his structured coding approach and rapid problem-solving. He helps in:\n- UI/UX refinement\n- Testing modules\n- Debugging\n- Backend feature assistance\n\nHe ensures smooth project execution and fast delivery.";
}
else if (msg.includes("utsav") && msg.includes("about")) {
  return "🙂 Utsav is calm, disciplined, and always focused. He believes in creating new ideas and improving the system continuously. A strong pillar in Webora’s internal team.";
}
else if (msg.includes("utsav") && msg.includes("fun")) {
  return "😂 Fun Fact: Utsav can gibe ideas faster than many people can only think of starting, great ideology!";
}
else if (msg.includes("team") && msg.includes("utsav")) {
  return "👥 Webora’s team is led by Kunj Gondaliya, with strong support from Utsav Vishveliya — who ensures the development side stays smooth, fast, and scalable.";
}
else if (msg.includes("partner") || msg.includes("cofounder") && msg.includes("utsav")) {
  return "Utsav is not the co-founder, but he is an essential part of Webora’s development team — helping build, test, and refine multiple projects.";
}
else if (msg.includes("best developer") || msg.includes("best coder")) {
  return "🔥 The best developer at Webora is **Kunj Gondaliya**. He writes the full codebase, builds the entire system, and turns ideas into real working features.";
}
else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hie") || msg.includes("hii") || msg.includes("hiee") || msg.includes("helo")) {
  return "Hello! Welcome to Webora-AI. How may I help you today?";
} 
else if (msg.includes("who codes") || msg.includes("write code")) {
  return " All core coding and development is done by **Kunj Gondaliya**. Frontend, backend, UI/UX, Firebase, dashboards — everything is built by him. while utsav also has expertise in ideology!";
}
else if (msg.includes("Kunj") || msg.includes("Who is the main")) {
  return " Kunj is the main index developer.";
}
else if (msg.includes("utsav") && msg.includes("do")) {
  return "💡 Utsav mainly gives ideas, improves concepts, and contributes suggestions. But the full implementation, coding, design, and execution is done by **Kunj**.";
}
else if (msg.includes("best") && msg.includes("utsav")) {
  return "😂 Utsav is great with ideas, but when it comes to actual coding… Kunj is the one who makes everything real.";
}
else if (msg.includes("compare") && msg.includes("utsav")) {
  return "⚡ Utsav contributes with planning and ideas, but **Kunj is the main developer** who writes, structures, and deploys the complete code.";
}
else if (msg.includes("is utsav developer")) {
  return "🙂 Utsav helps with ideas and improvements, but the primary developer — the one who builds everything — is **Kunj Gondaliya**.";
}
else if (msg.includes("who built") || msg.includes("creator")) {
  return "🚀 Webora was entirely built by **Kunj Gondaliya** — including design, development, dashboard, UI, animations, Firebase system, and chatbot logic.";
}
  else if (msg.includes("discount") || msg.includes("offer")) {
    return "🎁 We sometimes run seasonal discounts. Join our Newsletter or follow us on social media to stay updated!";

  } else if (msg.includes("training") || msg.includes("learn") || msg.includes("tutorial")) {
    return "📚 Yes, we provide training & tutorials after delivering your project so you can manage it easily without technical knowledge.";

  } else {
  return "🤖 I’m not sure I understood that correctly.\n\nYou can ask me things like:\n- Pricing / plans\n- Our services\n- Portfolio or case studies\n- Who built Webora\n- Careers & hiring\n- SEO / marketing\n- About Kunj or Utsav\n- Project timelines\n- Technology stack\n\nTry asking something again, or be a little more specific — I’m here to help! 😊";
}
}
  // events
  sendBtn.addEventListener('click', () => { sendMessage(input.value); input.value=''; input.focus(); });
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ sendMessage(input.value); input.value=''; } });

  // initial: small greeting on first open ever
  if(!localStorage.getItem(STORAGE_KEY)){
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { from:'bot', text: 'Hello! I am Webora assistant. Ask me about services, pricing or portfolio.', ts: Date.now() }
    ]));
  }

  // expose simple API (optional)
  window.WeboraChat = {
    open: () => openPanel(true),
    send: (txt) => sendMessage(txt)
  };
})();