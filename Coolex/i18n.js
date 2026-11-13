'use strict';
/** Small JSON-backed localization layer. Translation values are plain text. */
window.CoolexI18n = (() => {
  const languages = Object.freeze({ en: 'English', te: 'తెలుగు', hi: 'हिन्दी' });
  const dictionaries = {};
  const storageKey = 'coolex-language';
  let locale = 'en';
  try {
    const preferred = localStorage.getItem(storageKey);
    if (Object.hasOwn(languages, preferred)) locale = preferred;
  } catch { /* English remains the first-visit default without browser storage. */ }

  function t(key, parameters = {}) {
    const plural = typeof parameters.count === 'number'
      ? new Intl.PluralRules(locale).select(parameters.count) : null;
    const candidates = plural ? [`${key}_${plural}`, `${key}_other`, key] : [key];
    let value;
    for (const language of [locale, 'en']) {
      for (const candidate of candidates) {
        value = dictionaries[language]?.messages?.[candidate];
        if (typeof value === 'string') break;
      }
      if (typeof value === 'string') break;
    }
    return String(value ?? key).replace(/\{(\w+)\}/g, (token, name) =>
      Object.hasOwn(parameters, name) ? String(parameters[name]) : token);
  }
  function group(name, language = locale) {
    if (name === 'All') return language === locale ? t('filter.all')
      : dictionaries[language]?.messages?.['filter.all'] || name;
    return dictionaries[language]?.groups?.[name] || dictionaries.en?.groups?.[name] || name;
  }
  function title(page, language = locale) {
    return page ? dictionaries[language]?.pages?.[page.path]?.title || page.title : '';
  }
  function description(page) {
    return dictionaries[locale]?.pages?.[page.path]?.description || page.description;
  }
  function searchText(page) {
    return [page.title, page.group, page.path,
      ...Object.keys(languages).flatMap(language => [title(page, language), group(page.group, language)])
    ].join(' ');
  }
  function choose(language, persist = true) {
    if (!Object.hasOwn(languages, language)) return false;
    if (!dictionaries[language]) return false;
    locale = language;
    document.documentElement.lang = locale;
    if (persist) {
      try { localStorage.setItem(storageKey, locale); } catch { /* Keep in-memory choice. */ }
    }
    return true;
  }
  const ready = Promise.all(Object.keys(languages).map(async language => {
    try {
      const response = await fetch(`/Coolex/locales/${language}.json`);
      if (!response.ok) throw new Error(`Translation file unavailable: ${language}`);
      const data = await response.json();
      if (!data.messages || !data.pages || !data.groups) throw new Error('Invalid translation data');
      dictionaries[language] = data;
    } catch (error) {
      if (language === 'en') throw error;
      console.warn(`Coolex: ${language} translations unavailable; using English fallback.`);
    }
  })).then(() => {
    if (!choose(locale, false)) choose('en', false);
  });
  return Object.freeze({ t, group, title, description, searchText, choose, ready, languages,
    get locale() { return locale; } });
})();
