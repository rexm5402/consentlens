(() => {
    const keywords = [
      "google-analytics", "gtag", "googletagmanager", "doubleclick",
      "facebook", "pixel", "hotjar", "mixpanel", "ads", "tracker"
    ];
    const dashStyle = `
      position:fixed;bottom:16px;right:16px;z-index:2147483647;
      background:#222;color:#fff;font:12px/1.4 monospace;padding:10px 14px;
      border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.5);
    `;
    const outlineStyle = "2px solid rgba(255,0,0,.8)";
    const found = { scripts: [], iframes: [], inputs: [] };
  
    const mark = (el, label) => {
      el.style.outline = outlineStyle;
      el.dataset.consentlens = label;
    };
  
    const match = url => keywords.some(k => url.includes(k));
  
    const scanDOM = () => {
      document.querySelectorAll("script[src]").forEach(s => {
        if (match(s.src)) { mark(s, "tracker-script"); found.scripts.push(s.src); }
      });
      document.querySelectorAll("iframe[src]").forEach(f => {
        if (match(f.src)) { mark(f, "tracker-iframe"); found.iframes.push(f.src); }
      });
      document.querySelectorAll("input").forEach(i => {
        const cs = getComputedStyle(i);
        if (cs.display === "none" || cs.visibility === "hidden") {
          mark(i, "hidden-input"); found.inputs.push(i.name || "(unnamed)");
        }
      });
    };
  
    const scanNetwork = () => performance.getEntriesByType("resource")
      .filter(r => match(r.name))
      .map(r => r.name);
  
    const showDash = (net) => {
      const dash = document.createElement("div");
      dash.setAttribute("style", dashStyle);
      dash.innerHTML = `
        🔍 <b>ConsentLens</b><br>
        ${found.scripts.length} tracking scripts<br>
        ${found.iframes.length} suspicious iframes<br>
        ${found.inputs.length} hidden inputs<br>
        ${net.length} 3rd-party requests
      `;
      document.body.appendChild(dash);
    };
  
    const mo = new MutationObserver(m => {
      m.forEach(rec => rec.addedNodes.forEach(node => {
        if (node.tagName === "SCRIPT" && node.src && match(node.src)) {
          mark(node, "tracker-script"); found.scripts.push(node.src);
        }
        if (node.tagName === "IFRAME" && node.src && match(node.src)) {
          mark(node, "tracker-iframe"); found.iframes.push(node.src);
        }
      }));
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  
    scanDOM();
    const net = scanNetwork();
    showDash(net);
    localStorage.setItem("consentlens_last", JSON.stringify({ found, net }));
  })();
  