import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

const translations = {
  en: {
    language: { switchTo: "Switch language to Vietnamese", code: "VI" },
    navigation: {
      experience: "Experience",
      about: "About me",
      skills: "Skills",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    intro: {
      ariaLabel: "Portfolio introduction",
      profession: "Fullstack Developer",
      portfolio: "Portfolio",
      enterTitle: "Enter",
      enterTitleAccent: "the experience.",
      enterButton: "Enter portfolio",
      city: "Ho Chi Minh City",
      eyebrow: "I'M A",
      title: "FULLSTACK DEVELOPER",
      tagline: "Always learning, constantly building, continuously growing.",
    },
    hero: {
      role: "Software Engineer",
      statements: [
        "I am a Fullstack Developer.",
        "I build scalable web products.",
        "I craft interfaces with React & Next.js.",
        "I architect APIs with Node.js & NestJS.",
        "I design systems with PostgreSQL, Redis & Kafka.",
        "I ship reliable software with Docker & CI/CD.",
        "I integrate AI with LLMs, RAG & vector databases.",
        "I build with OpenAI APIs, AI agents & prompt engineering.",
        "I turn ideas into production-ready systems.",
      ],
      introBefore: "Fullstack Developer with",
      experience: "1+ year of experience",
      introAfter:
        "building scalable web applications and event-driven systems. Proficient in React, Next.js, Node.js, NestJS, PostgreSQL, Redis and Kafka, with hands-on experience integrating OpenAI/GenAI APIs, RAG pipelines, vector databases and AI agents.",
      viewProjects: "View projects",
      githubProfile: "GitHub profile",
      profileLabel: "Interactive profile card",
    },
    about: {
      eyebrow: "ABOUT / PROFILE",
      titleFirst: "About",
      titleAccent: "Me",
      description:
        "A concise view of my education and personal contact details.",
      summaryFirst:
        "As a Fullstack Developer, I build web products across the interface, backend, and data layers. My experience with React, Next.js, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, Redis, Kafka, microservices, and event-driven architectures helps me create scalable and maintainable solutions.",
      summarySecond:
        "I turn complex product requirements into clear, dependable systems, balancing thoughtful interfaces, resilient services, and practical architecture so each product can evolve with confidence.",
      contactLabel: "Let's connect",
      location: "Location",
      city: "Ho Chi Minh City, Vietnam",
      phone: "Phone",
      email: "Email",
      github: "GitHub",
      education: {
        eyebrow: "Education",
        title: "Industrial University of Ho Chi Minh City",
        meta: "2022 – 2027 (Expected)",
        detail: "Software Engineering",
        gpaLabel: "GPA",
        gpa: "3.46 / 4.0",
        awardsLabel: "Awards",
        awards:
          "Scholarship for outstanding academic achievement (2023 – 2026)",
      },
    },
    experience: {
      eyebrow: "WORK / EXPERIENCE",
      titleFirst: "Experience",
      titleAccent: "in Practice",
      description: "Building reliable web products, backend services, and scalable systems for real-world workflows.",
      ariaLabel: "Professional experience",
      company: "STS – Sustainable Textile Solutions Vietnam",
      role: "Fullstack Developer",
      period: "05/2025 – 06/2026",
      technologiesLabel: "Technologies used",
      technologies: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "NestJS",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "Docker",
        "Nginx",
        "GitHub Actions",
      ],
      highlights: [
        {
          title: "SaaS / ERP workflows.",
          description: "Built and branded textile business workflows with React, TypeScript, Redux Toolkit, Tailwind CSS, NestJS, PostgreSQL, and Prisma ORM, replacing spreadsheet-heavy processes with a centralized system.",
        },
        {
          title: "Fabric pricing logic.",
          description: "Implemented configurable fabric pricing logic based on material composition, GSM, fabric width, construction factors, processing rules, and margins, supporting reusable catalog and quotation workflows.",
        },
        {
          title: "SePay payment and billing.",
          description: "Integrated SePay payment webhooks and credit-based billing with NestJS, Prisma ORM, and PostgreSQL to automate payment verification, reconciliation, refunds, and transaction history.",
        },
        {
          title: "Security.",
          description: "Implemented JWT, Google OAuth, RBAC, CSRF protection, and permission-based guards for safer admin and user workflows.",
        },
      ],
      deploymentTitle: "VPS deployment",
      deploymentDescription: "Deployed the system on a VPS, containerized services with Docker Compose, routed traffic through Nginx, and automated releases with GitHub Actions CI/CD.",
    },
    skills: {
      titleFirst: "Technical",
      titleAccent: "Skills",
      description: "My skills across frontend, backend, data, AI, and DevOps.",
      overview: "Skills overview",
      focusAreas: "Focus areas",
      technologies: "Technologies",
      gallery: "Animated skills gallery",
      galleryItems: [
        "Frontend interface and web design",
        "Backend server infrastructure",
        "Connected nodes representing system architecture",
        "Database layers and data storage",
        "Data streams moving through a messaging system",
        "Neural network representing artificial intelligence",
        "AI knowledge graph and connected information",
        "Cloud infrastructure connected to servers",
        "Automated deployment pipeline and containers",
      ],
      eyebrow: "Tools & Technologies",
      groups: [
        "Languages & Frontend",
        "Backend & Architecture",
        "Data & Messaging",
        "AI & LLM",
        "DevOps & Tools",
      ],
      groupLabels: [
        "Language and frontend skills",
        "Backend and API skills",
        "Data and messaging skills",
        "AI and LLM skills",
        "DevOps and tools skills",
      ],
      eventDriven: "Event-Driven Architecture",
      aiAgents: "AI agents",
      vectorDatabases: "Vector databases",
      promptEngineering: "Prompt engineering",
      aiCoding: "AI-assisted coding (Claude, Codex)",
    },
    mobile: {
      eyebrow: "Mobile experience in progress",
      title: "The mobile version is under development.",
      copy: "For now, please switch to a laptop or desktop to explore the portfolio in full detail.",
      footer: "Desktop preview available",
    },
  },
  vi: {
    language: { switchTo: "Chuyển sang tiếng Anh", code: "EN" },
    navigation: {
      experience: "Kinh nghiệm",
      about: "Giới thiệu",
      skills: "Kỹ năng",
      openMenu: "Mở menu",
      closeMenu: "Đóng menu",
    },
    intro: {
      ariaLabel: "Giới thiệu portfolio",
      profession: "Lập trình viên Full-stack",
      portfolio: "Hồ sơ năng lực",
      enterTitle: "Khám phá",
      enterTitleAccent: "portfolio của tôi.",
      enterButton: "Vào portfolio",
      city: "Thành phố Hồ Chí Minh",
      eyebrow: "TÔI LÀ",
      title: "KỸ SƯ FULL-STACK",
      tagline: "Không ngừng học hỏi, xây dựng và phát triển mỗi ngày.",
    },
    hero: {
      role: "Kỹ sư phần mềm",
      statements: [
        "Tôi là lập trình viên Full-stack.",
        "Tôi xây dựng sản phẩm web có khả năng mở rộng.",
        "Tôi phát triển giao diện với React & Next.js.",
        "Tôi thiết kế API với Node.js & NestJS.",
        "Tôi xây dựng hệ thống với PostgreSQL, Redis & Kafka.",
        "Tôi triển khai phần mềm ổn định với Docker & CI/CD.",
        "Tôi tích hợp AI với LLM, RAG và cơ sở dữ liệu vector.",
        "Tôi phát triển ứng dụng với OpenAI API và AI agent.",
        "Tôi biến ý tưởng thành sản phẩm sẵn sàng vận hành.",
      ],
      introBefore: "Lập trình viên Full-stack với",
      experience: "hơn 1 năm kinh nghiệm",
      introAfter:
        "xây dựng ứng dụng web có khả năng mở rộng và hệ thống xử lý sự kiện. Thành thạo React, Next.js, Node.js, NestJS, PostgreSQL, Redis và Kafka; có kinh nghiệm tích hợp OpenAI/GenAI API, quy trình RAG, cơ sở dữ liệu vector và AI agent.",
      viewProjects: "Xem dự án",
      githubProfile: "Hồ sơ GitHub",
      profileLabel: "Thẻ hồ sơ tương tác",
    },
    about: {
      eyebrow: "GIỚI THIỆU / HỒ SƠ",
      titleFirst: "Về",
      titleAccent: "tôi",
      description:
        "Thông tin cô đọng về học vấn và các kênh liên hệ cá nhân của tôi.",
      summaryFirst:
        "Là lập trình viên Fullstack, tôi xây dựng sản phẩm web từ giao diện, backend đến quy trình dữ liệu. Kinh nghiệm với React, Next.js, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, Redis, Kafka và microservices giúp tôi tạo ra các giải pháp có khả năng mở rộng, rõ ràng và dễ bảo trì.",
      summarySecond:
        "Tôi chuyển hóa yêu cầu sản phẩm thành hệ thống rõ ràng và đáng tin cậy, cân bằng giữa giao diện chỉn chu, dịch vụ ổn định và kiến trúc thực tế để sản phẩm phát triển vững chắc.",
      contactLabel: "Kết nối với tôi",
      location: "Địa điểm",
      city: "Thành phố Hồ Chí Minh, Việt Nam",
      phone: "Điện thoại",
      email: "Email",
      github: "GitHub",
      education: {
        eyebrow: "Học vấn",
        title: "Trường Đại học Công nghiệp Thành phố Hồ Chí Minh",
        meta: "2022 – 2027 (Dự kiến)",
        detail: "Kỹ thuật phần mềm",
        gpaLabel: "GPA",
        gpa: "3.46 / 4.0",
        awardsLabel: "Thành tích",
        awards: "Học bổng khuyến khích học tập (2023 – 2026)",
      },
    },
    experience: {
      eyebrow: "CÔNG VIỆC / KINH NGHIỆM",
      titleFirst: "Kinh nghiệm",
      titleAccent: "thực tế",
      description: "Xây dựng sản phẩm web đáng tin cậy, dịch vụ backend và hệ thống có khả năng mở rộng cho quy trình thực tế.",
      ariaLabel: "Kinh nghiệm làm việc",
      company: "STS – Sustainable Textile Solutions Vietnam",
      role: "Lập trình viên Fullstack",
      period: "05/2025 – 06/2026",
      technologiesLabel: "Công nghệ sử dụng",
      technologies: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "NestJS",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "Docker",
        "Nginx",
        "GitHub Actions",
      ],
      highlights: [
        {
          title: "Workflow SaaS / ERP.",
          description: "Xây dựng và phát triển workflow cho doanh nghiệp dệt may bằng React, TypeScript, Redux Toolkit, Tailwind CSS, NestJS, PostgreSQL và Prisma ORM, thay thế quy trình phụ thuộc nhiều vào spreadsheet bằng một hệ thống tập trung.",
        },
        {
          title: "Hiện thực logic tính giá vải.",
          description: "Hiện thực logic tính giá vải có thể cấu hình theo thành phần nguyên liệu, GSM, khổ vải, yếu tố cấu trúc, quy tắc xử lý và biên lợi nhuận, hỗ trợ tái sử dụng catalog và quy trình báo giá.",
        },
        {
          title: "Thanh toán qua SePay.",
          description: "Tích hợp webhook thanh toán SePay và billing theo credit với NestJS, Prisma ORM và PostgreSQL để tự động xác minh, đối soát, hoàn tiền và lưu lịch sử giao dịch.",
        },
        {
          title: "Bảo mật.",
          description: "Triển khai JWT, Google OAuth, RBAC, bảo vệ CSRF và permission guard cho các workflow quản trị và người dùng an toàn hơn.",
        },
      ],
      deploymentTitle: "Triển khai trên VPS",
      deploymentDescription: "Triển khai hệ thống trên VPS, đóng gói service bằng Docker Compose, định tuyến traffic qua Nginx và tự động hóa quá trình release bằng GitHub Actions CI/CD.",
    },
    skills: {
      titleFirst: "Kỹ năng",
      titleAccent: "chuyên môn",
      description:
        "Kinh nghiệm của tôi về frontend, backend, dữ liệu, AI và DevOps.",
      overview: "Tổng quan kỹ năng",
      focusAreas: "Lĩnh vực chính",
      technologies: "Công nghệ",
      gallery: "Thư viện hình ảnh kỹ năng động",
      galleryItems: [
        "Giao diện frontend và thiết kế web",
        "Hạ tầng máy chủ backend",
        "Các nút kết nối mô phỏng kiến trúc hệ thống",
        "Các lớp cơ sở dữ liệu và lưu trữ dữ liệu",
        "Luồng dữ liệu trong hệ thống truyền nhận thông điệp",
        "Mạng nơ-ron mô phỏng trí tuệ nhân tạo",
        "Đồ thị tri thức AI và các thông tin liên kết",
        "Hạ tầng đám mây kết nối với máy chủ",
        "Quy trình triển khai tự động và container",
      ],
      eyebrow: "Công nghệ sử dụng",
      groups: [
        "Ngôn ngữ & Frontend",
        "Backend & Kiến trúc",
        "Dữ liệu & Truyền tin",
        "AI & LLM",
        "DevOps & Công cụ",
      ],
      groupLabels: [
        "Kỹ năng ngôn ngữ lập trình và frontend",
        "Kỹ năng backend và API",
        "Kỹ năng dữ liệu và truyền tin",
        "Kỹ năng AI và LLM",
        "Kỹ năng DevOps và công cụ",
      ],
      eventDriven: "Kiến trúc hướng sự kiện",
      aiAgents: "Tác tử AI",
      vectorDatabases: "Cơ sở dữ liệu vector",
      promptEngineering: "Kỹ thuật prompt",
      aiCoding: "Lập trình có hỗ trợ AI (Claude, Codex)",
    },
    mobile: {
      eyebrow: "Trải nghiệm di động đang được hoàn thiện",
      title: "Phiên bản di động đang được phát triển.",
      copy: "Hiện tại, hãy sử dụng máy tính để khám phá đầy đủ portfolio.",
      footer: "Có bản xem trước trên máy tính",
    },
  },
};

const LanguageContext = createContext(null);

// Đọc lựa chọn đã lưu và dùng tiếng Anh khi đây là lần truy cập đầu tiên.
function getInitialLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "vi"
      ? "vi"
      : "en";
  } catch {
    return "en";
  }
}

// Cung cấp ngôn ngữ chung cho intro và toàn bộ nội dung portfolio.
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  // Đồng bộ ngôn ngữ tài liệu và lưu lựa chọn sau mỗi lần trạng thái đổi.
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Giao diện vẫn hoạt động nếu trình duyệt chặn lưu trữ cục bộ.
    }
  }, [language]);

  // Đổi ngôn ngữ ngay lập tức và lưu lựa chọn để lần truy cập sau được giữ nguyên.
  const toggleLanguage = useCallback(() => {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "vi" : "en"));
  }, []);

  const contextValue = useMemo(
    () => ({ language, t: translations[language], toggleLanguage }),
    [language, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Lấy ngôn ngữ hiện tại, nội dung tương ứng và thao tác chuyển đổi trong component.
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage phải được dùng bên trong LanguageProvider.");
  return context;
}
