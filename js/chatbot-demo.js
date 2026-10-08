/**
 * BLAZEBYTE STUDIO — INTERACTIVE AI CHATBOT DEMONSTRATION ENGINE
 * Client-Side Knowledge Base & Conversational Flow Simulator
 */

(function() {
  const KNOWLEDGE_BASE = {
    web: {
      title: "Web Development Division",
      summary: "We build high-performance, conversion-engineered websites for international startups and enterprises.",
      pricing: "• Starter Landing Page: $199\n• Business Website (5 pgs): $499\n• Premium Corporate (10 pgs): $999\n• E-Commerce Platform: From $1,299\n• Custom Web Platform: From $1,499\n• Monthly Care & Maintenance: $79/mo",
      turnaround: "Landing pages take 3–5 days; full 5–10 page business websites take 7–10 business days."
    },
    marketing: {
      title: "Digital Marketing Division",
      summary: "Measurable growth campaigns combining technical SEO, organic social, and high-ROI advertising.",
      pricing: "• Social Media Starter: $249/month\n• SEO Growth Engine: $399/month\n• Google / Meta Ads Management: $299/month (ad spend separate)\n• Business Growth Bundle: $699/month\n• Growth + Automation: $999/month",
      turnaround: "Monthly management with bi-weekly optimization and consolidated GA4/GSC reporting."
    },
    ai: {
      title: "AI Solutions & Intelligent Chatbots",
      summary: "Autonomous AI agents and custom conversational bots trained on your business data to qualify leads and automate support 24/7.",
      pricing: "• Basic AI Website Chatbot: $149 setup\n• AI Lead Qualification Bot: $299 setup\n• AI Customer Support Agent: $399 setup\n• AI Workflow Automation: $499 setup\n• Advanced RAG Agent: $999 setup\n• Custom Enterprise AI Platform: From $1,999",
      turnaround: "Chatbots deploy in 3–7 days with custom prompt guardrails and knowledge retrieval."
    },
    apps: {
      title: "Custom Application Development",
      summary: "Tailored full-stack software, internal business dashboards, bespoke CRMs, and cross-platform mobile apps.",
      pricing: "• Basic Business Dashboard: $499\n• Booking & Scheduling System: $799\n• Custom Purpose-Built CRM: $1,299\n• Full Custom Web Application: $1,499\n• Cross-Platform Mobile App (Flutter): $2,499\n• SaaS MVP Development: $2,999",
      turnaround: "Sprints scoped transparently from discovery through architecture, design, and deployment."
    },
    company: {
      name: "BlazeByte Studio",
      location: "Coimbatore, Tamil Nadu, India — serving clients globally across the USA, UK, Canada, Australia, UAE, and Europe.",
      milestones: "We operate on milestone agreements (typically 50% advance to initiate sprints, balance payable only upon milestone verification and signoff).",
      contact: "Email: blazebytestudio7@gmail.com | Phone: +91 7708795342 | Site: blazebyte.shop"
    }
  };

  class ChatbotWidget {
    constructor(containerElement, isFloating = false) {
      this.container = containerElement;
      this.isFloating = isFloating;
      this.history = [];
      this.init();
    }

    init() {
      this.render();
      this.bindEvents();
      this.addBotMessage(
        "Hello! I am the **BlazeByte AI Assistant**. I can explain our 4 core divisions, quote starting international prices in USD, or help scope your project. How can I assist you today?",
        [
          "Web Dev Packages",
          "Digital Marketing",
          "AI Chatbot Pricing",
          "Custom Apps",
          "Payment Milestones"
        ]
      );
    }

    render() {
      this.container.innerHTML = `
        <div class="chatbot-box ${this.isFloating ? 'chatbot-floating-window' : 'chatbot-embedded-box'}" id="${this.isFloating ? 'floatingChatWindow' : 'embeddedChatWindow'}">
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="mini-bot-chibi" style="width:36px;height:36px;">
                <div class="chibi-bot-head" style="width:32px;height:28px;">
                  <div class="chibi-bot-antenna"></div>
                  <div class="chibi-bot-face">
                    <span class="chibi-bot-eye"></span>
                    <span class="chibi-bot-eye"></span>
                  </div>
                </div>
              </div>
              <div class="chat-header-title">
                <strong>ByteBot &bull; Studio AI</strong>
                <span>ONLINE // STUDIO ASSISTANT v2.4</span>
              </div>
            </div>
            <div class="chat-header-actions">
              <button class="chat-action-btn" id="chatResetBtn" title="Reset Conversation" type="button">↺</button>
              ${this.isFloating ? '<button class="chat-action-btn" id="chatCloseBtn" title="Close Chat" type="button">✕</button>' : ''}
            </div>
          </div>
          <div class="chat-messages" id="chatMessages"></div>
          <div class="chat-input-bar">
            <input type="text" class="chat-input" id="chatInput" placeholder="Ask about services, pricing, or tech stack..." autocomplete="off">
            <button class="chat-send-btn" id="chatSendBtn" type="button" aria-label="Send message">➤</button>
          </div>
          <div class="chat-disclosure">
            ✦ AI Assistant Demonstration. For production deployments, we integrate private, server-secured LLM APIs.
          </div>
        </div>
      `;
    }

    bindEvents() {
      const sendBtn = this.container.querySelector('#chatSendBtn');
      const input = this.container.querySelector('#chatInput');
      const resetBtn = this.container.querySelector('#chatResetBtn');
      const closeBtn = this.container.querySelector('#chatCloseBtn');

      sendBtn.addEventListener('click', () => this.handleSend());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });

      resetBtn.addEventListener('click', () => {
        this.container.querySelector('#chatMessages').innerHTML = '';
        this.addBotMessage(
          "Conversation reset. How can BlazeByte Studio support your technology or growth goals today?",
          ["Web Development", "AI Solutions", "Digital Marketing", "Custom Apps"]
        );
      });

      if (closeBtn && this.isFloating) {
        closeBtn.addEventListener('click', () => {
          this.container.querySelector('.chatbot-floating-window').classList.remove('active');
        });
      }
    }

    handleSend() {
      const input = this.container.querySelector('#chatInput');
      const text = input.value.trim();
      if (!text) return;

      this.addUserMessage(text);
      input.value = '';

      setTimeout(() => {
        this.processQuery(text);
      }, 400);
    }

    addUserMessage(text) {
      const msgs = this.container.querySelector('#chatMessages');
      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg user';
      msgEl.innerHTML = `<div class="chat-bubble">${this.escapeHtml(text)}</div>`;
      msgs.appendChild(msgEl);
      msgs.scrollTop = msgs.scrollHeight;
    }

    addBotMessage(text, chips = []) {
      const msgs = this.container.querySelector('#chatMessages');
      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg bot';

      let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br>');

      let chipsHtml = '';
      if (chips && chips.length > 0) {
        chipsHtml = `<div class="chat-suggestions">${chips.map(c => `<button class="chat-chip" type="button" data-chip="${this.escapeHtml(c)}">${this.escapeHtml(c)}</button>`).join('')}</div>`;
      }

      msgEl.innerHTML = `
        <div class="mini-bot-chibi" aria-hidden="true">
          <div class="chibi-bot-head">
            <div class="chibi-bot-antenna"></div>
            <div class="chibi-bot-face">
              <span class="chibi-bot-eye"></span>
              <span class="chibi-bot-eye"></span>
            </div>
          </div>
        </div>
        <div class="chat-bubble">
          <div class="chibi-bot-badge"><span>●</span> BYTEBOT // AI AGENT</div>
          ${formatted}
          ${chipsHtml}
        </div>
      `;
      msgs.appendChild(msgEl);

      // Attach chip click listeners
      msgEl.querySelectorAll('.chat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const val = chip.dataset.chip;
          this.addUserMessage(val);
          setTimeout(() => this.processQuery(val), 350);
        });
      });

      msgs.scrollTop = msgs.scrollHeight;
    }

    processQuery(query) {
      const q = query.toLowerCase();

      if (q.includes('web') || q.includes('website') || q.includes('landing') || q.includes('e-commerce') || q.includes('ecommerce')) {
        this.addBotMessage(
          `**${KNOWLEDGE_BASE.web.title}**\n\n${KNOWLEDGE_BASE.web.summary}\n\n**Proposed USD Pricing:**\n${KNOWLEDGE_BASE.web.pricing}\n\n*Turnaround:* ${KNOWLEDGE_BASE.web.turnaround}`,
          ["Start Web Project", "Digital Marketing", "AI Chatbot Pricing", "Custom Applications"]
        );
      } else if (q.includes('market') || q.includes('seo') || q.includes('social') || q.includes('ads') || q.includes('google ads') || q.includes('meta')) {
        this.addBotMessage(
          `**${KNOWLEDGE_BASE.marketing.title}**\n\n${KNOWLEDGE_BASE.marketing.summary}\n\n**Proposed Monthly Packages:**\n${KNOWLEDGE_BASE.marketing.pricing}\n\n*Important:* Ad spend is paid directly to advertising platforms. We provide transparent management and analytics.`,
          ["Request Marketing Strategy", "Web Development", "AI Solutions", "Custom Apps"]
        );
      } else if (q.includes('ai') || q.includes('bot') || q.includes('chatbot') || q.includes('automation') || q.includes('agent')) {
        this.addBotMessage(
          `**${KNOWLEDGE_BASE.ai.title}**\n\n${KNOWLEDGE_BASE.ai.summary}\n\n**Proposed AI Setup Pricing:**\n${KNOWLEDGE_BASE.ai.pricing}\n\n*Note:* Third-party LLM API token charges (e.g., OpenAI / Gemini) and external integrations are billed transparently at cost.`,
          ["Build My AI Chatbot", "Web Development", "Custom Applications", "Get Custom Quote"]
        );
      } else if (q.includes('app') || q.includes('application') || q.includes('crm') || q.includes('dashboard') || q.includes('mobile') || q.includes('saas')) {
        this.addBotMessage(
          `**${KNOWLEDGE_BASE.apps.title}**\n\n${KNOWLEDGE_BASE.apps.summary}\n\n**Proposed Application Pricing:**\n${KNOWLEDGE_BASE.apps.pricing}\n\n*Process:* Requirement discovery ➔ Architecture ➔ UI/UX ➔ Backend & Frontend build ➔ Handover.`,
          ["Discuss App Idea", "Web Development", "AI Solutions", "Contact Our Team"]
        );
      } else if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('rate') || q.includes('how much')) {
        this.addBotMessage(
          `**BlazeByte Studio — Transparent Starting Prices (USD):**\n\n• **Web Development:** Starting at $199 for landing pages; $499 for 5-page business websites.\n• **Digital Marketing:** Starting at $249/mo for social management; $399/mo for SEO.\n• **AI Chatbots:** Starting at $149 setup for basic website bots; $299 for lead capture bots.\n• **Custom Apps:** Starting at $499 for dashboards; $1,299 for custom CRMs; $2,999 for SaaS MVPs.`,
          ["Explore Full Pricing Page", "Start Web Project", "Contact Our Team"]
        );
      } else if (q.includes('milestone') || q.includes('pay') || q.includes('payment') || q.includes('advance') || q.includes('terms')) {
        this.addBotMessage(
          `**Payment & Commercial Milestones:**\n\n• **Standard Projects:** 50% initial advance to initiate development sprints, and 50% final balance strictly upon delivery and staging verification.\n• **Larger Enterprise Systems:** 50% deposit / 30% intermediate milestone / 20% before final handover.\n• We accept international wire, cards, and secure digital invoices.`,
          ["Start Your Project", "View Pricing", "Talk to Engineer"]
        );
      } else if (q.includes('contact') || q.includes('talk') || q.includes('hire') || q.includes('quote') || q.includes('start') || q.includes('consult')) {
        this.addBotMessage(
          `We would be delighted to partner on your digital roadmap! You can submit an enquiry via our **[Contact & Project Consultation Page](contact.html)** or connect with us directly:\n\n• **Email:** blazebytestudio7@gmail.com\n• **Direct Line:** +91 7708795342\n• **HQ:** Coimbatore, Tamil Nadu, India (Serving Global Clients).`,
          ["Open Contact Page", "Web Packages", "AI Chatbot Pricing"]
        );
      } else {
        this.addBotMessage(
          `BlazeByte Studio is an international digital solutions partner specializing in **Web Development**, **Digital Marketing**, **AI Solutions & Chatbots**, and **Custom Applications**.\n\nCould you tell me a little about your business or the specific service you are exploring?`,
          ["Web Development", "Digital Marketing", "AI Solutions", "Custom Applications", "View Pricing"]
        );
      }
    }

    escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  }

  // Initialize on DOM load
  window.addEventListener('DOMContentLoaded', () => {
    // Check for embedded chatbot container
    const embeddedEl = document.getElementById('embeddedChatbotContainer');
    if (embeddedEl) {
      new ChatbotWidget(embeddedEl, false);
    }

    // Always create floating launcher and modal if not present
    if (!document.getElementById('floatingChatContainer')) {
      const floatContainer = document.createElement('div');
      floatContainer.id = 'floatingChatContainer';
      document.body.appendChild(floatContainer);

      const floatWidget = new ChatbotWidget(floatContainer, true);

      // Launcher button
      const launcher = document.createElement('button');
      launcher.className = 'chatbot-launcher';
      launcher.id = 'chatbotLauncher';
      launcher.type = 'button';
      launcher.setAttribute('aria-label', 'Open AI Assistant');
      launcher.innerHTML = `
        <div class="launcher-avatar">✦</div>
        <div class="launcher-text">
          <strong>AI Assistant</strong>
          <span>Instant Estimates</span>
        </div>
      `;
      document.body.appendChild(launcher);

      launcher.addEventListener('click', () => {
        const win = floatContainer.querySelector('.chatbot-floating-window');
        win.classList.toggle('active');
      });
    }
  });
})();
