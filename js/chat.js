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
    return "💰 Our pricing plans are flexible:\n\n- **Basic (₹499/mo):** Perfect for small businesses & portfolios.\n- **Professional (₹999/mo):** Includes advanced SEO, analytics, and faster hosting.\n- **Enterprise (Custom):** For large-scale projects with 24/7 support, dedicated servers, and priority service.\n\n👉 We also offer one-time project pricing if you don’t want a subscription.";
  
  } else if (msg.includes("service") || msg.includes("offer")) {
    return "⚡ We provide a wide range of services:\n\n1. **Web Design & Development** – Modern, responsive, and optimized websites.\n2. **Mobile Apps** – Android & iOS apps built with latest frameworks.\n3. **SEO & Marketing** – Improve visibility and attract more customers.\n4. **Branding** – Logo, graphics, and digital presence.\n\nEvery project is fully customized to meet your goals.";

  } else if (msg.includes("contact")) {
    return "📞 You can reach us anytime:\n\n- **Email:** support@webora.com\n- **Phone:** +91-9876543210\n- **Contact Form:** Available on our website’s Contact page\n\nWe reply within **24 hours** on weekdays.";

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

  } else {
    return "🤖 I didn’t get that. Try asking about:\n\n- Pricing\n- Services\n- SEO\n- Portfolio\n- Maintenance\n- Careers\n- Newsletter\n\nI’ll be happy to answer!";
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

  } else if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost")) {
    return "💰 Pricing:\n- Basic Website: starts at ₹2,000\n- Business Package: ₹5,000 – ₹10,000\n- E-commerce Stores: ₹12,000 – ₹20,000\n👉 Hosting is just ₹100/year.";

  } else if (msg.includes("service") || msg.includes("offer")) {
    return "⚡ Services:\n- Web Design & Development\n- E-commerce Stores\n- SEO & Marketing\n- Branding & Graphics\n- Hosting & Maintenance";

  } else {
    return "🤖 I didn’t get that. Try asking:\n👉 What is Webora, Services, Pricing, Clients, or Mission.";
}

  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost")) {
    return "💰 Our pricing is transparent:\n\n- **Basic Website:** starts at ₹2,000\n- **Business Package:** ₹5,000 – ₹10,000\n- **E-commerce Stores:** ₹12,000 – ₹20,000\n- **Enterprise Solutions:** custom pricing\n\n👉 We also offer **₹100/year hosting** for small projects.";

  } else if (msg.includes("service") || msg.includes("offer") || msg.includes("what do you do")) {
    return "⚡ We offer:\n\n- Web Design & Development\n- E-commerce Solutions\n- SEO & Digital Marketing\n- Mobile App Development\n- Branding & Graphics\n- Hosting & Maintenance";

  } else if (msg.includes("contact") || msg.includes("support")) {
    return "📞 Contact us anytime:\n\n- **Email:** support@webora.com\n- **Phone:** +91-9876543210\n- **WhatsApp:** +91-9876543210\n\nWe reply within **24 hours**.";

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

  } else if (msg.includes("discount") || msg.includes("offer")) {
    return "🎁 We sometimes run seasonal discounts. Join our Newsletter or follow us on social media to stay updated!";

  } else if (msg.includes("training") || msg.includes("learn") || msg.includes("tutorial")) {
    return "📚 Yes, we provide training & tutorials after delivering your project so you can manage it easily without technical knowledge.";

  } else {
    return "🤖 I didn’t understand that. Try asking about:\n👉 Pricing, Services, SEO, Portfolio, Refunds, Maintenance, Careers, Technology, Contact.";
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