// src/config/demo.ts
//
// Demo mode: public forms (contact, corporate inquiry, booking requests)
// validate input and report success, but send no emails or notifications.
// Corporate inquiries are also not saved.
//
// ON by default. To send real emails again, set DEMO_FORMS_LIVE=true.
export const DEMO_FORMS_SILENT = process.env.DEMO_FORMS_LIVE !== "true";
