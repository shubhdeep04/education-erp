import FooterSettings from "../models/FooterSettings.js";

export const getFooterSettings = async (req, res) => {
  try {
    let settings = await FooterSettings.findOne();
    if (!settings) {
      settings = await FooterSettings.create({
        quickLinks: [
          { label: "Home",     url: "/",         order: 0 },
          { label: "About",    url: "/about",    order: 1 },
          { label: "Courses",  url: "/courses",  order: 2 },
          { label: "Services", url: "/services", order: 3 },
        ],
        programs: [
          { label: "Science",    url: "#", order: 0 },
          { label: "Commerce",   url: "#", order: 1 },
          { label: "Arts",       url: "#", order: 2 },
          { label: "Technology", url: "#", order: 3 },
          { label: "Sports",     url: "#", order: 4 },
        ],
        contactItems: [
          { label: "📍 BHOPAL, M.P.",        url: "#",                        order: 0 },
          { label: "📞 +91 98765 43210",     url: "tel:+919876543210",        order: 1 },
          { label: "✉️ info@edusphere.in",  url: "mailto:info@edusphere.in", order: 2 },
        ]
      });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateFooterSettings = async (req, res) => {
  try {
    const { quickLinks, programs, contactItems } = req.body;
    let settings = await FooterSettings.findOne();
    if (!settings) settings = new FooterSettings();

    if (quickLinks)   settings.quickLinks   = quickLinks;
    if (programs)     settings.programs     = programs;
    if (contactItems) settings.contactItems = contactItems;
    settings.updatedAt = Date.now();

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};