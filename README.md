# m1-data-layer-mapping
This is data layer integration guide for developers

Installation
---

```
<script>

// Create a new instance of the custom Array constructor function
window.dataLayer = new TealiumArray(window.dataLayer || []);

window.m1DataLayer = window.m1DataLayer || {
  page: {
    emailToken: null,
    emailHash: null
  },
  product: {}
};
</script>
```

Custom JS events syntax
---
```
dataLayer.push({
    'event': 'Pageview',
    'emailHash': '694-hdjsadhjs',
    'emailToken': 'eouyi-77777247',
    'pagePath': '/promotions/simo-promotions'
});
```
Variables for all pages (HTML-based pages)
---



 