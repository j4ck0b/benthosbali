/**
 * TrackingManager.js
 * Centralized tracking for conversion optimization.
 */

const Tracking = {
  init() {
    console.log('📊 Tracking Manager Initialized');
    this.bindEvents();
  },

  /**
   * Send event to GTAG and other providers
   * @param {string} action - Event action (e.g., 'click', 'submit')
   * @param {Object} params - Event parameters
   */
  event(action, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, params);
      console.log(`📈 Event Sent: ${action}`, params);
    } else {
      console.warn('⚠️ GTAG not found. Event cached or ignored.');
    }
  },

  /**
   * Bind events to elements with data-track attribute
   */
  bindEvents() {
    document.addEventListener('click', (e) => {
      const trackElement = e.target.closest('[data-track]');
      if (trackElement) {
        const action = trackElement.getAttribute('data-track-action') || 'button_click';
        const label = trackElement.getAttribute('data-track-label') || trackElement.innerText;
        const category = trackElement.getAttribute('data-track-category') || 'conversion';

        this.event(action, {
          event_category: category,
          event_label: label,
        });
      }

      // Special handling for WhatsApp
      const whatsappLink = e.target.closest('a[href*="wa.me"]');
      if (whatsappLink) {
        this.event('whatsapp_click', {
          event_category: 'conversion',
          event_label: 'WhatsApp Contact',
        });
      }
    });

    // Form Submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.hasAttribute('data-track-form')) {
        const formName = form.getAttribute('data-track-form');
        this.event('form_submission', {
          event_category: 'lead',
          event_label: formName,
        });
      }
    });
  }
};

export default Tracking;
