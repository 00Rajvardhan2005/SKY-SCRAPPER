
import { useMemo, useState } from "react";
import {
  CircleHelp,
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ExternalLink,
  Activity,
  RefreshCw,
  Plane,
  Bell,
  BarChart3,
  Map,
  FileText,
  CheckCircle2,
  Send,
} from "lucide-react";

/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    question: "How does SKY SCRAPPER collect airfare data?",
    answer:
      "SKY SCRAPPER monitors airfare information across supported domestic routes and airlines. The dashboard processes this information to show current fares, price movements, route performance and market trends.",
  },
  {
    question: "How often is airfare data refreshed?",
    answer:
      "The default refresh interval is configurable from Settings. You can choose intervals such as 1, 5, 10, 15 or 30 minutes depending on your monitoring requirements.",
  },
  {
    question: "What does a price drop mean?",
    answer:
      "A price drop means the current monitored fare is lower than the previously recorded fare. Green indicators are used throughout the dashboard to highlight these decreases.",
  },
  {
    question: "Why are some routes not showing data?",
    answer:
      "A route may temporarily have no data when the data source has not returned a recent fare, when collection is temporarily unavailable, or when the route is not currently included in the monitoring dataset.",
  },
  {
    question: "How do fare alerts work?",
    answer:
      "Fare alerts notify you when monitored prices move according to your configured alert preferences. You can manage price-drop, price-rise and system notifications from the Settings page.",
  },
  {
    question: "Can I generate reports for a specific period?",
    answer:
      "Yes. The Reports page supports multiple reporting periods, including 7-day, 30-day and 90-day views. You can also select different report types such as fare, route and airline analysis.",
  },
];

/* =========================================================
   QUICK HELP
========================================================= */

const quickHelp = [
  {
    title: "Live Fares",
    description: "Monitor current airfare prices and recent changes.",
    icon: Plane,
    color: "blue",
  },
  {
    title: "Route Map",
    description: "Explore monitored routes and fare movements.",
    icon: Map,
    color: "green",
  },
  {
    title: "Alerts",
    description: "Review price movements and active notifications.",
    icon: Bell,
    color: "orange",
  },
  {
    title: "Analytics",
    description: "Understand market trends and fare performance.",
    icon: BarChart3,
    color: "purple",
  },
];

/* =========================================================
   TROUBLESHOOTING
========================================================= */

const troubleshooting = [
  {
    title: "Data appears outdated",
    description:
      "Check the refresh interval and system status before refreshing the page.",
    icon: RefreshCw,
  },
  {
    title: "Alerts are not appearing",
    description:
      "Verify that the relevant notification settings are enabled.",
    icon: Bell,
  },
  {
    title: "Charts are empty",
    description:
      "Make sure the selected date range contains available monitoring data.",
    icon: BarChart3,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [search]);

  const updateForm = (key, value) => {
    setSupportForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!supportForm.subject.trim() || !supportForm.message.trim()) {
      return;
    }

    setSubmitted(true);

    setSupportForm({
      subject: "",
      message: "",
    });
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-col items-center text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1565C0]">
            <CircleHelp size={28} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
            Help & Support
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
            Find answers, learn how SKY SCRAPPER works, or contact
            support if you need assistance.
          </p>

          {/* SEARCH */}

          <div className="relative mt-6 w-full max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles and FAQs..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

        </div>
      </div>

      {/* =====================================================
          QUICK HELP
      ===================================================== */}

      <div>

        <div className="mb-4">

          <h3 className="font-bold text-[#0B1F3A]">
            Quick Help
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Get help with the main SKY SCRAPPER features.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {quickHelp.map((item) => {
            const Icon = item.icon;

            const colors = {
              blue: "bg-blue-50 text-[#1565C0]",
              green: "bg-green-50 text-green-600",
              orange: "bg-orange-50 text-orange-500",
              purple: "bg-purple-50 text-purple-600",
            };

            return (
              <button
                key={item.title}
                className="group rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[item.color]}`}
                >
                  <Icon size={20} />
                </div>

                <h4 className="mt-4 text-sm font-bold text-[#0B1F3A]">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#1565C0] opacity-0 transition group-hover:opacity-100">
                  Learn more
                  <ExternalLink size={12} />
                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ===================================================
            FAQ
        =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

          <div className="border-b border-gray-100 p-5 sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
                <CircleHelp size={20} />
              </div>

              <div>
                <h3 className="font-bold text-[#0B1F3A]">
                  Frequently Asked Questions
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Answers to common SKY SCRAPPER questions.
                </p>
              </div>

            </div>

          </div>

          <div className="divide-y divide-gray-100">

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {

                const isOpen = openFaq === index;

                return (
                  <div key={faq.question}>

                    <button
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : index)
                      }
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50 sm:p-6"
                    >

                      <span className="text-sm font-semibold text-[#0B1F3A]">
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />

                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6">

                        <p className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                          {faq.answer}
                        </p>

                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center">

                <Search
                  size={28}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm font-semibold text-gray-600">
                  No help articles found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try searching for a different term.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* ===================================================
            SUPPORT CARD
        =================================================== */}

        <div className="space-y-6">

          {/* CONTACT */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <MessageCircle size={20} />
            </div>

            <h3 className="mt-4 font-bold text-[#0B1F3A]">
              Need more help?
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Our support team can help with dashboard issues,
              monitoring problems and account questions.
            </p>

            <button
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <MessageCircle size={17} />
              Contact Support
            </button>

          </div>

          {/* DOCUMENTATION */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <BookOpen size={20} />
            </div>

            <h3 className="mt-4 font-bold text-[#0B1F3A]">
              Documentation
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Learn more about the dashboard, data monitoring
              and reporting features.
            </p>

            <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1565C0] hover:underline">
              Open documentation
              <ExternalLink size={14} />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          TROUBLESHOOTING
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Activity size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Troubleshooting
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Quick solutions for common dashboard issues.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">

          {troubleshooting.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="p-5 sm:p-6"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                  <Icon size={18} />
                </div>

                <h4 className="mt-4 text-sm font-bold text-[#0B1F3A]">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
              <Mail size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Send a Support Request
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Describe your issue and the support team can investigate it.
              </p>
            </div>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subject
              </label>

              <input
                type="text"
                value={supportForm.subject}
                onChange={(e) =>
                  updateForm("subject", e.target.value)
                }
                placeholder="What do you need help with?"
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </label>

              <select className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white">
                <option>Dashboard Issue</option>
                <option>Airfare Data</option>
                <option>Alerts</option>
                <option>Reports</option>
                <option>Account</option>
                <option>Other</option>
              </select>
            </div>

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Message
            </label>

            <textarea
              value={supportForm.message}
              onChange={(e) =>
                updateForm("message", e.target.value)
              }
              rows={5}
              placeholder="Describe the issue in detail..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {submitted ? (
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle2 size={17} />
                Support request submitted successfully.
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                Please include enough detail for the issue to be investigated.
              </p>
            )}

            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Send size={16} />
              Send Request
            </button>

          </div>

        </form>

      </div>

      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <div className="flex flex-col gap-4 rounded-xl border border-green-100 bg-green-50 p-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-700">
              All Systems Operational
            </p>

            <p className="mt-1 text-xs text-green-600">
              Airfare monitoring and dashboard services are running normally.
            </p>
          </div>

        </div>

        <span className="flex items-center gap-2 text-xs font-medium text-green-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          System Online
        </span>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <span>
          SKY SCRAPPER · Real-Time Airfare Index
        </span>

        <span>
          Help Center
        </span>

      </div>

    </div>
  );
}

export default Help;

